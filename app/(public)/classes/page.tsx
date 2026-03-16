import Link from "next/link";
import { content } from "@/lib/content";

const { classes } = content;

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const types = ["All", "Yoga", "Pilates", "Meditation", "Dance", "Sound Healing"];

export default function ClassesPage() {
  return (
    <div>
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet)" }}>
          {classes.hero.tagline}
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
          {classes.hero.headline}
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-stone-deep)" }}>
          {classes.hero.body}
        </p>
      </section>

      <section className="py-16 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-10">
            {types.map((t, i) => (
              <span
                key={t}
                className="px-4 py-1.5 rounded-full text-sm cursor-pointer"
                style={
                  i === 0
                    ? { backgroundColor: "var(--color-charcoal)", color: "var(--color-cream)" }
                    : { backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }
                }
              >
                {t}
              </span>
            ))}
          </div>

          {days.map((day) => {
            const dayClasses = classes.schedule.filter((c) => c.day === day);
            if (!dayClasses.length) return null;
            return (
              <div key={day} className="mb-10">
                <h2
                  className="text-xl font-light mb-4 pb-2 border-b"
                  style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)", borderColor: "var(--color-stone)" }}
                >
                  {day}
                </h2>
                <div className="space-y-3">
                  {dayClasses.map((c) => (
                    <div
                      key={c.id}
                      className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-xl"
                      style={{ backgroundColor: "var(--color-stone-warm)" }}
                    >
                      <div className="flex items-center gap-6 flex-wrap">
                        <span className="text-sm font-mono w-12 shrink-0" style={{ color: "var(--color-stone-deep)" }}>
                          {c.time}
                        </span>
                        <div>
                          <p className="font-medium" style={{ color: "var(--color-charcoal)" }}>{c.title}</p>
                          <p className="text-sm" style={{ color: "var(--color-stone-deep)" }}>
                            {c.practitioner} · {c.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: "var(--color-trumpet-light)", color: "var(--color-charcoal)" }}
                        >
                          {c.type}
                        </span>
                        <span className="text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>{c.price}</span>
                        <span className="text-xs" style={{ color: "var(--color-stone-deep)" }}>{c.spots} spots</span>
                        <Link
                          href={c.bookingUrl}
                          target="_blank"
                          style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
                          className="text-sm px-4 py-1.5 rounded-full font-medium hover:opacity-90 transition-opacity"
                        >
                          Book
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <p className="text-sm mb-4" style={{ color: "var(--color-stone-deep)" }}>
          {classes.footer}
        </p>
        <Link
          href="/contact?subject=Practitioner+Enquiry"
          style={{ color: "var(--color-charcoal)" }}
          className="text-sm font-medium underline hover:opacity-60 transition-opacity"
        >
          {classes.footerCta}
        </Link>
      </section>
    </div>
  );
}
