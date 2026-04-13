import Link from "next/link";
import Image from "next/image";
import { content } from "@/lib/content";

const { homepage } = content;

// Subset of events shown on the homepage
const upcomingEvents = content.events.list.slice(0, 3);

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
              href="/contact"
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
            <Link
              href="/gallery"
              style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
              className="px-8 py-3.5 rounded-full font-medium tracking-wide hover:opacity-60 transition-opacity"
            >
              View Gallery
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-px h-12 animate-pulse" style={{ backgroundColor: "var(--color-stone-deep)" }} />
        </div>
      </section>

      {/* Photo strip */}
      <section className="py-16 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-7xl mx-auto">
          {/* Top row: wide studio + treatment room */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <Image src="/home/home-studio-wide.jpg" alt="The Studio — yoga mats laid out" fill className="object-cover" />
            </div>
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <Image src="/home/home-treatment.jpg" alt="Treatment Room" fill className="object-cover" />
            </div>
          </div>
          {/* Bottom row: person in studio + workshop wide + workshop host */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src="/home/home-studio-person.jpg" alt="The Studio — practitioner meditating" fill className="object-cover" />
            </div>
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src="/home/home-workshop-wide.jpg" alt="The Workshop — full room" fill className="object-cover" />
            </div>
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <Image src="/home/home-workshop-host.jpg" alt="The Workshop — workshop in session" fill className="object-cover" />
            </div>
          </div>
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
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
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

          {/* Matterport 3D Tour */}
          <div className="mt-16">
            <p
              className="text-xs tracking-[0.3em] uppercase mb-4 text-center"
              style={{ color: "var(--color-trumpet)" }}
            >
              Explore the space
            </p>
            <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://my.matterport.com/show/?m=1m8BpcWptXP"
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; web-share; xr-spatial-tracking"
                allowFullScreen
                frameBorder="0"
              />
            </div>
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
            {upcomingEvents.map((e) => (
              <div key={e.id} className="py-5 flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-6 flex-wrap">
                  <span className="text-sm font-mono" style={{ color: "var(--color-stone-deep)" }}>
                    {e.date} · {e.time}
                  </span>
                  <div>
                    <p className="font-medium" style={{ color: "var(--color-charcoal)" }}>{e.title}</p>
                    <p className="text-sm" style={{ color: "var(--color-stone-deep)" }}>with {e.practitioner}</p>
                  </div>
                </div>
                {"whatsappUrl" in e && e.whatsappUrl && (
                  <a
                    href={e.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                    style={{ backgroundColor: "#25D366", color: "#fff" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Book via WhatsApp
                  </a>
                )}
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
