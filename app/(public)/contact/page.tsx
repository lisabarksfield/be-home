"use client";

import { useState } from "react";
import { content } from "@/lib/content";

const { contact } = content;

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      alert(`Something went wrong. Please email us directly at ${contact.email}`);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="text-center max-w-md">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-6"
            style={{ backgroundColor: "var(--color-trumpet)" }}
          >
            ✓
          </div>
          <h2 className="text-3xl font-light mb-4" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
            Thank you, {form.name}
          </h2>
          <p className="text-base" style={{ color: "var(--color-stone-deep)" }}>
            We've received your message and will be in touch soon. For urgent enquiries, email us at{" "}
            <a href={`mailto:${contact.email}`} className="underline" style={{ color: "var(--color-charcoal)" }}>
              {contact.email}
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet)" }}>
              {contact.hero.tagline}
            </p>
            <h1 className="text-5xl font-bold mb-6" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
              {contact.hero.headline}
            </h1>
            <p className="text-base leading-relaxed mb-10" style={{ color: "var(--color-stone-deep)" }}>
              {contact.hero.body}
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--color-stone-deep)" }}>Email</p>
                <a href={`mailto:${contact.email}`} className="text-base hover:opacity-60 transition-opacity" style={{ color: "var(--color-charcoal)" }}>
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--color-stone-deep)" }}>Location</p>
                <p className="text-base" style={{ color: "var(--color-charcoal)" }}>{contact.location}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--color-stone-deep)" }}>Instagram</p>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base hover:opacity-60 transition-opacity"
                  style={{ color: "var(--color-charcoal)" }}
                >
                  {contact.instagram}
                </a>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            style={{ backgroundColor: "var(--color-cream)", borderRadius: "1rem", padding: "2rem" }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
                  Name *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
                  Phone
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                  style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
                  placeholder="+351 ..."
                />
              </div>
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
                Email *
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
                Subject
              </label>
              <select
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
              >
                <option value="">Select a subject...</option>
                {contact.subjects.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
                Message *
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
                style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
                placeholder="Tell us what you're looking for..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
              className="w-full py-3 rounded-full font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send message"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
