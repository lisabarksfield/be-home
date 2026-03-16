import Link from "next/link";
import { content } from "@/lib/content";

const { homepage } = content;

// Subset of classes shown on the homepage
const upcomingClasses = content.classes.schedule.slice(0, 3);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6"
        style={{ backgroundColor: "var(--color-stone-warm)" }}
      >
        <div className="max-w-3xl">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: "var(--color-stone-deep)" }}
          >
            {homepage.hero.tagline}
          </p>
          <h1
            className="text-6xl md:text-8xl font-bold leading-none mb-8"
            style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}
          >
            {homepage.hero.headlineLine1}
            <br />
            <em style={{ color: "var(--color-trumpet)", WebkitTextStroke: "1px var(--color-stone-deep)" }}>{homepage.hero.headlineLine2}</em>
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto"
            style={{ color: "var(--color-stone-deep)" }}
          >
            {homepage.hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/studio"
              style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
              className="px-8 py-3.5 rounded-full font-medium tracking-wide hover:opacity-90 transition-opacity"
            >
              {homepage.hero.ctaPrimary}
            </Link>
            <Link
              href="/classes"
              style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
              className="px-8 py-3.5 rounded-full font-medium tracking-wide hover:opacity-60 transition-opacity"
            >
              {homepage.hero.ctaSecondary}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 animate-pulse" style={{ backgroundColor: "var(--color-stone-deep)" }} />
        </div>
      </section>

      {/* Spaces */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-trumpet)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
              {homepage.spaces.sectionTagline}
            </p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
              {homepage.spaces.sectionHeadline}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {homepage.spaces.cards.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-8 flex flex-col gap-4"
                style={{ backgroundColor: "var(--color-stone-warm)" }}
              >
                <span className="text-3xl" style={{ color: "var(--color-trumpet)" }}>{f.icon}</span>
                <h3 className="text-2xl font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--color-stone-deep)" }}>
                  {f.description}
                </p>
                <Link href={f.href} className="text-sm font-medium tracking-wide flex items-center gap-2 hover:gap-3 transition-all" style={{ color: "var(--color-charcoal)" }}>
                  {f.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming classes */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--color-trumpet)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
                {homepage.schedule.sectionTagline}
              </p>
              <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
                {homepage.schedule.sectionHeadline}
              </h2>
            </div>
            <Link href="/classes" className="text-sm tracking-wide hover:opacity-60 transition-opacity" style={{ color: "var(--color-charcoal)" }}>
              {homepage.schedule.fullScheduleLabel}
            </Link>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--color-stone)" }}>
            {upcomingClasses.map((c) => (
              <div key={c.id} className="py-5 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-6 flex-wrap">
                  <span className="text-sm font-mono w-36" style={{ color: "var(--color-stone-deep)" }}>
                    {c.day} {c.time}
                  </span>
                  <div>
                    <p className="font-medium" style={{ color: "var(--color-charcoal)" }}>{c.title}</p>
                    <p className="text-sm" style={{ color: "var(--color-stone-deep)" }}>with {c.practitioner}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs px-3 py-1 rounded-full" style={{ backgroundColor: "var(--color-trumpet-light)", color: "var(--color-charcoal)" }}>
                    {c.type}
                  </span>
                  <span className="text-sm" style={{ color: "var(--color-stone-deep)" }}>{c.spots} spots left</span>
                  <Link
                    href={`/classes/${c.id}`}
                    style={{ border: "1px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
                    className="text-sm px-4 py-1.5 rounded-full hover:opacity-60 transition-opacity"
                  >
                    Book
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-6" style={{ color: "var(--color-trumpet)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
            {homepage.philosophy.sectionTagline}
          </p>
          <blockquote className="text-3xl md:text-4xl font-light leading-relaxed mb-10" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
            {homepage.philosophy.quote}
          </blockquote>
          <Link
            href="/about"
            style={{ color: "var(--color-charcoal)", borderBottom: "1px solid var(--color-charcoal)" }}
            className="text-sm tracking-wide hover:opacity-60 transition-opacity pb-0.5"
          >
            {homepage.philosophy.ctaLabel}
          </Link>
        </div>
      </section>

      {/* Practitioner strip */}
      <section className="py-24 px-6" style={{ backgroundColor: "var(--color-trumpet)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
            {homepage.practitionerStrip.headline}
          </h2>
          <p className="text-lg leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: "var(--color-charcoal)" }}>
            {homepage.practitionerStrip.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/studio"
              style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-cream)" }}
              className="px-8 py-3.5 rounded-full font-medium tracking-wide hover:opacity-90 transition-opacity"
            >
              {homepage.practitionerStrip.ctaPrimary}
            </Link>
            <Link
              href="/practitioners"
              style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
              className="px-8 py-3.5 rounded-full font-medium tracking-wide hover:opacity-60 transition-opacity"
            >
              {homepage.practitionerStrip.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
