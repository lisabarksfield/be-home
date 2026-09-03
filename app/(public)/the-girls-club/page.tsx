import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Baloo_2 } from "next/font/google";
import { content } from "@/lib/content";

export const dynamic = 'force-dynamic';

const { girlsClub, events } = content;

const rounded = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700"] });
const displayFont = "'Gulfs Display', sans-serif";

const GC = {
  cream: "#FFF7D3",
  pink: "#F16EC3",
  orange: "#FB9553",
  orangeDeep: "#F2793D",
  tan: "#E0A97F",
};

function displayHeadingStyle(color: string) {
  return { color, fontFamily: displayFont };
}

// Drops the leading weekday ("Wednesday, ") to save horizontal space in the compact events table.
function shortDate(date: string) {
  return date.replace(/^[A-Za-z]+,\s*/, "");
}

const grainOverlay =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function GradientBand({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="relative py-24 px-6 text-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at 12% 92%, ${GC.tan} 0%, transparent 50%), linear-gradient(135deg, ${GC.pink} 0%, ${GC.orange} 55%, ${GC.orangeDeep} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: grainOverlay, opacity: 0.18, mixBlendMode: "overlay" }}
      />
      <div className="relative">{children}</div>
    </section>
  );
}

export default function TheGirlsClubPage() {
  const today = new Date().toISOString().slice(0, 10);
  const upcomingEvents = events.list.filter(
    (e) => "series" in e && e.series === "girlsClub" && e.isoDate >= today
  );

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <GradientBand>
        <div className="max-w-2xl mx-auto">
          <Image
            src="/the-girls-club/logo.jpg"
            alt="The Girls Club"
            width={200}
            height={200}
            priority
            className="mx-auto mb-8 rounded-[2rem] shadow-lg"
          />
          <p
            className={`${rounded.className} text-sm uppercase tracking-[0.3em] mb-3`}
            style={{ color: GC.cream }}
          >
            {girlsClub.hero.tagline}
          </p>
          <h1
            className="text-5xl md:text-7xl mb-6"
            style={displayHeadingStyle(GC.cream)}
          >
            {girlsClub.hero.headline}
          </h1>
          <p
            className={`${rounded.className} text-xl md:text-2xl`}
            style={{ color: GC.cream }}
          >
            {girlsClub.hero.body}
          </p>
        </div>
      </GradientBand>

      {/* ── What is The Girls Club? ──────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl mb-8"
            style={displayHeadingStyle(GC.orangeDeep)}
          >
            {girlsClub.intro.headline}
          </h2>
          <div className="space-y-5">
            {girlsClub.intro.body.map((para, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's coming ─────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="max-w-2xl mx-auto">
          <p
            className={`${rounded.className} text-sm uppercase tracking-[0.3em] mb-3`}
            style={{ color: GC.pink }}
          >
            {girlsClub.whatsComing.subheadline}
          </p>
          <h2
            className="text-3xl md:text-4xl mb-8"
            style={displayHeadingStyle(GC.orangeDeep)}
          >
            {girlsClub.whatsComing.headline}
          </h2>
          <div className="space-y-5">
            {girlsClub.whatsComing.body.map((para, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Upcoming events ────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl mb-8"
            style={displayHeadingStyle(GC.orangeDeep)}
          >
            Upcoming events
          </h2>
          {upcomingEvents.length === 0 ? (
            <p className="text-base italic" style={{ color: "var(--color-charcoal)" }}>
              No upcoming events right now, check back soon.
            </p>
          ) : (
            <>
              {/* Table layout, sm screens and up */}
              <div
                className="hidden sm:grid gap-x-4 gap-y-4"
                style={{ gridTemplateColumns: "auto 1fr auto auto" }}
              >
                {upcomingEvents.map((e) => (
                  <Fragment key={e.id}>
                    <p className="text-sm whitespace-nowrap" style={{ color: "var(--color-stone-deep)" }}>
                      {shortDate(e.date)}
                    </p>
                    <p className="text-base font-medium whitespace-nowrap" style={{ color: "var(--color-charcoal)" }}>
                      {e.title}
                    </p>
                    <p className="text-sm whitespace-nowrap" style={{ color: "var(--color-stone-deep)" }}>
                      {e.time}
                    </p>
                    {"bookingUrl" in e && e.bookingUrl ? (
                      <a
                        href={e.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${rounded.className} text-xs font-medium whitespace-nowrap px-3 py-1.5 rounded-full text-center hover:opacity-90 transition-opacity`}
                        style={{ backgroundColor: GC.orangeDeep, color: GC.cream }}
                      >
                        {"bookingLabel" in e && e.bookingLabel ? e.bookingLabel : "Book now →"}
                      </a>
                    ) : (
                      <p
                        className={`${rounded.className} text-sm font-medium whitespace-nowrap`}
                        style={{ color: GC.orangeDeep }}
                      >
                        {e.price}
                      </p>
                    )}
                  </Fragment>
                ))}
              </div>

              {/* Stacked layout, below sm */}
              <div className="sm:hidden space-y-4">
                {upcomingEvents.map((e) => (
                  <div key={e.id}>
                    <p className="text-base font-medium" style={{ color: "var(--color-charcoal)" }}>
                      {e.title}
                    </p>
                    <p className="text-sm mb-2" style={{ color: "var(--color-stone-deep)" }}>
                      {e.date} · {e.time}
                    </p>
                    {"bookingUrl" in e && e.bookingUrl ? (
                      <a
                        href={e.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${rounded.className} inline-block text-xs font-medium px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity`}
                        style={{ backgroundColor: GC.orangeDeep, color: GC.cream }}
                      >
                        {"bookingLabel" in e && e.bookingLabel ? e.bookingLabel : "Book now →"}
                      </a>
                    ) : (
                      <p
                        className={`${rounded.className} text-sm font-medium`}
                        style={{ color: GC.orangeDeep }}
                      >
                        {e.price}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
          <Link
            href="/events"
            className="inline-block mt-6 text-sm font-medium hover:opacity-60 transition-opacity"
            style={{ color: "var(--color-charcoal)" }}
          >
            View full events calendar →
          </Link>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl mb-10 text-center"
            style={displayHeadingStyle(GC.orangeDeep)}
          >
            {girlsClub.testimonials.headline}
          </h2>
          <div className="space-y-14">
            {girlsClub.testimonials.items.map((t, i) => (
              <figure key={i}>
                <blockquote className="space-y-4">
                  {t.quote.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      className="text-lg md:text-xl italic leading-relaxed"
                      style={{ color: "var(--color-charcoal)" }}
                    >
                      {para}
                    </p>
                  ))}
                </blockquote>
                <figcaption
                  className={`${rounded.className} text-sm font-medium mt-6`}
                  style={{ color: GC.orangeDeep }}
                >
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── Have an idea? CTA ─────────────────────────── */}
      <GradientBand>
        <div className="max-w-xl mx-auto">
          <h2
            className="text-3xl md:text-5xl mb-6"
            style={displayHeadingStyle(GC.cream)}
          >
            {girlsClub.ideaCta.headline}
          </h2>
          <div className="space-y-4 mb-10">
            {girlsClub.ideaCta.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: GC.cream, opacity: 0.9 }}>
                {para}
              </p>
            ))}
          </div>
          <Link
            href="/contact?subject=The+Girls+Club"
            className={`${rounded.className} inline-block px-8 py-3.5 rounded-full font-medium tracking-wide hover:opacity-90 transition-opacity`}
            style={{ backgroundColor: GC.cream, color: GC.orangeDeep }}
          >
            {girlsClub.ideaCta.ctaLabel}
          </Link>
        </div>
      </GradientBand>
    </div>
  );
}
