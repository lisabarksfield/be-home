import Link from "next/link";
import Image from "next/image";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "◎" },
  { href: "/admin/content", label: "Site Content", icon: "✏" },
  { href: "/admin/practitioners", label: "Practitioners", icon: "◇" },
  { href: "/admin/rentals", label: "Rentals", icon: "◈" },
  { href: "/admin/spaces", label: "Spaces", icon: "◉" },
  { href: "/admin/catering", label: "Catering", icon: "◐" },
  { href: "/admin/users", label: "Users", icon: "◑" },
  { href: "/admin/contact", label: "Contact Forms", icon: "◌" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "var(--color-cream)" }}>
      <aside
        className="w-64 shrink-0 hidden md:flex flex-col py-8 px-6"
        style={{ backgroundColor: "#1a1714" }}
      >
        <Link href="/" className="block mb-1">
          <Image src="/logo-white.svg" alt="Be Home" width={110} height={43} priority />
        </Link>
        <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "var(--color-trumpet)" }}>
          Admin
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
          <Link href="/" className="text-xs hover:opacity-60 transition-opacity" style={{ color: "var(--color-stone-deep)" }}>
            ← Back to site
          </Link>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
