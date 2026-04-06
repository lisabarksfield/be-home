import Link from "next/link";
import Image from "next/image";
import { content } from "@/lib/content";

const { practitioners } = content;

export default function PractitionersPage() {
  return (
    <div>
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet)" }}>
          {practitioners.hero.tagline}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
          {practitioners.hero.headline}
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-stone-deep)" }}>
          {practitioners.hero.body}
        </p>
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {practitioners.directory.map((p) => (
            <Link
              key={p.slug}
              href={`/practitioners/${p.slug}`}
              className="group block rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              style={{ backgroundColor: "var(--color-stone-warm)" }}
            >
              <div className="h-48 relative overflow-hidden" style={{ backgroundColor: "var(--color-stone)" }}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: p.imageObjectPosition ?? "center 35%" }}
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h2 className="text-2xl font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
                      {p.name}
                    </h2>
                    <p className="text-sm" style={{ color: "var(--color-stone-deep)" }}>{p.specialty}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4 line-clamp-4" style={{ color: "var(--color-stone-deep)" }}>
                  {p.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: "var(--color-trumpet-light)", color: "var(--color-charcoal)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium group-hover:opacity-60 transition-opacity" style={{ color: "var(--color-charcoal)" }}>
                  View profile →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-14 px-6 text-center" style={{ backgroundColor: "var(--color-trumpet)" }}>
        <h2 className="text-2xl md:text-3xl font-light mb-4" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
          {practitioners.joinCta.headline}
        </h2>
        <p className="text-sm mb-6 max-w-md mx-auto" style={{ color: "var(--color-charcoal)" }}>
          {practitioners.joinCta.body}
        </p>
        <Link
          href="/contact?subject=Practitioner+Application"
          style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-cream)" }}
          className="inline-block px-8 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          {practitioners.joinCta.ctaLabel}
        </Link>
      </section>
    </div>
  );
}
