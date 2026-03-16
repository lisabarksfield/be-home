import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-stone-warm)" }}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <Image
            src="/logo-white.svg"
            alt="Be Home"
            width={100}
            height={39}
            className="mb-3"
          />
          <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-stone-deep)" }}>
            Cascais, Portugal
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-stone)" }}>
            A warm community and wellness space where practitioners and people come together.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-trumpet)" }}
          >
            Explore
          </h4>
          <ul className="space-y-2">
            {[
              { href: "/studio", label: "The Studio" },
              { href: "/treatment-room", label: "Treatment Room" },
              { href: "/classes", label: "Classes" },
              { href: "/treatments", label: "Treatments" },
              { href: "/events", label: "Events" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm hover:opacity-60 transition-opacity"
                  style={{ color: "var(--color-stone-warm)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-trumpet)" }}
          >
            Community
          </h4>
          <ul className="space-y-2">
            {[
              { href: "/practitioners", label: "Our Practitioners" },
              { href: "/catering", label: "Catering & Drinks" },
              { href: "/about", label: "About Be Home" },
              { href: "/contact", label: "Get in Touch" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm hover:opacity-60 transition-opacity"
                  style={{ color: "var(--color-stone-warm)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "var(--color-trumpet)" }}
          >
            Find Us
          </h4>
          <address className="not-italic text-sm leading-relaxed space-y-2" style={{ color: "var(--color-stone)" }}>
            <p>Cascais, Portugal</p>
            <a
              href="mailto:hello@behomecascais.com"
              className="block hover:opacity-60 transition-opacity"
              style={{ color: "var(--color-stone-warm)" }}
            >
              hello@behomecascais.com
            </a>
            <div className="flex gap-4 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-wide uppercase hover:opacity-60 transition-opacity"
                style={{ color: "var(--color-trumpet)" }}
              >
                Instagram
              </a>
            </div>
          </address>
        </div>
      </div>

      <div
        className="border-t px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2"
        style={{ borderColor: "#3d3633" }}
      >
        <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>
          © {new Date().getFullYear()} Be Home, Cascais. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/contact" className="text-xs hover:opacity-60 transition-opacity" style={{ color: "var(--color-stone-deep)" }}>
            Privacy Policy
          </Link>
          <Link href="/contact" className="text-xs hover:opacity-60 transition-opacity" style={{ color: "var(--color-stone-deep)" }}>
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
