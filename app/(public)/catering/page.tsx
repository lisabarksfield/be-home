import Link from "next/link";
import { content } from "@/lib/content";
import { PricingDisclaimer } from "@/components/ui/PricingDisclaimer";

const { catering } = content;

const typeColors: Record<string, string> = {
  DRINKS: "var(--color-sage)",
  FOOD: "var(--color-trumpet)",
  FULL_PACKAGE: "var(--color-charcoal)",
};

const typeLabels: Record<string, string> = {
  DRINKS: "Drinks",
  FOOD: "Food",
  FULL_PACKAGE: "Full Package",
};

export default function CateringPage() {
  return (
    <div>
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
          {catering.hero.tagline}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
          {catering.hero.headline}
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-stone-deep)" }}>
          {catering.hero.body}
        </p>
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {catering.packages.map((p) => (
            <div key={p.id} className="rounded-2xl overflow-hidden" style={{ backgroundColor: "var(--color-stone-warm)" }}>
              <div className="h-2" style={{ backgroundColor: typeColors[p.type] }} />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="text-xs tracking-widest uppercase mb-2 inline-block" style={{ color: typeColors[p.type] }}>
                      {typeLabels[p.type]}
                    </span>
                    <h2 className="text-2xl font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
                      {p.name}
                    </h2>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
                      €{p.pricePerHead}*
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>per person</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-stone-deep)" }}>
                  {p.description}
                </p>
                <ul className="space-y-1.5 mb-6">
                  {p.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--color-charcoal)" }}>
                      <span style={{ color: "var(--color-trumpet)" }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>Minimum {p.minimumPeople} people</p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-6xl mx-auto mt-4 px-1">
          <PricingDisclaimer />
        </div>

        <div className="max-w-6xl mx-auto mt-12 p-8 rounded-2xl text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
          <h3 className="text-2xl font-light mb-3" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
            {catering.bespoke.headline}
          </h3>
          <p className="text-sm mb-6" style={{ color: "var(--color-stone-deep)" }}>
            {catering.bespoke.body}
          </p>
          <Link
            href="/contact?subject=Catering+Enquiry"
            style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
            className="inline-block px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {catering.bespoke.ctaLabel}
          </Link>
        </div>
      </section>

      <section className="py-10 px-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm" style={{ color: "var(--color-stone-deep)" }}>
            {catering.footer}{" "}
            <Link href="/contact" style={{ color: "var(--color-charcoal)" }} className="underline">
              get in touch
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
