// This page has been merged into /events.
// Redirect anyone with a saved link.
import { redirect } from "next/navigation";

export default function UpcomingEventsRedirect() {
  redirect("/events");
}
