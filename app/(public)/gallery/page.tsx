import Image from "next/image";

const images = [
  { src: "/studio/studio-1.jpg",             alt: "The Studio — yoga mats laid out",              section: "The Studio" },
  { src: "/studio/studio-2.jpg",             alt: "The Studio — sheer curtains and warm light",    section: "The Studio" },
  { src: "/studio/studio-3.jpg",             alt: "The Studio — full width view",                  section: "The Studio" },
  { src: "/treatment-room/treatment-1.jpg",  alt: "Treatment Room — massage table",                section: "Treatment Room" },
  { src: "/treatment-room/treatment-2.jpg",  alt: "Treatment Room — table with lamp and flowers",  section: "Treatment Room" },
  { src: "/treatment-room/treatment-3.jpg",  alt: "Treatment Room — armchair and lamp detail",     section: "Treatment Room" },
  { src: "/workshop/workshop-1.jpg",         alt: "The Workshop — dining table and sofas",         section: "The Workshop" },
  { src: "/workshop/workshop-2.jpg",         alt: "The Workshop — sofa and table",                 section: "The Workshop" },
  { src: "/workshop/workshop-3.jpg",         alt: "The Workshop — dining table with fireplace",    section: "The Workshop" },
];

export default function GalleryPage() {
  return (
    <div>
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
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

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-0">
        {images.map((img) => (
          <div key={img.src} className="relative break-inside-avoid">
            <Image
              src={img.src}
              alt={img.alt}
              width={1080}
              height={1080}
              className="w-full h-auto block"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
