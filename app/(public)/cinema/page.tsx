import Image from "next/image";
import Link from "next/link";
import { content } from "@/lib/content";

const { cinema } = content;

export default function CinemaPage() {
  return (
    <div>
      <section className="py-28 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
          {cinema.hero.tagline}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
          {cinema.hero.headline}
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: "var(--color-stone-deep)" }}>
          {cinema.hero.body}
        </p>
        <Link
          href={cinema.hero.ctaHref}
          style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
          className="inline-block px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          {cinema.hero.ctaLabel}
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="relative h-72 md:h-[500px]">
          <Image src="/cinema/cinema-1.jpg" alt="Be Home Cinema — screen and blue velvet seating" fill className="object-cover" />
        </div>
        <div className="relative h-72 md:h-[500px]">
          <Image src="/cinema/cinema-2.jpg" alt="Be Home Cinema — view facing the projection screen" fill className="object-cover" />
        </div>
        <div className="relative h-72 md:h-[500px]">
          <Image src="/cinema/cinema-3.jpg" alt="Be Home Cinema — seating and ambient lighting" fill className="object-cover" />
        </div>
      </div>

      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-light mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
              What&apos;s included
            </h2>
            <ul className="space-y-3">
              {cinema.amenities.map((a) => (
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
                Food and drink packages available on request — organic teas, juices, snack platters and more.{" "}
                <Link href="/catering" style={{ color: "var(--color-charcoal)" }} className="underline">
                  View catering options
                </Link>
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-light mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
              Availability &amp; Pricing
            </h2>
            <div className="p-6 rounded-xl" style={{ backgroundColor: "var(--color-stone-warm)" }}>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
                {cinema.note}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-trumpet)" }}>
        <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
          {cinema.cta.headline}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact?subject=Cinema+Hire"
            style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-cream)" }}
            className="px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            Enquire Now
          </Link>
          <Link
            href="/gallery"
            style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
            className="px-8 py-3.5 rounded-full font-medium hover:opacity-60 transition-opacity"
          >
            See More Photos
          </Link>
        </div>
      </section>
    </div>
  );
}
