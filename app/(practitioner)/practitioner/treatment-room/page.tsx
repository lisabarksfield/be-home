"use client";

import { useState, useEffect, useCallback } from "react";
import {
  format,
  startOfWeek,
  addDays,
  addWeeks,
  isSameDay,
  isBefore,
  startOfDay,
  parseISO,
  differenceInMinutes,
} from "date-fns";

type RentalRecord = {
  id: string;
  spaceId: string;
  practitionerName: string;
  eventTitle: string;
  startTime: string;
  endTime: string;
  status: string;
};

// 30-minute slots from 07:00 to 22:00
const TIME_SLOTS = Array.from({ length: 31 }, (_, i) => {
  const hour = Math.floor(i / 2) + 7;
  const min = (i % 2) * 30;
  return `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
});

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (m === 0) return `${h} hour${h !== 1 ? "s" : ""}`;
  return `${h} hour${h !== 1 ? "s" : ""} ${m} minutes`;
}

function validateDuration(minutes: number): string | null {
  const hours = minutes / 60;
  if (hours >= 2 && hours <= 5) return null; // half-day
  if (hours >= 6 && hours <= 10) return null; // full-day
  return "Please choose between 2–5 hours for a half-day or 6–10 hours for a full-day booking.";
}

export default function TreatmentRoomBookingPage() {
  const today = startOfDay(new Date());
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });

  const weeks = Array.from({ length: 4 }, (_, wi) =>
    Array.from({ length: 7 }, (_, di) => addDays(addWeeks(weekStart, wi), di))
  );

  const rangeFrom = format(weekStart, "yyyy-MM-dd");
  const rangeTo = format(addWeeks(weekStart, 4), "yyyy-MM-dd");

  const [rentals, setRentals] = useState<RentalRecord[]>([]);
  const [loadingGrid, setLoadingGrid] = useState(true);

  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    eventTitle: "",
    cateringRequired: false,
    notes: "",
  });

  const [conflict, setConflict] = useState(false);
  const [durationError, setDurationError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fetchRentals = useCallback(async () => {
    try {
      const res = await fetch(
        `/api/rentals?spaceId=treatment-room&from=${rangeFrom}&to=${rangeTo}`
      );
      if (res.ok) setRentals(await res.json());
    } catch {
      // silent
    } finally {
      setLoadingGrid(false);
    }
  }, [rangeFrom, rangeTo]);

  useEffect(() => {
    fetchRentals();
  }, [fetchRentals]);

  // Duration validation + real-time overlap check
  useEffect(() => {
    if (!form.date || !form.startTime || !form.endTime) {
      setConflict(false);
      setDurationError("");
      return;
    }
    const startISO = `${form.date}T${form.startTime}:00`;
    const endISO = `${form.date}T${form.endTime}:00`;
    const start = new Date(startISO);
    const end = new Date(endISO);

    if (end <= start) {
      setConflict(false);
      setDurationError("");
      return;
    }

    const mins = differenceInMinutes(end, start);
    const durErr = validateDuration(mins);
    setDurationError(durErr ?? "");

    if (durErr) {
      setConflict(false);
      return;
    }

    fetch(
      `/api/rentals?spaceId=treatment-room&from=${startISO}&to=${endISO}`
    )
      .then((r) => r.json())
      .then((data: RentalRecord[]) => setConflict(data.length > 0))
      .catch(() => setConflict(false));
  }, [form.date, form.startTime, form.endTime]);

  function getDayRentals(day: Date) {
    return rentals.filter((r) => isSameDay(parseISO(r.startTime), day));
  }

  function handleDayClick(day: Date) {
    if (isBefore(day, today)) return;
    setForm((f) => ({ ...f, date: format(day, "yyyy-MM-dd") }));
    setError("");
    setConflict(false);
    setDurationError("");
  }

  // Computed duration label
  const durationLabel = (() => {
    if (!form.startTime || !form.endTime) return "";
    const start = new Date(`2000-01-01T${form.startTime}:00`);
    const end = new Date(`2000-01-01T${form.endTime}:00`);
    if (end <= start) return "";
    const mins = differenceInMinutes(end, start);
    return formatDuration(mins);
  })();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (conflict || durationError) return;
    setSubmitting(true);
    setError("");

    const startISO = `${form.date}T${form.startTime}:00`;
    const endISO = `${form.date}T${form.endTime}:00`;

    try {
      const res = await fetch("/api/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spaceId: "treatment-room",
          practitionerId: "practitioner-demo",
          practitionerName: "Sofia Mendes", // TODO: replace with session user
          whatsappNumber: "+351912345678",   // TODO: replace with profile whatsappNumber
          startTime: startISO,
          endTime: endISO,
          eventTitle: form.eventTitle,
          spotsAvailable: 1, // Treatment Room is always 1-on-1
          cateringRequired: form.cateringRequired,
          notes: form.notes,
        }),
      });

      if (res.status === 409) {
        setError(
          "This time slot is already booked. Please choose a different time."
        );
        return;
      }
      if (!res.ok) {
        setError("Something went wrong. Please try again.");
        return;
      }

      setSuccess(true);
      setForm({
        date: "",
        startTime: "",
        endTime: "",
        eventTitle: "",
        cateringRequired: false,
        notes: "",
      });
      fetchRentals();
      setTimeout(() => setSuccess(false), 6000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const selectedDateRentals =
    form.date
      ? rentals.filter((r) =>
          isSameDay(parseISO(r.startTime), parseISO(form.date))
        )
      : [];

  return (
    <div>
      <h1
        className="text-3xl font-light mb-2"
        style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
      >
        Book the Treatment Room
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-stone-deep)" }}>
        Available in half-day (2–5 hours) or full-day (6–10 hours) sessions.
      </p>

      {/* ── Availability Grid ──────────────────────────── */}
      <section className="mb-10">
        <h2
          className="text-lg font-light mb-3"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
        >
          Availability — next 4 weeks
        </h2>

        <div className="flex items-center gap-4 mb-3 text-xs" style={{ color: "var(--color-stone-deep)" }}>
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-stone)" }}
            />
            Free
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ backgroundColor: "var(--color-stone)" }}
            />
            Has bookings
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-sm inline-block"
              style={{ backgroundColor: "var(--color-trumpet)" }}
            />
            Selected
          </span>
        </div>

        {loadingGrid ? (
          <p className="text-sm" style={{ color: "var(--color-stone-deep)" }}>
            Loading…
          </p>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-[420px]">
              <div className="grid grid-cols-7 gap-1 mb-1">
                {DAY_LABELS.map((d) => (
                  <div
                    key={d}
                    className="text-center text-xs py-1 tracking-wide"
                    style={{ color: "var(--color-stone-deep)" }}
                  >
                    {d}
                  </div>
                ))}
              </div>

              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7 gap-1 mb-1">
                  {week.map((day) => {
                    const dayRentals = getDayRentals(day);
                    const isPast = isBefore(day, today);
                    const isToday = isSameDay(day, today);
                    const isSelected = form.date === format(day, "yyyy-MM-dd");
                    const hasBookings = dayRentals.length > 0;

                    let bg = "var(--color-cream)";
                    let border = "1px solid var(--color-stone)";
                    if (isPast) {
                      bg = "transparent";
                      border = "1px solid transparent";
                    } else if (isSelected) {
                      bg = "var(--color-trumpet)";
                      border = "1px solid var(--color-trumpet-deep)";
                    } else if (hasBookings) {
                      bg = "var(--color-stone)";
                      border = "1px solid var(--color-stone-deep)";
                    }

                    return (
                      <button
                        key={day.toISOString()}
                        onClick={() => handleDayClick(day)}
                        disabled={isPast}
                        className="rounded-lg p-1.5 text-center transition-opacity flex flex-col items-center"
                        style={{
                          backgroundColor: bg,
                          border,
                          opacity: isPast ? 0.3 : 1,
                          cursor: isPast ? "default" : "pointer",
                          minHeight: "52px",
                        }}
                      >
                        <span
                          className="text-sm leading-none"
                          style={{
                            color: "var(--color-charcoal)",
                            fontWeight: isToday ? 700 : 400,
                          }}
                        >
                          {format(day, "d")}
                        </span>
                        <span
                          className="text-[10px] leading-none mt-0.5"
                          style={{ color: "var(--color-stone-deep)" }}
                        >
                          {format(day, "MMM")}
                        </span>
                        {hasBookings && !isPast && (
                          <span
                            className="text-[9px] mt-1 leading-none"
                            style={{
                              color: isSelected
                                ? "var(--color-charcoal)"
                                : "var(--color-cream)",
                            }}
                          >
                            {dayRentals.length} booked
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedDateRentals.length > 0 && (
          <div className="mt-4 space-y-2">
            <p
              className="text-xs tracking-widest uppercase"
              style={{ color: "var(--color-stone-deep)" }}
            >
              Existing bookings on{" "}
              {form.date && format(parseISO(form.date), "d MMMM")}
            </p>
            {selectedDateRentals.map((r) => (
              <div
                key={r.id}
                className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm"
                style={{
                  backgroundColor: "var(--color-stone)",
                  color: "var(--color-charcoal)",
                }}
              >
                <span>{r.eventTitle}</span>
                <span style={{ color: "var(--color-stone-deep)" }}>
                  {format(parseISO(r.startTime), "HH:mm")}–
                  {format(parseISO(r.endTime), "HH:mm")}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Success Banner ─────────────────────────────── */}
      {success && (
        <div
          className="mb-6 px-5 py-4 rounded-xl text-sm"
          style={{
            backgroundColor: "var(--color-trumpet)",
            color: "var(--color-charcoal)",
          }}
        >
          <strong>Booking confirmed!</strong> Your treatment room booking has
          been submitted and will appear in the grid above.
        </div>
      )}

      {/* ── Booking Form ───────────────────────────────── */}
      <section>
        <h2
          className="text-lg font-light mb-5"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
        >
          Booking form
        </h2>

        <form onSubmit={handleSubmit} className="max-w-lg space-y-5">
          {/* Date */}
          <div>
            <label
              className="text-xs tracking-widest uppercase block mb-1.5"
              style={{ color: "var(--color-stone-deep)" }}
            >
              Date <span style={{ color: "var(--color-charcoal)" }}>*</span>
            </label>
            <input
              required
              type="date"
              value={form.date}
              min={format(today, "yyyy-MM-dd")}
              onChange={(e) => {
                setForm({ ...form, date: e.target.value });
                setError("");
              }}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "var(--color-stone-warm)",
                color: "var(--color-charcoal)",
              }}
            />
          </div>

          {/* Start / End time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                className="text-xs tracking-widest uppercase block mb-1.5"
                style={{ color: "var(--color-stone-deep)" }}
              >
                Start time <span style={{ color: "var(--color-charcoal)" }}>*</span>
              </label>
              <select
                required
                value={form.startTime}
                onChange={(e) => {
                  setForm({ ...form, startTime: e.target.value, endTime: "" });
                  setError("");
                }}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{
                  backgroundColor: "var(--color-stone-warm)",
                  color: "var(--color-charcoal)",
                }}
              >
                <option value="">Select</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                className="text-xs tracking-widest uppercase block mb-1.5"
                style={{ color: "var(--color-stone-deep)" }}
              >
                End time <span style={{ color: "var(--color-charcoal)" }}>*</span>
              </label>
              <select
                required
                value={form.endTime}
                onChange={(e) => {
                  setForm({ ...form, endTime: e.target.value });
                  setError("");
                }}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{
                  backgroundColor: "var(--color-stone-warm)",
                  color: "var(--color-charcoal)",
                }}
              >
                <option value="">Select</option>
                {TIME_SLOTS.filter(
                  (t) => !form.startTime || t > form.startTime
                ).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration indicator */}
          {durationLabel && (
            <p
              className="text-sm"
              style={{
                color: durationError ? "#c0392b" : "var(--color-sage)",
              }}
            >
              {durationLabel}
              {durationError && ` — ${durationError}`}
            </p>
          )}

          {conflict && !durationError && (
            <p className="text-sm" style={{ color: "#c0392b" }}>
              This time overlaps an existing booking. Please choose a different
              time.
            </p>
          )}

          {/* Event title */}
          <div>
            <label
              className="text-xs tracking-widest uppercase block mb-1.5"
              style={{ color: "var(--color-stone-deep)" }}
            >
              Event title <span style={{ color: "var(--color-charcoal)" }}>*</span>
            </label>
            <input
              required
              type="text"
              value={form.eventTitle}
              onChange={(e) => setForm({ ...form, eventTitle: e.target.value })}
              placeholder="e.g. Deep Tissue Massage Sessions"
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{
                backgroundColor: "var(--color-stone-warm)",
                color: "var(--color-charcoal)",
              }}
            />
            <p className="text-xs mt-1" style={{ color: "var(--color-stone-deep)" }}>
              Shown on the public Upcoming Events page.
            </p>
          </div>

          {/* Catering */}
          <div>
            <label
              className="text-xs tracking-widest uppercase block mb-2"
              style={{ color: "var(--color-stone-deep)" }}
            >
              Catering required?
            </label>
            <div className="flex gap-5">
              {(
                [
                  { label: "Yes", value: true },
                  { label: "No", value: false },
                ] as const
              ).map(({ label, value }) => (
                <label
                  key={label}
                  className="flex items-center gap-2 cursor-pointer text-sm"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  <input
                    type="radio"
                    name="cateringRequired"
                    checked={form.cateringRequired === value}
                    onChange={() =>
                      setForm({ ...form, cateringRequired: value })
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
            {form.cateringRequired && (
              <p
                className="text-xs mt-2 px-3 py-2 rounded-lg"
                style={{
                  backgroundColor: "var(--color-stone-warm)",
                  color: "var(--color-charcoal)",
                }}
              >
                Our team will be in touch to discuss your catering package.
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label
              className="text-xs tracking-widest uppercase block mb-1.5"
              style={{ color: "var(--color-stone-deep)" }}
            >
              Anything else?
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Equipment requirements, access needs, special requests…"
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={{
                backgroundColor: "var(--color-stone-warm)",
                color: "var(--color-charcoal)",
              }}
            />
          </div>

          {error && (
            <p className="text-sm" style={{ color: "#c0392b" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || conflict || !!durationError}
            style={{
              backgroundColor:
                submitting || conflict || durationError
                  ? "var(--color-stone)"
                  : "var(--color-trumpet)",
              color: "var(--color-charcoal)",
            }}
            className="px-8 py-2.5 rounded-full text-sm font-medium transition-colors disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting…" : "Request booking"}
          </button>
        </form>
      </section>
    </div>
  );
}
