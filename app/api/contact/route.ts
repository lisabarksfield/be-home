import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, subject, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // TODO: Once Prisma is configured, save to ContactSubmission table
  // TODO: Once Resend is configured, send notification email to admin

  console.log("Contact form submission:", { name, email, phone, subject, message });

  return NextResponse.json({ success: true });
}
