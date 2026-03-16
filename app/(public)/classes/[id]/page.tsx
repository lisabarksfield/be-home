import Link from "next/link";

export default function ClassDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <section
        className="py-20 px-6"
        style={{ backgroundColor: "var(--color-stone-warm)" }}
      >
        <div className="max-w-3xl mx-auto">
          <Link
            href="/classes"
            className="text-sm hover:opacity-60 transition-opacity mb-8 inline-block"
            style={{ color: "var(--color-stone-deep)" }}
          >
            ← Back to schedule
          </Link>
          <span
            className="text-xs px-3 py-1 rounded-full inline-block mb-4"
            style={{ backgroundColor: "var(--color-trumpet-light)", color: "var(--color-charcoal)" }}
          >
            Yoga
          </span>
          <h1
            className="text-4xl md:text-6xl font-light mb-4"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
          >
            Morning Vinyasa Flow
          </h1>
          <p className="text-base mb-2" style={{ color: "var(--color-stone-deep)" }}>
            Tuesday 09:00 · 75 minutes · The Studio, Be Home Cascais
          </p>
          <p className="text-2xl font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
            €17 per class
          </p>
        </div>
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            <h2
              className="text-2xl font-light mb-4"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              About this class
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-stone-deep)" }}>
              Start your Tuesday with an energising Vinyasa flow. Suitable for all levels, this class
              weaves breath with movement to build strength, flexibility, and presence. Expect a
              dynamic sequence followed by a grounding savasana.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone-deep)" }}>
              Mats and blocks are provided. Please arrive 5 minutes early. Wear comfortable clothing.
            </p>
          </div>
          <div>
            <div
              className="p-5 rounded-xl"
              style={{ backgroundColor: "var(--color-stone-warm)" }}
            >
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--color-stone-deep)" }}>
                With
              </p>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium"
                  style={{ backgroundColor: "var(--color-stone)", color: "var(--color-charcoal)" }}
                >
                  SM
                </div>
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>Sofia Mendes</p>
                  <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>Yoga Teacher</p>
                </div>
              </div>
              <Link
                href="/practitioners/sofia-mendes"
                className="text-xs underline hover:opacity-60 transition-opacity"
                style={{ color: "var(--color-charcoal)" }}
              >
                View profile
              </Link>
              <div className="mt-6 pt-4 border-t" style={{ borderColor: "var(--color-stone)" }}>
                <p className="text-xs mb-3" style={{ color: "var(--color-stone-deep)" }}>4 spots remaining</p>
                <a
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
                  className="block w-full text-center py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Book with Sofia
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
