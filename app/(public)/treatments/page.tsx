import Link from "next/link";
import { content } from "@/lib/content";
import { PricingDisclaimer } from "@/components/ui/PricingDisclaimer";

const { treatments } = content;

export default function TreatmentsPage() {
  return (
    <div>
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet)" }}>
          {treatments.hero.tagline}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
          {treatments.hero.headline}
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-stone-deep)" }}>
          {treatments.hero.body}
        </p>
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-5xl mx-auto space-y-12">
          {treatments.list.map((t) => (
            <div key={t.practitioner} className="pb-4">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-medium"
                  style={{ backgroundColor: "var(--color-stone)", color: "var(--color-cream)" }}
                >
                  {t.practitioner.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h2 className="text-2xl font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
                    {t.practitioner}
                  </h2>
                  <p className="text-sm" style={{ color: "var(--color-stone-deep)" }}>{t.specialty}</p>
                </div>
                <Link
                  href={`/practitioners/${t.slug}`}
                  className="ml-auto text-sm underline hover:opacity-60 transition-opacity"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  View profile
                </Link>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-stone-deep)" }}>
                {t.bio}
              </p>
              <div className="space-y-3">
                {t.treatments.map((tr) => (
                  <div
                    key={tr.name}
                    className="flex items-center justify-between p-5 rounded-xl"
                    style={{ backgroundColor: "var(--color-stone-warm)" }}
                  >
                    <div>
                      <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>{tr.name}</p>
                      <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>{tr.duration}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
                        {tr.price}*
                      </span>
                      <a
                        href="https://example.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
                        className="text-xs px-4 py-2 rounded-full font-medium hover:opacity-90 transition-opacity"
                      >
                        Book
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <PricingDisclaimer />
        </div>
      </section>
    </div>
  );
}
