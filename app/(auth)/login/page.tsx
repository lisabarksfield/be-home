"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Will call NextAuth signIn("resend", { email }) once configured
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="w-full max-w-md">
      <div
        className="rounded-2xl p-10"
        style={{ backgroundColor: "var(--color-stone-warm)" }}
      >
        <h1
          className="text-3xl font-light mb-2 text-center"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
        >
          Welcome back
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: "var(--color-stone-deep)" }}>
          Sign in to your Be Home account
        </p>

        {sent ? (
          <div className="text-center py-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-xl mx-auto mb-4"
              style={{ backgroundColor: "var(--color-trumpet)" }}
            >
              ✓
            </div>
            <p className="text-sm" style={{ color: "var(--color-charcoal)" }}>
              Check your email — we've sent a sign-in link to{" "}
              <strong>{email}</strong>
            </p>
          </div>
        ) : (
          <>
            {/* Google sign-in */}
            <button
              onClick={() => {/* signIn('google') */}}
              className="w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 mb-4"
              style={{ backgroundColor: "var(--color-cream)", color: "var(--color-charcoal)", border: "1px solid var(--color-stone)" }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-stone)" }} />
              <span className="text-xs" style={{ color: "var(--color-stone-deep)" }}>or</span>
              <div className="flex-1 h-px" style={{ backgroundColor: "var(--color-stone)" }} />
            </div>

            {/* Email magic link */}
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ backgroundColor: "var(--color-cream)", color: "var(--color-charcoal)" }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl text-sm font-medium disabled:opacity-50"
                style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
              >
                {loading ? "Sending..." : "Send sign-in link"}
              </button>
            </form>
          </>
        )}

        <p className="text-xs text-center mt-6" style={{ color: "var(--color-stone-deep)" }}>
          No account yet?{" "}
          <Link href="/register" className="underline" style={{ color: "var(--color-charcoal)" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
