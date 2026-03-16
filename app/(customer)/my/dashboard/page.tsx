import Link from "next/link";

const upcomingBookings = [
  { id: "1", class: "Morning Vinyasa Flow", practitioner: "Sofia Mendes", date: "Tue 25 Feb", time: "09:00", status: "CONFIRMED" },
  { id: "2", class: "Breathwork & Meditation", practitioner: "James Carroll", date: "Wed 26 Feb", time: "18:30", status: "CONFIRMED" },
];

export default function CustomerDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-light mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
        My Bookings
      </h1>
      <div className="space-y-3">
        {upcomingBookings.map((b) => (
          <div key={b.id} className="p-5 rounded-xl flex flex-wrap items-center justify-between gap-4" style={{ backgroundColor: "var(--color-stone-warm)" }}>
            <div>
              <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>{b.class}</p>
              <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>with {b.practitioner} · {b.date} · {b.time}</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: "var(--color-trumpet-light)", color: "var(--color-charcoal)" }}>
              {b.status}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link href="/classes" style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }} className="inline-block px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
          Browse more classes
        </Link>
      </div>
    </div>
  );
}
