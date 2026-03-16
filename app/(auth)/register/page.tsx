"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", role: "CUSTOMER", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Will integrate with NextAuth + Prisma once configured
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="w-full max-w-md text-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-xl mx-auto mb-4"
          style={{ backgroundColor: "var(--color-trumpet)" }}
        >
          ✓
        </div>
        <h2
          className="text-2xl font-light mb-3"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
        >
          Check your email
        </h2>
        <p className="text-sm" style={{ color: "var(--color-stone-deep)" }}>
          We've sent a sign-in link to <strong>{form.email}</strong>. Click it to complete registration.
        </p>
      </div>
    );
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
          Join Be Home
        </h1>
        <p className="text-sm text-center mb-8" style={{ color: "var(--color-stone-deep)" }}>
          Create your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
              Full name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{ backgroundColor: "var(--color-cream)", color: "var(--color-charcoal)" }}
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
              Email
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{ backgroundColor: "var(--color-cream)", color: "var(--color-charcoal)" }}
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
              I am a...
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "CUSTOMER", label: "Client / Student" },
                { value: "PRACTITIONER", label: "Practitioner" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setForm({ ...form, role: opt.value })}
                  className="py-2.5 rounded-lg text-sm font-medium transition-all"
                  style={
                    form.role === opt.value
                      ? { backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }
                      : { backgroundColor: "var(--color-cream)", color: "var(--color-charcoal)", border: "1px solid var(--color-stone)" }
                  }
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {form.role === "PRACTITIONER" && (
              <p className="text-xs mt-2" style={{ color: "var(--color-stone-deep)" }}>
                Practitioner accounts require admin approval before your profile goes live.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-medium"
            style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
          >
            Create account
          </button>
        </form>

        <p className="text-xs text-center mt-6" style={{ color: "var(--color-stone-deep)" }}>
          Already have an account?{" "}
          <Link href="/login" className="underline" style={{ color: "var(--color-charcoal)" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
