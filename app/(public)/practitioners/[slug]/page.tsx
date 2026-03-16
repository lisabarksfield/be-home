import Link from "next/link";

export default function PractitionerProfilePage({ params }: { params: { slug: string } }) {
  const name = params.slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return (
    <div>
      <section
        className="py-20 px-6"
        style={{ backgroundColor: "var(--color-stone-warm)" }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            href="/practitioners"
            className="text-sm hover:opacity-60 transition-opacity mb-8 inline-block"
            style={{ color: "var(--color-stone-deep)" }}
          >
            ← All practitioners
          </Link>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center text-3xl font-light shrink-0"
              style={{ backgroundColor: "var(--color-stone)", color: "var(--color-cream)" }}
            >
              {name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <h1
                className="text-4xl md:text-6xl font-light mb-2"
                style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
              >
                {name}
              </h1>
              <p className="text-base mb-6" style={{ color: "var(--color-stone-deep)" }}>
                Yoga Teacher · Be Home Cascais
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {["Yoga", "Vinyasa", "Yin"].map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: "var(--color-trumpet-light)", color: "var(--color-charcoal)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p
                className="text-base leading-relaxed max-w-xl"
                style={{ color: "var(--color-stone-deep)" }}
              >
                A dedicated yoga teacher with over 10 years of experience, drawing on Hatha, Vinyasa,
                and Yin traditions. Her classes are warm, accessible, and deeply nourishing. She
                believes that yoga is for every body, at every stage of life.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2
              className="text-3xl font-light mb-6"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              Classes at Be Home
            </h2>
            <div className="space-y-3">
              {[
                { time: "Tuesday 09:00", title: "Morning Vinyasa Flow", price: "€17" },
                { time: "Thursday 19:00", title: "Yin Yoga", price: "€15" },
                { time: "Saturday 09:30", title: "Weekend Flow", price: "€18" },
              ].map((c) => (
                <div
                  key={c.time}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ backgroundColor: "var(--color-stone-warm)" }}
                >
                  <div>
                    <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>
                      {c.title}
                    </p>
                    <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>
                      {c.time}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                      {c.price}
                    </span>
                    <a
                      href="https://example.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
                      className="text-xs px-3 py-1.5 rounded-full font-medium hover:opacity-90 transition-opacity"
                    >
                      Book
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div
              className="p-5 rounded-xl sticky top-24"
              style={{ backgroundColor: "var(--color-stone-warm)" }}
            >
              <h3
                className="text-lg font-light mb-4"
                style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
              >
                Book a class
              </h3>
              <p className="text-sm mb-5" style={{ color: "var(--color-stone-deep)" }}>
                Book directly with {name.split(" ")[0]} via their booking page.
              </p>
              <a
                href="https://example.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
                className="block w-full text-center py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity mb-3"
              >
                Book with {name.split(" ")[0]}
              </a>
              <Link
                href="/contact"
                style={{ border: "1px solid var(--color-stone)", color: "var(--color-charcoal)" }}
                className="block w-full text-center py-2.5 rounded-full text-sm hover:opacity-60 transition-opacity"
              >
                Enquire
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
