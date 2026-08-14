import Image from "next/image";
import Link from "next/link";
import { Baloo_2 } from "next/font/google";
import { content } from "@/lib/content";

const { girlsClub } = content;

const rounded = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700"] });
const displayFont = "'Gulfs Display', sans-serif";

const GC = {
  cream: "#FFF7D3",
  pink: "#F16EC3",
  orange: "#FB9553",
  orangeDeep: "#F2793D",
  tan: "#E0A97F",
};

// Gulfs Display only ships a single (regular) weight — a slight text-stroke
// thickens the letterforms to better match the bolder logo/flyer artwork.
function displayHeadingStyle(color: string) {
  return { color, fontFamily: displayFont, WebkitTextStroke: `2px ${color}` };
}

const grainOverlay =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function GradientBand({ children }: { children: React.ReactNode }) {
  return (
    <section
      className="relative py-24 px-6 text-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at 12% 92%, ${GC.tan} 0%, transparent 50%), linear-gradient(135deg, ${GC.pink} 0%, ${GC.orange} 55%, ${GC.orangeDeep} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: grainOverlay, opacity: 0.18, mixBlendMode: "overlay" }}
      />
      <div className="relative">{children}</div>
    </section>
  );
}

export default function TheGirlsClubPage() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <GradientBand>
        <div className="max-w-2xl mx-auto">
          <Image
            src="/the-girls-club/logo.jpg"
            alt="The Girls Club"
            width={200}
            height={200}
            priority
            className="mx-auto mb-8 rounded-[2rem] shadow-lg"
          />
          <p
            className={`${rounded.className} text-sm uppercase tracking-[0.3em] mb-3`}
            style={{ color: GC.cream }}
          >
            {girlsClub.hero.tagline}
          </p>
          <h1
            className="text-5xl md:text-7xl mb-6"
            style={displayHeadingStyle(GC.cream)}
          >
            {girlsClub.hero.headline}
          </h1>
          <p
            className={`${rounded.className} text-xl md:text-2xl`}
            style={{ color: GC.cream }}
          >
            {girlsClub.hero.body}
          </p>
        </div>
      </GradientBand>

      {/* ── What is The Girls Club? ──────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-3xl md:text-4xl mb-8"
            style={displayHeadingStyle(GC.orangeDeep)}
          >
            {girlsClub.intro.headline}
          </h2>
          <div className="space-y-5">
            {girlsClub.intro.body.map((para, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's coming ─────────────────────────────── */}
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="max-w-2xl mx-auto">
          <p
            className={`${rounded.className} text-sm uppercase tracking-[0.3em] mb-3`}
            style={{ color: GC.pink }}
          >
            {girlsClub.whatsComing.subheadline}
          </p>
          <h2
            className="text-3xl md:text-4xl mb-8"
            style={displayHeadingStyle(GC.orangeDeep)}
          >
            {girlsClub.whatsComing.headline}
          </h2>
          <div className="space-y-5">
            {girlsClub.whatsComing.body.map((para, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── Have an idea? CTA ─────────────────────────── */}
      <GradientBand>
        <div className="max-w-xl mx-auto">
          <h2
            className="text-3xl md:text-5xl mb-6"
            style={displayHeadingStyle(GC.cream)}
          >
            {girlsClub.ideaCta.headline}
          </h2>
          <div className="space-y-4 mb-10">
            {girlsClub.ideaCta.body.split("\n\n").map((para, i) => (
              <p key={i} className="text-base leading-relaxed" style={{ color: GC.cream, opacity: 0.9 }}>
                {para}
              </p>
            ))}
          </div>
          <Link
            href="/contact?subject=The+Girls+Club"
            className={`${rounded.className} inline-block px-8 py-3.5 rounded-full font-medium tracking-wide hover:opacity-90 transition-opacity`}
            style={{ backgroundColor: GC.cream, color: GC.orangeDeep }}
          >
            {girlsClub.ideaCta.ctaLabel}
          </Link>
        </div>
      </GradientBand>
    </div>
  );
}
