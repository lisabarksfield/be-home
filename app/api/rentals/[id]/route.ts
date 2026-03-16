import { NextRequest, NextResponse } from "next/server";
import { getRentalById, updateRental } from "@/lib/rentals-store";

// GET /api/rentals/:id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const rental = getRentalById(id);

  if (!rental) {
    return NextResponse.json({ error: "Rental not found" }, { status: 404 });
  }

  return NextResponse.json(rental);
}

// PATCH /api/rentals/:id
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const updated = updateRental(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Rental not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[rentals/:id] PATCH error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
