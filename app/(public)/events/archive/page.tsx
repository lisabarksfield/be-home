import Link from "next/link";
import { content } from "@/lib/content";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  format,
  isSameMonth,
  parse,
} from "date-fns";

export const dynamic = 'force-dynamic';

const { events } = content;
const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default async function EventsArchivePage({
  searchParams,
}: {
  searchParams: Promise<{ month?: string }>;
}) {
  const { month } = await searchParams;
  const today = new Date().toISOString().slice(0, 10);
  const past = events.list.filter((e) => e.isoDate < today);

  const defaultMonthStr = past.length > 0 ? past[past.length - 1].isoDate.slice(0, 7) : today.slice(0, 7);
  const monthStr = month && /^\d{4}-\d{2}$/.test(month) ? month : defaultMonthStr;
  const current = parse(`${monthStr}-01`, "yyyy-MM-dd", new Date());

  const monthStart = startOfMonth(current);
  const monthEnd = endOfMonth(current);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const eventsByDate = new Map<string, typeof past>();
  for (const e of past) {
    const list = eventsByDate.get(e.isoDate) ?? [];
    list.push(e);
    eventsByDate.set(e.isoDate, list);
  }

  const prevMonthStr = format(subMonths(current, 1), "yyyy-MM");
  const nextMonthStr = format(addMonths(current, 1), "yyyy-MM");

  return (
    <div>
      <section className="py-20 px-6 text-center" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <p className="text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-trumpet-deep)" }}>
          Archive
        </p>
        <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'Recoleta Alt', var(--font-serif)", color: "var(--color-charcoal)" }}>
          Past Events
        </h1>
        <p className="text-base max-w-xl mx-auto" style={{ color: "var(--color-stone-deep)" }}>
          Browse by month to see what's happened at Be Home. Click an event for the full details.
        </p>
      </section>

      <div style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="max-w-4xl mx-auto px-6 py-14">
          <Link
            href="/events"
            className="text-sm hover:opacity-60 transition-opacity mb-8 inline-block"
            style={{ color: "var(--color-stone-deep)" }}
          >
            ← Back to events
          </Link>

          <div className="flex items-center justify-between mb-6">
            <Link
              href={`/events/archive?month=${prevMonthStr}`}
              className="text-sm font-medium px-3 py-1.5 rounded-full hover:opacity-60 transition-opacity"
              style={{ border: "1px solid var(--color-stone)", color: "var(--color-charcoal)" }}
            >
              ← Prev
            </Link>
            <h2
              className="text-2xl font-light"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              {format(current, "MMMM yyyy")}
            </h2>
            <Link
              href={`/events/archive?month=${nextMonthStr}`}
              className="text-sm font-medium px-3 py-1.5 rounded-full hover:opacity-60 transition-opacity"
              style={{ border: "1px solid var(--color-stone)", color: "var(--color-charcoal)" }}
            >
              Next →
            </Link>
          </div>

          <div
            className="grid grid-cols-7 gap-px rounded-2xl overflow-hidden"
            style={{ backgroundColor: "var(--color-stone)" }}
          >
            {weekdayLabels.map((d) => (
              <div
                key={d}
                className="text-center text-xs font-medium uppercase tracking-wide py-2"
                style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-stone-deep)" }}
              >
                {d}
              </div>
            ))}
            {days.map((day) => {
              const iso = format(day, "yyyy-MM-dd");
              const dayEvents = eventsByDate.get(iso) ?? [];
              const inMonth = isSameMonth(day, current);
              return (
                <div
                  key={iso}
                  className="min-h-24 p-1.5"
                  style={{ backgroundColor: "var(--color-cream)", opacity: inMonth ? 1 : 0.4 }}
                >
                  <p className="text-xs mb-1" style={{ color: "var(--color-stone-deep)" }}>
                    {format(day, "d")}
                  </p>
                  <div className="space-y-1">
                    {dayEvents.map((e) => (
                      <Link
                        key={e.id}
                        href={`/events/archive/${e.id}`}
                        className="block text-[10px] leading-tight px-1 py-0.5 rounded hover:opacity-70 transition-opacity"
                        style={{ backgroundColor: "var(--color-trumpet-light)", color: "var(--color-charcoal)" }}
                      >
                        <span className="font-medium">{e.time}</span> {e.title}
                        <br />
                        {e.price} · {e.practitioner}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
