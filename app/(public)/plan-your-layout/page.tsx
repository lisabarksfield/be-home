import Link from "next/link";
import { content } from "@/lib/content";
import { RoomPlanner } from "@/components/ui/RoomPlanner";

const { planYourLayout } = content;

type Room = "studio" | "workshop" | "treatment";
const rooms: Room[] = ["studio", "workshop", "treatment"];

export default async function PlanYourLayoutPage({
  searchParams,
}: {
  searchParams: Promise<{ room?: string }>;
}) {
  const { room } = await searchParams;
  const selectedRoom = rooms.includes(room as Room) ? (room as Room) : undefined;

  return (
    <div>
      <section className="py-28 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet)", textShadow: "0 1px 3px rgba(0,0,0,0.2)" }}>
          {planYourLayout.hero.tagline}
        </p>
        <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
          {planYourLayout.hero.headline}
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--color-stone-deep)" }}>
          {planYourLayout.hero.body}
        </p>
      </section>

      <section className="py-20 px-6" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-stone)" }}>
            <RoomPlanner room={selectedRoom} />
          </div>
        </div>
      </section>

      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-trumpet)" }}>
        <h2 className="text-3xl md:text-4xl font-light mb-6" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
          Ready to book a space?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/studio"
            style={{ backgroundColor: "var(--color-charcoal)", color: "var(--color-cream)" }}
            className="px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            See The Studio
          </Link>
          <Link
            href="/workshop"
            style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
            className="px-8 py-3.5 rounded-full font-medium hover:opacity-60 transition-opacity"
          >
            See The Workshop
          </Link>
          <Link
            href="/treatment-room"
            style={{ border: "1.5px solid var(--color-charcoal)", color: "var(--color-charcoal)" }}
            className="px-8 py-3.5 rounded-full font-medium hover:opacity-60 transition-opacity"
          >
            See Treatment Room
          </Link>
        </div>
      </section>
    </div>
  );
}
