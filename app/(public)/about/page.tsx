import Link from "next/link";
import { content } from "@/lib/content";

const { about } = content;

export default function AboutPage() {
  return (
    <div>
      <section className="py-28 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet)" }}>
          {about.hero.tagline}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
          {about.hero.headline}
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--color-stone-deep)" }}>
          {about.hero.subheadline}
        </p>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="h-80 rounded-2xl flex items-center justify-center text-sm" style={{ backgroundColor: "var(--color-stone)", color: "var(--color-stone-deep)" }}>
            [ About photo coming soon ]
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
              {about.story.headline}
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--color-stone-deep)" }}>
              {about.story.body1}
            </p>
            <p className="text-base leading-relaxed mb-4" style={{ color: "var(--color-stone-deep)" }}>
              {about.story.body2}
            </p>
            <p className="text-base leading-relaxed" style={{ color: "var(--color-stone-deep)" }}>
              {about.story.body3}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
            Our values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {about.values.map((v) => (
              <div key={v.title}>
                <h3 className="text-xl font-light mb-3" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone-deep)" }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-cream)" }}>
        <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
          {about.cta.headline}
        </h2>
        <p className="text-base mb-8 max-w-lg mx-auto" style={{ color: "var(--color-stone-deep)" }}>
          {about.cta.body}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
            className="px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            {about.cta.ctaPrimary}
          </Link>
          <Link
            href="/events"
            style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
            className="px-8 py-3.5 rounded-full font-medium hover:opacity-60 transition-opacity"
          >
            {about.cta.ctaSecondary}
          </Link>
        </div>
      </section>
    </div>
  );
}
