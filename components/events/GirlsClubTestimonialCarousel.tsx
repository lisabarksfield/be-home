"use client";

import { useEffect, useState } from "react";
import { Baloo_2 } from "next/font/google";
import { GC, displayHeadingStyle } from "@/lib/girlsClubTheme";

const rounded = Baloo_2({ subsets: ["latin"], weight: ["500", "600", "700"] });

const DISPLAY_MS = 7000;

type Testimonial = { quote: string; name: string };

export function GirlsClubTestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, DISPLAY_MS);
    return () => clearInterval(timer);
  }, [items.length]);

  const current = items[index];

  return (
    <div className="max-w-2xl mx-auto">
      <figure
        key={index}
        className="rounded-2xl p-8 md:p-10 animate-[fadein_0.4s_ease]"
        style={{ backgroundColor: "var(--color-cream)" }}
      >
        <blockquote className="space-y-3">
          {current.quote.split("\n\n").map((para, j) => (
            <p
              key={j}
              className="text-base md:text-lg italic leading-relaxed"
              style={{ color: "var(--color-charcoal)" }}
            >
              {para}
            </p>
          ))}
        </blockquote>
        <figcaption
          className={`${rounded.className} text-sm font-medium mt-4`}
          style={{ color: GC.orangeDeep }}
        >
          {current.name}
        </figcaption>
      </figure>

      {items.length > 1 && (
        <div className="flex items-center justify-center gap-5 mt-6">
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className="w-2.5 h-2.5 rounded-full transition-opacity"
                style={{
                  backgroundColor: GC.orangeDeep,
                  opacity: i === index ? 1 : 0.3,
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % items.length)}
            aria-label="Next testimonial"
            className={`${rounded.className} inline-flex items-center gap-1 text-sm font-medium hover:opacity-60 transition-opacity`}
            style={{ color: GC.orangeDeep }}
          >
            Next →
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
