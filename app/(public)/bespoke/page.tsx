import Link from "next/link";
import { content } from "@/lib/content";

const { bespoke } = content;

export default function BespokePage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="py-28 px-6 text-center"
        style={{ backgroundColor: "var(--color-stone-warm)" }}
      >
        <div className="max-w-3xl mx-auto">
          <p
            className="text-xs tracking-[0.4em] uppercase mb-6"
            style={{ color: "var(--color-trumpet)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
          >
            {bespoke.hero.tagline}
          </p>
          <h1
            className="text-6xl md:text-8xl font-bold leading-none mb-8"
            style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}
          >
            {bespoke.hero.headline}
          </h1>
          <p
            className="text-lg md:text-xl leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: "var(--color-stone-deep)" }}
          >
            {bespoke.hero.body}
          </p>
          <Link
            href="/contact"
            style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
            className="px-8 py-3.5 rounded-full font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            {bespoke.cta.ctaLabel}
          </Link>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <h2
            className="text-4xl md:text-5xl font-light leading-tight"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
          >
            {bespoke.intro.headline}
          </h2>
          <p
            className="text-lg leading-relaxed"
            style={{ color: "var(--color-stone-deep)" }}
          >
            {bespoke.intro.body}
          </p>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {bespoke.experiences.map((exp) => (
              <div
                key={exp.title}
                className="rounded-2xl p-8 flex flex-col gap-3"
                style={{ backgroundColor: "var(--color-cream)" }}
              >
                <span className="text-3xl" style={{ color: "var(--color-trumpet)" }}>
                  {exp.icon}
                </span>
                <h3
                  className="text-xl font-light"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
                >
                  {exp.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone-deep)" }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tailored for everyone */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light text-center mb-12"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
          >
            {bespoke.tailored.headline}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="rounded-2xl p-10"
              style={{ backgroundColor: "var(--color-stone-warm)" }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: "var(--color-trumpet)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
              >
                {bespoke.tailored.adult.label}
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-stone-deep)" }}>
                {bespoke.tailored.adult.body}
              </p>
            </div>
            <div
              className="rounded-2xl p-10"
              style={{ backgroundColor: "var(--color-stone-warm)" }}
            >
              <p
                className="text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: "var(--color-trumpet)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
              >
                {bespoke.tailored.kids.label}
              </p>
              <p className="text-base leading-relaxed" style={{ color: "var(--color-stone-deep)" }}>
                {bespoke.tailored.kids.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-trumpet)" }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light text-center mb-12"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
          >
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {bespoke.howItWorks.map((item) => (
              <div key={item.step} className="text-center">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium mx-auto mb-4"
                  style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-cream)" }}
                >
                  {item.step}
                </div>
                <h3
                  className="text-lg font-medium mb-2"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)", opacity: 0.7 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center" style={{ backgroundColor: "var(--color-charcoal)" }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-light mb-6"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-cream)" }}
          >
            {bespoke.cta.headline}
          </h2>
          <p className="text-base leading-relaxed mb-10" style={{ color: "var(--color-stone)" }}>
            {bespoke.cta.body}
          </p>
          <Link
            href="/contact"
            style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
            className="px-8 py-3.5 rounded-full font-medium tracking-wide hover:opacity-90 transition-opacity"
          >
            {bespoke.cta.ctaLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
