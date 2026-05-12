import Link from "next/link";
import { content } from "@/lib/content";

const { roots } = content;

export default function RootsPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────── */}
      <section
        className="py-24 px-6 text-center"
        style={{ backgroundColor: "var(--color-stone-warm)" }}
      >
        <p
          className="text-xs tracking-[0.4em] uppercase mb-5"
          style={{ color: "var(--color-trumpet-deep)" }}
        >
          {roots.hero.tagline}
        </p>
        <h1
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}
        >
          {roots.hero.headline}
        </h1>
        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          style={{ color: "var(--color-stone-deep)" }}
        >
          {roots.hero.body}
        </p>
        <a
          href={roots.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium tracking-wide hover:opacity-90 transition-opacity"
          style={{ backgroundColor: "#25D366", color: "#fff" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          {roots.cta.ctaLabel}
        </a>
      </section>

      {/* ── What is this / Intro ─────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-light mb-6"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
          >
            {roots.intro.headline}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-stone-deep)" }}
          >
            {roots.intro.body}
          </p>
        </div>
      </section>

      {/* ── Details ──────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: logistics */}
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: "var(--color-trumpet-deep)" }}
              >
                Programme details
              </p>
              <dl className="space-y-4">
                {[
                  { label: "Starts", value: roots.details.startDate },
                  { label: "Time", value: roots.details.time },
                  { label: "Location", value: roots.details.location },
                  { label: "Duration", value: roots.details.duration },
                  { label: "Investment", value: roots.details.price },
                ].map(({ label, value }) => (
                  <div key={label} className="flex gap-4">
                    <dt
                      className="text-sm w-24 shrink-0 pt-0.5"
                      style={{ color: "var(--color-stone-deep)" }}
                    >
                      {label}
                    </dt>
                    <dd
                      className="text-base font-medium"
                      style={{ color: "var(--color-charcoal)" }}
                    >
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Right: what's included */}
            <div>
              <p
                className="text-xs tracking-[0.3em] uppercase mb-6"
                style={{ color: "var(--color-trumpet-deep)" }}
              >
                What's included
              </p>
              <ul className="space-y-3">
                {roots.details.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-base"
                    style={{ color: "var(--color-stone-deep)" }}
                  >
                    <span style={{ color: "var(--color-trumpet)" }}>◦</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── The 6 weeks ──────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "var(--color-trumpet-deep)" }}
            >
              Six sessions
            </p>
            <h2
              className="text-3xl md:text-4xl font-light"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              What we cover
            </h2>
          </div>

          <div className="space-y-4">
            {roots.weeks.map((w) => (
              <div
                key={w.week}
                className="rounded-2xl p-8"
                style={{ backgroundColor: "var(--color-stone-warm)" }}
              >
                <div className="flex flex-wrap items-baseline gap-3 mb-3">
                  <span
                    className="text-xs tracking-widest uppercase"
                    style={{ color: "var(--color-stone-deep)" }}
                  >
                    {w.week} · {w.date}
                  </span>
                  <h3
                    className="text-xl font-light"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
                  >
                    {w.focus}
                  </h3>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-stone-deep)" }}
                >
                  {w.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: "var(--color-trumpet)" }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-light mb-5"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
          >
            {roots.cta.headline}
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "var(--color-charcoal)" }}
          >
            {roots.cta.body}
          </p>
          <a
            href={roots.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-medium tracking-wide hover:opacity-90 transition-opacity"
            style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-cream)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {roots.cta.ctaLabel}
          </a>
        </div>
      </section>
    </div>
  );
}
