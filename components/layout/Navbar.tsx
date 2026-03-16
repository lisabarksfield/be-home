"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

type NavItem = { href: string; label: string; sub: string };
type NavGroup =
  | { id: string; label: string; items: NavItem[]; href?: never }
  | { id: string; label: string; href: string; items?: never };

const navGroups: NavGroup[] = [
  {
    id: "spaces",
    label: "Spaces",
    items: [
      { href: "/studio",         label: "The Studio",         sub: "Classes, workshops & group sessions" },
      { href: "/treatment-room", label: "Treatment Room",     sub: "Private 1-on-1 treatments" },
      { href: "/catering",       label: "Catering & Drinks",  sub: "Organic packages for your session" },
    ],
  },
  {
    id: "schedule",
    label: "Classes & Events",
    items: [
      { href: "/classes", label: "Weekly Classes",      sub: "Regular schedule with all practitioners" },
      { href: "/events",  label: "Events & Workshops",  sub: "Retreats, upcoming sessions & book your spot" },
    ],
  },
  {
    id: "practitioners",
    label: "Practitioners",
    href: "/practitioners",
  },
  {
    id: "about",
    label: "About",
    items: [
      { href: "/about",    label: "Our Story", sub: "About Be Home Cascais" },
      { href: "/contact",  label: "Contact",   sub: "Get in touch with us" },
    ],
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openGroup(id: string) {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setHoveredGroup(id);
  }

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setHoveredGroup(null), 120);
  }

  function toggleMobileGroup(id: string) {
    setMobileExpanded((prev) => (prev === id ? null : id));
  }

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        backgroundColor: "var(--color-cream)",
        borderBottom: "1px solid var(--color-stone)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.svg"
            alt="Be Home"
            width={160}
            height={63}
            priority
          />
        </Link>

        {/* ── Desktop Nav ───────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-1 relative">
          {navGroups.map((group) =>
            group.href ? (
              // Direct link — no dropdown
              <Link
                key={group.id}
                href={group.href}
                className="px-4 py-2 text-sm tracking-wide rounded-lg hover:opacity-60 transition-opacity"
                style={{ color: "var(--color-charcoal)" }}
              >
                {group.label}
              </Link>
            ) : (
              // Group with dropdown
              <div
                key={group.id}
                className="relative"
                onMouseEnter={() => openGroup(group.id)}
                onMouseLeave={scheduleClose}
              >
                <button
                  className="flex items-center gap-1 px-4 py-2 text-sm tracking-wide rounded-lg hover:opacity-60 transition-opacity"
                  style={{ color: "var(--color-charcoal)" }}
                  aria-expanded={hoveredGroup === group.id}
                >
                  {group.label}
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className="transition-transform"
                    style={{
                      transform:
                        hoveredGroup === group.id ? "rotate(180deg)" : "none",
                      color: "var(--color-stone-deep)",
                    }}
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {/* Dropdown panel */}
                {hoveredGroup === group.id && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-2xl shadow-lg py-3 min-w-[220px]"
                    style={{
                      backgroundColor: "var(--color-cream)",
                      border: "1px solid var(--color-stone)",
                    }}
                    onMouseEnter={() => openGroup(group.id)}
                    onMouseLeave={scheduleClose}
                  >
                    {group.items!.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex flex-col px-5 py-3 hover:opacity-60 transition-opacity"
                        onClick={() => setHoveredGroup(null)}
                      >
                        <span
                          className="text-sm font-medium"
                          style={{ color: "var(--color-charcoal)" }}
                        >
                          {item.label}
                        </span>
                        <span
                          className="text-xs mt-0.5"
                          style={{ color: "var(--color-stone-deep)" }}
                        >
                          {item.sub}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </nav>

        {/* ── Desktop CTAs ──────────────────────────── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Link
            href="/login"
            className="text-sm tracking-wide hover:opacity-60 transition-opacity"
            style={{ color: "var(--color-charcoal)" }}
          >
            Sign In
          </Link>
          <Link
            href="/studio"
            className="px-5 py-2 text-sm font-medium rounded-full hover:opacity-90 transition-opacity"
            style={{
              backgroundColor: "var(--color-trumpet)",
              color: "var(--color-charcoal)",
            }}
          >
            Hire a Space
          </Link>
        </div>

        {/* ── Mobile burger ─────────────────────────── */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-1"
          onClick={() => {
            setMobileOpen((o) => !o);
            setMobileExpanded(null);
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-6 h-0.5 transition-all ${
                mobileOpen
                  ? i === 0
                    ? "rotate-45 translate-y-2"
                    : i === 1
                    ? "opacity-0"
                    : "-rotate-45 -translate-y-2"
                  : ""
              }`}
              style={{ backgroundColor: "var(--color-charcoal)" }}
            />
          ))}
        </button>
      </div>

      {/* ── Mobile menu ───────────────────────────────── */}
      {mobileOpen && (
        <div
          className="lg:hidden px-6 pb-6 flex flex-col gap-1"
          style={{
            backgroundColor: "var(--color-cream)",
            borderTop: "1px solid var(--color-stone)",
          }}
        >
          {navGroups.map((group) =>
            group.href ? (
              <Link
                key={group.id}
                href={group.href}
                className="py-3 text-base tracking-wide"
                style={{ color: "var(--color-charcoal)" }}
                onClick={() => setMobileOpen(false)}
              >
                {group.label}
              </Link>
            ) : (
              <div key={group.id}>
                <button
                  className="w-full flex items-center justify-between py-3 text-base tracking-wide"
                  style={{ color: "var(--color-charcoal)" }}
                  onClick={() => toggleMobileGroup(group.id)}
                >
                  {group.label}
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className="transition-transform"
                    style={{
                      transform:
                        mobileExpanded === group.id
                          ? "rotate(180deg)"
                          : "none",
                      color: "var(--color-stone-deep)",
                    }}
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {mobileExpanded === group.id && (
                  <div className="pb-2 pl-3 flex flex-col gap-0.5">
                    {group.items!.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="py-2"
                        style={{ color: "var(--color-stone-deep)" }}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )
          )}

          <div
            className="flex flex-col gap-3 pt-4 mt-2"
            style={{ borderTop: "1px solid var(--color-stone)" }}
          >
            <Link
              href="/login"
              className="text-sm"
              style={{ color: "var(--color-charcoal)" }}
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/studio"
              className="px-5 py-2.5 text-sm font-medium rounded-full text-center"
              style={{
                backgroundColor: "var(--color-trumpet)",
                color: "var(--color-charcoal)",
              }}
              onClick={() => setMobileOpen(false)}
            >
              Hire a Space
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
