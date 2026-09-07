import Link from "next/link";
import { content } from "@/lib/content";
import { EventCard } from "@/components/events/EventCard";

export const dynamic = 'force-dynamic';

const { events } = content;

export default function EventsPage() {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.list
    .filter((e) => e.isoDate >= today)
    .sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  const past = events.list
    .filter((e) => e.isoDate < today)
    .sort((a, b) => b.isoDate.localeCompare(a.isoDate));

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: "var(--color-stone-warm)" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--color-trumpet-deep)" }}
        >
          {events.hero.tagline}
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}
        >
          {events.hero.headline}
        </h1>
        <p
          className="text-base max-w-xl mx-auto"
          style={{ color: "var(--color-stone-deep)" }}
        >
          {events.hero.body}
        </p>
      </section>

      <div style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto px-6 py-14">

          {/* ── Curated / Special Events ──────────────── */}
          <section className="mb-16">
            <h2
              className="text-2xl font-light mb-6"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              Special events &amp; workshops
            </h2>

            {upcoming.length === 0 ? (
              <p className="text-sm italic" style={{ color: "var(--color-stone-deep)" }}>
                No upcoming events right now — check back soon.
              </p>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            )}
          </section>

          {/* ── Events Calendar link ──────────────────── */}
          <div className="mb-16">
            <Link
              href="/events/archive"
              className="inline-block text-sm font-medium hover:opacity-60 transition-opacity"
              style={{ color: "var(--color-charcoal)" }}
            >
              View full events calendar →
            </Link>
          </div>

          {/* ── Previous Events ───────────────────────── */}
          {past.length > 0 && (
            <section className="mb-16">
              <h2
                className="text-2xl font-light mb-6"
                style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
              >
                Previous events
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {past.slice(0, 3).map((e) => (
                  <EventCard key={e.id} event={e} dimmed />
                ))}
              </div>
            </section>
          )}

          {/* ── Host CTA ──────────────────────────────── */}
          <div className="text-center">
            <h3
              className="text-2xl font-light mb-3"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              {events.hostCta.headline}
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--color-stone-deep)" }}>
              {events.hostCta.body}
            </p>
            <Link
              href="/contact?subject=Event+Enquiry"
              className="inline-block px-8 py-3 rounded-full text-sm font-medium hover:opacity-60 transition-opacity"
              style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
            >
              {events.hostCta.ctaLabel}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
