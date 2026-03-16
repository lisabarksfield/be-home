"use client";

import { useState } from "react";

export default function PractitionerProfilePage() {
  const [form, setForm] = useState({
    name: "Sofia Mendes",
    specialty: "Yoga",
    bio: "Sofia has been teaching yoga for over 10 years...",
    websiteUrl: "",
    instagramUrl: "",
    phone: "",
    whatsappNumber: "",
  });
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <h1
        className="text-3xl font-light mb-8"
        style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
      >
        My Profile
      </h1>

      <div className="max-w-xl">
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-medium"
            style={{ backgroundColor: "var(--color-stone)", color: "var(--color-cream)" }}
          >
            SM
          </div>
          <div>
            <button
              className="text-sm underline hover:opacity-60 transition-opacity"
              style={{ color: "var(--color-charcoal)" }}
            >
              Upload photo
            </button>
            <p className="text-xs mt-1" style={{ color: "var(--color-stone-deep)" }}>
              JPG, PNG up to 5MB
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
              Full name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
              Specialty / Modality
            </label>
            <input
              value={form.specialty}
              onChange={(e) => setForm({ ...form, specialty: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
              placeholder="e.g. Yoga, Massage, Pilates"
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
              Bio
            </label>
            <textarea
              rows={5}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none resize-none"
              style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
            />
          </div>
          <div>
            <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
              WhatsApp number <span style={{ color: "var(--color-charcoal)" }}>*</span>
            </label>
            <input
              required
              type="tel"
              value={form.whatsappNumber}
              onChange={(e) => setForm({ ...form, whatsappNumber: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
              style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
              placeholder="+351912345678"
              pattern="^\+[1-9]\d{6,14}$"
            />
            <p className="text-xs mt-1.5" style={{ color: "var(--color-stone-deep)" }}>
              Required — customers will use this to book your events. Use E.164 format, e.g. +351912345678
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
                Website
              </label>
              <input
                value={form.websiteUrl}
                onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-xs tracking-widest uppercase block mb-1.5" style={{ color: "var(--color-stone-deep)" }}>
                Instagram
              </label>
              <input
                value={form.instagramUrl}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg text-sm outline-none"
                style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
                placeholder="@handle"
              />
            </div>
          </div>
          <button
            type="submit"
            style={{
              backgroundColor: saved ? "var(--color-sage)" : "var(--color-trumpet)",
              color: "var(--color-charcoal)",
            }}
            className="px-8 py-2.5 rounded-full text-sm font-medium transition-colors"
          >
            {saved ? "Saved ✓" : "Save profile"}
          </button>
        </form>
      </div>
    </div>
  );
}
