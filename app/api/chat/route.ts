import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are the friendly assistant for Be Home, a community wellness space in Cascais, Portugal.

Be Home has two spaces available to hire:
- The Studio: A spacious, light-filled space for yoga, movement, and group sessions. €25/hour, €85/half-day, €150/full day. Capacity up to 20 people.
- Treatment Room: A private room for one-to-one treatments, massage, coaching. €20/hour, €70/half-day, €120/full day.

Classes happen weekly - yoga, pilates, breathwork, meditation. Practitioners manage their own bookings.

Catering and drink packages available as add-ons: organic teas, juices, snack platters, full catering for retreats.

To hire a space or ask about availability, visitors should contact hello@behomecascais.com or use the contact form at /contact.

Be warm, concise, and helpful. If asked about specific availability or pricing not listed, suggest they get in touch directly. Respond in the same language the visitor writes in (Portuguese or English). Never make up information.`;

export async function POST(request: Request) {
  const { messages } = await request.json();

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      "I'm not fully configured yet. Please contact us at hello@behomecascais.com",
      { headers: { "Content-Type": "text/plain" } }
    );
  }

  const stream = client.messages.stream({
    model: "claude-sonnet-4-6",
    max_tokens: 512,
    system: SYSTEM_PROMPT,
    messages,
  });

  const readable = new ReadableStream({
    async start(controller) {
      for await (const event of stream) {
        if (
          event.type === "content_block_delta" &&
          event.delta.type === "text_delta"
        ) {
          controller.enqueue(new TextEncoder().encode(event.delta.text));
        }
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
