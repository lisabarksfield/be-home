import Link from "next/link";
import { content } from "@/lib/content";
import { GC, displayHeadingStyle } from "@/lib/girlsClubTheme";

const { girlsClub } = content;

export default function GirlsClubTestimonialsPage() {
  return (
    <div>
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto">
          <Link
            href="/the-girls-club"
            className="inline-block mb-8 text-sm font-medium hover:opacity-60 transition-opacity"
            style={{ color: "var(--color-charcoal)" }}
          >
            ← Back to The Girls Club
          </Link>
          <h1
            className="text-3xl md:text-4xl mb-10"
            style={displayHeadingStyle(GC.orangeDeep)}
          >
            {girlsClub.testimonials.headline}
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {girlsClub.testimonials.items.map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl p-6"
                style={{ backgroundColor: "var(--color-stone-warm)" }}
              >
                <blockquote className="space-y-3">
                  {t.quote.split("\n\n").map((para, j) => (
                    <p
                      key={j}
                      className="text-sm md:text-base italic leading-relaxed"
                      style={{ color: "var(--color-charcoal)" }}
                    >
                      {para}
                    </p>
                  ))}
                </blockquote>
                <figcaption
                  className="text-sm font-medium mt-4"
                  style={{ color: GC.orangeDeep }}
                >
                  {t.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
