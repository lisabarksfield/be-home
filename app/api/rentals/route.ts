import { NextRequest, NextResponse } from "next/server";
import {
  getRentals,
  checkOverlap,
  createRental,
} from "@/lib/rentals-store";
import { addCalendarEvent } from "@/lib/google-calendar";

const SPACE_NAMES: Record<string, string> = {
  studio: "Studio",
  "treatment-room": "Treatment Room",
};

// GET /api/rentals?spaceId=studio&from=2026-02-23&to=2026-03-23
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const spaceId = searchParams.get("spaceId") ?? undefined;
  const from = searchParams.get("from") ?? undefined;
  const to = searchParams.get("to") ?? undefined;

  const rentals = getRentals({ spaceId, from, to });
  return NextResponse.json(rentals);
}

// POST /api/rentals
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      spaceId,
      practitionerId,
      practitionerName,
      whatsappNumber,
      startTime,
      endTime,
      eventTitle,
      spotsAvailable,
      cateringRequired = false,
      notes = "",
    } = body as {
      spaceId: string;
      practitionerId: string;
      practitionerName: string;
      whatsappNumber: string;
      startTime: string;
      endTime: string;
      eventTitle: string;
      spotsAvailable: number;
      cateringRequired?: boolean;
      notes?: string;
    };

    // Validate required fields
    if (
      !spaceId ||
      !practitionerId ||
      !practitionerName ||
      !startTime ||
      !endTime ||
      !eventTitle
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (new Date(endTime) <= new Date(startTime)) {
      return NextResponse.json(
        { error: "End time must be after start time" },
        { status: 400 }
      );
    }

    // Check for overlapping bookings
    if (checkOverlap(spaceId, startTime, endTime)) {
      return NextResponse.json(
        {
          error:
            "This time slot is already booked. Please choose a different time.",
        },
        { status: 409 }
      );
    }

    const spaceName = SPACE_NAMES[spaceId] ?? spaceId;

    const rental = createRental({
      spaceId,
      spaceName,
      practitionerId,
      practitionerName,
      whatsappNumber: whatsappNumber ?? "",
      eventTitle,
      startTime,
      endTime,
      spotsAvailable: spotsAvailable ?? 1,
      cateringRequired,
      notes,
      status: "CONFIRMED",
    });

    // Fire Google Calendar event creation — non-blocking, booking succeeds regardless
    addCalendarEvent({
      eventTitle,
      practitionerName,
      spaceName,
      startTime,
      endTime,
      cateringRequired,
      notes,
    }).then((gcalId) => {
      if (gcalId) {
        console.log(`[rentals] Google Calendar event created: ${gcalId}`);
      }
    });

    return NextResponse.json(rental, { status: 201 });
  } catch (err) {
    console.error("[rentals] POST error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
