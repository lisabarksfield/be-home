import Image from "next/image";
import Link from "next/link";
import { content } from "@/lib/content";
import { PricingDisclaimer } from "@/components/ui/PricingDisclaimer";

const { workshop } = content;

export default function WorkshopPage() {
  return (
    <div>
      <section className="py-28 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
          {workshop.hero.tagline}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
          {workshop.hero.headline}
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: "var(--color-stone-deep)" }}>
          {workshop.hero.body}
        </p>
        <Link
          href={workshop.hero.ctaHref}
          style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
          className="inline-block px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          {workshop.hero.ctaLabel}
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="relative h-72 md:h-[500px]">
          <Image src="/workshop/workshop-1.jpg" alt="Be Home workshop space with dining table and sofas" fill className="object-cover" />
        </div>
        <div className="relative h-72 md:h-[500px]">
          <Image src="/workshop/workshop-2.jpg" alt="Be Home workshop room with curved sofa and fireplace" fill className="object-cover" />
        </div>
        <div className="relative h-72 md:h-[500px]">
          <Image src="/workshop/workshop-3.jpg" alt="Be Home workshop dining table setup with fireplace" fill className="object-cover" />
        </div>
      </div>

      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-light mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
              What&apos;s included
            </h2>
            <ul className="space-y-3">
              {workshop.amenities.map((a) => (
                <li key={a} className="flex items-center gap-3 text-sm" style={{ color: "var(--color-charcoal)" }}>
                  <span style={{ color: "var(--color-trumpet)" }}>✓</span>
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <h3 className="text-xl font-light mb-4" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
                Catering add-ons
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone-deep)" }}>
                {workshop.cateringNote}{" "}
                <Link href="/catering" style={{ color: "var(--color-charcoal)" }} className="underline">
                  View catering options
                </Link>
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-light mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
              Rates
            </h2>
            <div className="space-y-4">
              {workshop.rates.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between p-5 rounded-xl"
                  style={{ backgroundColor: "var(--color-stone-warm)" }}
                >
                  <div>
                    <p className="font-medium" style={{ color: "var(--color-charcoal)" }}>{r.label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--color-stone-deep)" }}>{r.note}</p>
                  </div>
                  <p className="text-2xl font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
                    {r.price}*
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs mt-4" style={{ color: "var(--color-stone-deep)" }}>
              {workshop.ratesNote}
            </p>
            <PricingDisclaimer />
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-trumpet)" }}>
        <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
          {workshop.cta.headline}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact?subject=Workshop+Hire"
            style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-cream)" }}
            className="px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Request a Booking
          </Link>
          <Link
            href="/studio"
            style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
            className="px-8 py-3.5 rounded-full font-medium hover:opacity-60 transition-opacity"
          >
            Also see The Studio
          </Link>
        </div>
      </section>
    </div>
  );
}
