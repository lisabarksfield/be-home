/**
 * In-memory rental store — survives hot-reload via global module cache.
 * Swap this file for a Prisma/Supabase implementation without touching any route handlers.
 */

export type RentalRecord = {
  id: string;
  spaceId: string;
  spaceName: string;
  practitionerId: string;
  practitionerName: string;
  whatsappNumber: string;
  eventTitle: string;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  spotsAvailable: number;
  cateringRequired: boolean;
  notes: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  googleCalendarEventId?: string;
  createdAt: string; // ISO 8601
};

// Persist across hot-reloads in development via global
declare global {
  // eslint-disable-next-line no-var
  var __rentalStore: RentalRecord[] | undefined;
}

if (!global.__rentalStore) {
  global.__rentalStore = [];
}

const store = global.__rentalStore;

// ─── Queries ──────────────────────────────────────────────────────────────────

export function getRentals(filters?: {
  spaceId?: string;
  from?: string;
  to?: string;
}): RentalRecord[] {
  let result = store.filter(
    (r) => r.status !== "CANCELLED" && r.status !== "COMPLETED"
  );

  if (filters?.spaceId) {
    result = result.filter((r) => r.spaceId === filters.spaceId);
  }
  if (filters?.from) {
    const from = new Date(filters.from);
    result = result.filter((r) => new Date(r.endTime) > from);
  }
  if (filters?.to) {
    const to = new Date(filters.to);
    result = result.filter((r) => new Date(r.startTime) < to);
  }

  return result.sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  );
}

export function getRentalById(id: string): RentalRecord | undefined {
  return store.find((r) => r.id === id);
}

// ─── Overlap check ────────────────────────────────────────────────────────────

/** Returns true if [startTime, endTime) overlaps any active booking for the space. */
export function checkOverlap(
  spaceId: string,
  startTime: string,
  endTime: string,
  excludeId?: string
): boolean {
  const start = new Date(startTime);
  const end = new Date(endTime);

  return store.some((r) => {
    if (r.spaceId !== spaceId) return false;
    if (excludeId && r.id === excludeId) return false;
    if (r.status === "CANCELLED" || r.status === "COMPLETED") return false;

    const rStart = new Date(r.startTime);
    const rEnd = new Date(r.endTime);

    return start < rEnd && end > rStart;
  });
}

// ─── Mutations ────────────────────────────────────────────────────────────────

export function createRental(
  data: Omit<RentalRecord, "id" | "createdAt">
): RentalRecord {
  const rental: RentalRecord = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  store.push(rental);
  return rental;
}

export function updateRental(
  id: string,
  updates: Partial<Omit<RentalRecord, "id" | "createdAt">>
): RentalRecord | null {
  const idx = store.findIndex((r) => r.id === id);
  if (idx === -1) return null;
  store[idx] = { ...store[idx], ...updates };
  return store[idx];
}
