"use client";

import { useState } from "react";
import type { EventEntry } from "@/lib/content";

const SHOW_MORE_THRESHOLD = 220;

function whatsappIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function EventCard({ event, dimmed = false }: { event: EventEntry; dimmed?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = event.description.split("\n\n");
  const isLong = event.description.length > SHOW_MORE_THRESHOLD;

  return (
    <div
      className={`rounded-2xl overflow-hidden flex flex-col ${dimmed ? "opacity-60" : ""}`}
      style={{ backgroundColor: "var(--color-stone-warm)" }}
    >
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <span
              className="inline-block text-xs px-2.5 py-1 rounded-full mb-2"
              style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
            >
              {event.type}
            </span>
            <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>
              {event.date}
            </p>
            {event.time && (
              <p className="text-xs mt-0.5" style={{ color: "var(--color-stone-deep)" }}>
                {"endTime" in event && event.endTime ? `${event.time}-${event.endTime}` : event.time}
              </p>
            )}
            <h3
              className="text-xl leading-snug line-clamp-2 min-h-[3.5rem] mt-2"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              {event.title}
            </h3>
            <p className="text-sm mt-1" style={{ color: "var(--color-stone-deep)" }}>
              with {event.practitioner}
            </p>
          </div>
          <p
            className="text-lg md:text-xl leading-tight whitespace-nowrap"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
          >
            {event.price}
          </p>
        </div>

        <div className={`space-y-2 mb-4 ${expanded ? "" : "line-clamp-4"}`}>
          {paragraphs.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: "var(--color-stone-deep)" }}>
              {para}
            </p>
          ))}
        </div>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-xs font-medium mb-4 -mt-2 text-left hover:opacity-60 transition-opacity"
            style={{ color: "var(--color-charcoal)" }}
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}

        <div className="flex flex-wrap gap-3 mt-auto">
          {"whatsappUrl" in event && event.whatsappUrl && (
            <a
              href={event.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ backgroundColor: "#25D366", color: "#fff" }}
            >
              {whatsappIcon()}
              Book via WhatsApp
            </a>
          )}
          {"bookingUrl" in event && event.bookingUrl && (
            <a
              href={event.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium hover:opacity-70 transition-opacity"
              style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
            >
              {"bookingLabel" in event && event.bookingLabel ? event.bookingLabel : "Book now →"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
