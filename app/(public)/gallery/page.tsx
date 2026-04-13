"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

type GalleryImage = { src: string; alt: string };

const rooms: { label: string; images: GalleryImage[] }[] = [
  {
    label: "The Studio",
    images: [
      { src: "/studio/studio-1.jpg", alt: "The Studio — yoga mats laid out" },
      { src: "/studio/studio-2.jpg", alt: "The Studio — sheer curtains and warm light" },
      { src: "/studio/studio-3.jpg", alt: "The Studio — full width view" },
      { src: "/studio/studio-4.jpg", alt: "The Studio — entrance doors with curtains" },
      { src: "/studio/studio-5.jpg", alt: "The Studio — yoga mats at floor level" },
      { src: "/studio/studio-6.jpg", alt: "The Studio — practitioner meditating" },
      { src: "/studio/studio-7.jpg", alt: "The Studio — practitioner seated in full room" },
      { src: "/studio/studio-8.jpg", alt: "The Studio — Be Home cork mat detail" },
    ],
  },
  {
    label: "Treatment Room",
    images: [
      { src: "/treatment-room/treatment-1.jpg", alt: "Treatment Room — massage table" },
      { src: "/treatment-room/treatment-2.jpg", alt: "Treatment Room — table with lamp and flowers" },
      { src: "/treatment-room/treatment-3.jpg", alt: "Treatment Room — armchair and lamp detail" },
    ],
  },
  {
    label: "The Workshop",
    images: [
      { src: "/workshop/workshop-1.jpg", alt: "The Workshop — dining table and sofas" },
      { src: "/workshop/workshop-2.jpg", alt: "The Workshop — sofa and table" },
      { src: "/workshop/workshop-3.jpg", alt: "The Workshop — dining table with fireplace" },
      { src: "/workshop/workshop-4.jpg", alt: "The Workshop — curved sofa with studio beyond" },
      { src: "/workshop/workshop-5.jpg", alt: "The Workshop — craft workshop session" },
      { src: "/workshop/workshop-6.jpg", alt: "The Workshop — workshop in action" },
      { src: "/workshop/workshop-7.jpg", alt: "The Workshop — workshop host smiling" },
    ],
  },
  {
    label: "The Space",
    images: [
      { src: "/space/space-1.jpg", alt: "The Space — guest bathroom" },
    ],
  },
];

// Flat list for lightbox navigation
const allImages: GalleryImage[] = rooms.flatMap((r) => r.images);

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (src: string) => {
    const idx = allImages.findIndex((img) => img.src === src);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + allImages.length) % allImages.length));
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % allImages.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  return (
    <div style={{ backgroundColor: "var(--color-stone-warm)" }}>
      {/* Hero */}
      <section className="py-20 px-6 text-center">
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet)" }}>
          Be Home Cascais
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
          Our Spaces
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--color-stone-deep)" }}>
          A closer look at the studio, treatment room and workshop.
        </p>
      </section>

      {/* Sections by room */}
      {rooms.map((room) => (
        <section key={room.label} className="px-6 pb-16 max-w-7xl mx-auto">
          <h2 className="text-2xl font-light mb-6" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
            {room.label}
          </h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
            {room.images.map((img) => (
              <div
                key={img.src}
                className="relative break-inside-avoid mb-3 cursor-pointer overflow-hidden rounded-xl group"
                onClick={() => openLightbox(img.src)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={1080}
                  height={1080}
                  className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.92)" }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            className="absolute top-5 right-6 text-white text-3xl leading-none hover:opacity-60 transition-opacity"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ×
          </button>

          {/* Prev */}
          <button
            className="absolute left-4 md:left-8 text-white text-4xl leading-none hover:opacity-60 transition-opacity px-3 py-2"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            ‹
          </button>

          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[lightboxIndex].src}
              alt={allImages[lightboxIndex].alt}
              width={1800}
              height={1200}
              className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg"
            />
          </div>

          {/* Next */}
          <button
            className="absolute right-4 md:right-8 text-white text-4xl leading-none hover:opacity-60 transition-opacity px-3 py-2"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            ›
          </button>

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm" style={{ color: "rgba(255,255,255,0.5)" }}>
            {lightboxIndex + 1} / {allImages.length}
          </p>
        </div>
      )}
    </div>
  );
}
