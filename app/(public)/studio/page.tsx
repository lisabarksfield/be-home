import Image from "next/image";
import Link from "next/link";
import { content } from "@/lib/content";
import { PricingDisclaimer } from "@/components/ui/PricingDisclaimer";

const { studio } = content;

export default function StudioPage() {
  return (
    <div>
      <section className="py-28 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
          {studio.hero.tagline}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
          {studio.hero.headline}
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: "var(--color-stone-deep)" }}>
          {studio.hero.body}
        </p>
        <Link
          href="/contact?subject=Studio+Booking"
          style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
          className="inline-block px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          {studio.hero.ctaLabel}
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="relative h-72 md:h-[500px]">
          <Image src="/studio/studio-1.jpg" alt="Be Home studio with yoga mats laid out" fill className="object-cover" />
        </div>
        <div className="relative h-72 md:h-[500px]">
          <Image src="/studio/studio-2.jpg" alt="Be Home studio space with sheer curtains" fill className="object-cover" />
        </div>
        <div className="relative h-72 md:h-[500px]">
          <Image src="/studio/studio-3.jpg" alt="Be Home studio full width view" fill className="object-cover" />
        </div>
      </div>

      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-light mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
              What's included
            </h2>
            <ul className="space-y-3">
              {studio.amenities.map((a) => (
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
                {studio.cateringNote}{" "}
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
              {studio.rates.map((r) => (
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
              {studio.ratesNote}
            </p>
            <PricingDisclaimer />
          </div>
        </div>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-light mb-3 text-center" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
            Some of the ways to lay out the Studio
          </h2>
          <p className="text-sm leading-relaxed max-w-2xl mx-auto mb-12 text-center" style={{ color: "var(--color-stone-deep)" }}>
            Concept layouts for the Studio&apos;s approximate 6.91 x 10.04 m floor, from yoga and pilates to workshops and full conference seating. Furniture counts are planning concepts, not approved capacities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {studio.layouts.map((l) => (
              <a
                key={l.title}
                href={l.image}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-xl overflow-hidden"
                style={{ backgroundColor: "var(--color-cream)", border: "1px solid var(--color-stone)" }}
              >
                <div className="relative aspect-[1819/1287]">
                  <Image
                    src={l.image}
                    alt={`Be Home Studio layout: ${l.title}`}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="px-3 py-3">
                  <p className="text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>{l.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--color-stone-deep)" }}>{l.meta}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="text-xs mt-8 text-center" style={{ color: "var(--color-stone-deep)" }}>
            <Link href={studio.planner.downloadHref} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "var(--color-charcoal)" }}>
              {studio.planner.downloadLabel}
            </Link>
          </p>
        </div>
      </section>

      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-cream)" }}>
        <h2 className="text-3xl font-light mb-3" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
          {studio.planner.heading}
        </h2>
        <p className="text-sm leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: "var(--color-stone-deep)" }}>
          {studio.planner.body}
        </p>
        <Link
          href="/plan-your-layout?room=studio"
          style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-cream)" }}
          className="inline-block px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          Try the Room Planner
        </Link>
      </section>

      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-trumpet)" }}>
        <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
          {studio.cta.headline}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact?subject=Studio+Booking"
            style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-cream)" }}
            className="px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Request a Booking
          </Link>
          <Link
            href="/treatment-room"
            style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
            className="px-8 py-3.5 rounded-full font-medium hover:opacity-60 transition-opacity"
          >
            Also see Treatment Room
          </Link>
        </div>
      </section>
    </div>
  );
}
