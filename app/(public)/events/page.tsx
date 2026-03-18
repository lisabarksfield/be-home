"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { content } from "@/lib/content";

const { events } = content;

type RentalRecord = {
  id: string;
  spaceId: string;
  spaceName: string;
  practitionerName: string;
  whatsappNumber: string;
  eventTitle: string;
  startTime: string;
  endTime: string;
  spotsAvailable: number;
  cateringRequired: boolean;
  status: string;
};

const SPACE_FILTERS = [
  { label: "All",            value: "" },
  { label: "Studio",         value: "studio" },
  { label: "Treatment Room", value: "treatment-room" },
];

function buildWhatsAppLink(
  whatsappNumber: string,
  eventTitle: string,
  startTime: string
): string {
  const date = format(parseISO(startTime), "d MMMM yyyy");
  const time = format(parseISO(startTime), "HH:mm");
  const text = `Hi, I would like to reserve my place at ${eventTitle} on ${date} at ${time}.`;
  return `https://wa.me/${whatsappNumber.replace(/^\+/, "")}?text=${encodeURIComponent(text)}`;
}

export default function EventsPage() {
  const [rentals, setRentals] = useState<RentalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [spaceFilter, setSpaceFilter] = useState("");

  useEffect(() => {
    fetch(`/api/rentals?from=${new Date().toISOString()}`)
      .then((r) => r.json())
      .then((data: RentalRecord[]) => setRentals(data))
      .catch(() => setRentals([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = spaceFilter
    ? rentals.filter((r) => r.spaceId === spaceFilter)
    : rentals;

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────── */}
      <section
        className="py-20 px-6 text-center"
        style={{ backgroundColor: "var(--color-stone-warm)" }}
      >
        <p
          className="text-xs tracking-[0.3em] uppercase mb-4"
          style={{ color: "var(--color-trumpet-deep)" }}
        >
          {events.hero.tagline}
        </p>
        <h1
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}
        >
          {events.hero.headline}
        </h1>
        <p
          className="text-base max-w-xl mx-auto"
          style={{ color: "var(--color-stone-deep)" }}
        >
          {events.hero.body}
        </p>
      </section>

      <div style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-4xl mx-auto px-6 py-14">

          {/* ── Upcoming Bookings ──────────────────────── */}
          <section className="mb-16">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h2
                className="text-2xl font-light"
                style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
              >
                Upcoming sessions
              </h2>

              {/* Space filter */}
              <div className="flex items-center gap-2">
                {SPACE_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setSpaceFilter(f.value)}
                    className="px-3.5 py-1.5 rounded-full text-xs transition-colors"
                    style={{
                      backgroundColor:
                        spaceFilter === f.value
                          ? "var(--color-trumpet)"
                          : "var(--color-stone-warm)",
                      color: "var(--color-charcoal)",
                      border:
                        spaceFilter === f.value
                          ? "1px solid var(--color-trumpet-deep)"
                          : "1px solid var(--color-stone)",
                    }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {loading && (
              <p className="text-sm" style={{ color: "var(--color-stone-deep)" }}>
                Loading upcoming sessions…
              </p>
            )}

            {!loading && filtered.length === 0 && (
              <div
                className="py-12 text-center rounded-2xl"
                style={{ backgroundColor: "var(--color-stone-warm)" }}
              >
                <p
                  className="text-lg font-light"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
                >
                  No upcoming sessions scheduled.
                </p>
                <p className="text-sm mt-2" style={{ color: "var(--color-stone-deep)" }}>
                  Check back soon — or see the special events below.
                </p>
              </div>
            )}

            {!loading && filtered.length > 0 && (
              <div className="space-y-4">
                {filtered.map((rental) => {
                  const isTreatmentRoom = rental.spaceId === "treatment-room";
                  const start = parseISO(rental.startTime);
                  const end = parseISO(rental.endTime);
                  const waLink = rental.whatsappNumber
                    ? buildWhatsAppLink(
                        rental.whatsappNumber,
                        rental.eventTitle,
                        rental.startTime
                      )
                    : null;

                  return (
                    <div
                      key={rental.id}
                      className="rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      style={{ backgroundColor: "var(--color-stone-warm)" }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: isTreatmentRoom
                                ? "var(--color-stone)"
                                : "var(--color-trumpet)",
                              color: "var(--color-charcoal)",
                            }}
                          >
                            {rental.spaceName}
                          </span>
                        </div>
                        <h3
                          className="text-xl font-light mb-0.5"
                          style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
                        >
                          {rental.eventTitle}
                        </h3>
                        <p className="text-sm mb-2" style={{ color: "var(--color-stone-deep)" }}>
                          with {rental.practitionerName}
                        </p>
                        <p className="text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                          {format(start, "EEEE d MMMM")} · {format(start, "HH:mm")}–{format(end, "HH:mm")}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "var(--color-stone-deep)" }}>
                          {isTreatmentRoom
                            ? "1-on-1 session"
                            : `${rental.spotsAvailable} spot${rental.spotsAvailable !== 1 ? "s" : ""} available`}
                        </p>
                      </div>

                      {waLink ? (
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 px-6 py-2.5 rounded-full text-sm font-medium text-center hover:opacity-90 transition-opacity"
                          style={{
                            backgroundColor: "var(--color-trumpet)",
                            color: "var(--color-charcoal)",
                          }}
                        >
                          Book Now
                        </a>
                      ) : (
                        <span
                          className="shrink-0 px-6 py-2.5 rounded-full text-sm text-center"
                          style={{
                            backgroundColor: "var(--color-stone)",
                            color: "var(--color-stone-deep)",
                          }}
                        >
                          Contact practitioner
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* ── Divider ───────────────────────────────── */}
          <div
            className="mb-12"
            style={{ borderTop: "1px solid var(--color-stone)" }}
          />

          {/* ── Curated / Special Events ──────────────── */}
          <section className="mb-16">
            <h2
              className="text-2xl font-light mb-6"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              Special events &amp; retreats
            </h2>

            <div className="space-y-6">
              {events.list.map((e) => (
                <div
                  key={e.id}
                  className="rounded-2xl overflow-hidden"
                  style={{ backgroundColor: "var(--color-stone-warm)" }}
                >
                  <div className="p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className="text-xs px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: "var(--color-trumpet)",
                              color: "var(--color-charcoal)",
                            }}
                          >
                            {e.type}
                          </span>
                          <span className="text-sm" style={{ color: "var(--color-stone-deep)" }}>
                            {e.date} · {e.time}
                          </span>
                        </div>
                        <h3
                          className="text-2xl md:text-3xl font-light"
                          style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
                        >
                          {e.title}
                        </h3>
                        <p className="text-sm mt-1" style={{ color: "var(--color-stone-deep)" }}>
                          with {e.practitioner}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className="text-3xl font-light"
                          style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
                        >
                          {e.price}
                        </p>
                      </div>
                    </div>
                    <p
                      className="text-sm leading-relaxed mb-6"
                      style={{ color: "var(--color-stone-deep)" }}
                    >
                      {e.description}
                    </p>
                    {"whatsappUrl" in e && e.whatsappUrl && (
                      <a
                        href={e.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
                        style={{ backgroundColor: "#25D366", color: "#fff" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Book via WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Host CTA ──────────────────────────────── */}
          <div className="text-center">
            <h3
              className="text-2xl font-light mb-3"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              {events.hostCta.headline}
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--color-stone-deep)" }}>
              {events.hostCta.body}
            </p>
            <Link
              href="/contact?subject=Event+Enquiry"
              className="inline-block px-8 py-3 rounded-full text-sm font-medium hover:opacity-60 transition-opacity"
              style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
            >
              {events.hostCta.ctaLabel}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
