import Link from "next/link";
import Image from "next/image";

const sidebarLinks = [
  { href: "/practitioner/dashboard", label: "Dashboard", icon: "◎" },
  { href: "/practitioner/classes", label: "My Classes", icon: "◇" },
  { href: "/practitioner/rentals", label: "Book Studio", icon: "◈" },
  { href: "/practitioner/treatment-room", label: "Book Treatment Room", icon: "◫" },
  { href: "/practitioner/calendar", label: "Calendar Sync", icon: "◉" },
  { href: "/practitioner/profile", label: "My Profile", icon: "◐" },
  { href: "/practitioner/payments", label: "Payments", icon: "◑" },
];

export default function PractitionerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--color-cream)" }}>
      {/* Sidebar */}
      <aside
        className="w-64 shrink-0 hidden md:flex flex-col py-8 px-6"
        style={{ backgroundColor: "var(--color-charcoal)" }}
      >
        <Link href="/" className="block mb-10">
          <Image
            src="/logo-white.svg"
            alt="Be Home"
            width={110}
            height={43}
            priority
          />
        </Link>
        <p className="text-xs tracking-widest uppercase mb-4" style={{ color: "var(--color-stone-deep)" }}>
          Practitioner
        </p>
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-stone-warm)" }}
            >
              <span style={{ color: "var(--color-trumpet)" }}>{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto">
          <Link
            href="/"
            className="text-xs hover:opacity-60 transition-opacity"
            style={{ color: "var(--color-stone-deep)" }}
          >
            ← Back to site
          </Link>
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
