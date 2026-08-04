import Link from "next/link";
import { notFound } from "next/navigation";
import { content } from "@/lib/content";

export default async function ArchivedEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = content.events.list.find((e) => e.id === id);

  if (!event) return notFound();

  return (
    <div>
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="max-w-4xl mx-auto">
          <Link
            href="/events/archive"
            className="text-sm hover:opacity-60 transition-opacity mb-8 inline-block"
            style={{ color: "var(--color-stone-deep)" }}
          >
            ← Back to archive
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
                >
                  {event.type}
                </span>
                <span className="text-sm" style={{ color: "var(--color-stone-deep)" }}>
                  {event.date} · {event.time}
                </span>
              </div>
              <h1
                className="text-4xl md:text-6xl font-light mb-2"
                style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
              >
                {event.title}
              </h1>
              <p className="text-base" style={{ color: "var(--color-stone-deep)" }}>
                with {event.practitioner}
              </p>
            </div>
            <p
              className="text-3xl font-light"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              {event.price}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-4xl mx-auto space-y-4">
          {event.description.split("\n\n").map((para, i) => (
            <p key={i} className="text-base leading-relaxed" style={{ color: "var(--color-stone-deep)" }}>
              {para}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}
