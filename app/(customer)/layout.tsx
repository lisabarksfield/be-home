import Link from "next/link";
import Image from "next/image";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor: "var(--color-stone)" }}>
        <Link href="/">
          <Image src="/logo.svg" alt="Be Home" width={100} height={39} priority />
        </Link>
        <nav className="flex gap-6">
          {[
            { href: "/my/dashboard", label: "Bookings" },
            { href: "/my/profile", label: "Profile" },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="text-sm hover:opacity-60 transition-opacity" style={{ color: "var(--color-charcoal)" }}>
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-10">{children}</div>
    </div>
  );
}
