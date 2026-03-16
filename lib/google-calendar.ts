import { google } from "googleapis";

/**
 * Creates an event on the owner's Google Calendar using a service account.
 *
 * Required env vars:
 *   GOOGLE_CALENDAR_ID         — owner's calendar ID (e.g. owner@behome.pt)
 *   GOOGLE_SERVICE_ACCOUNT_KEY — full JSON key string for the service account
 *
 * Returns the created event ID, or null if the calendar integration is not
 * configured or if the API call fails (booking still succeeds in either case).
 */
export async function addCalendarEvent(booking: {
  eventTitle: string;
  practitionerName: string;
  spaceName: string;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  cateringRequired: boolean;
  notes: string;
}): Promise<string | null> {
  try {
    const keyString = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!keyString || !calendarId) {
      return null; // integration not configured — silent no-op
    }

    const credentials = JSON.parse(keyString);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/calendar"],
    });

    const calendar = google.calendar({ version: "v3", auth });

    const title = `[${booking.spaceName}] ${booking.eventTitle} – ${booking.practitionerName}`;

    const descriptionLines = [
      `Practitioner: ${booking.practitionerName}`,
      `Space: ${booking.spaceName}`,
      `Catering: ${booking.cateringRequired ? "Required — team will follow up" : "Not required"}`,
    ];
    if (booking.notes) {
      descriptionLines.push(`Notes: ${booking.notes}`);
    }

    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: title,
        description: descriptionLines.join("\n"),
        start: { dateTime: booking.startTime, timeZone: "Europe/Lisbon" },
        end: { dateTime: booking.endTime, timeZone: "Europe/Lisbon" },
      },
    });

    return event.data.id ?? null;
  } catch (err) {
    console.error("[google-calendar] Failed to create event:", err);
    return null;
  }
}
