import Link from "next/link";

const upcomingRentals = [
  { id: "1", space: "The Studio", date: "Tuesday 25 Feb", time: "09:00–12:00", status: "CONFIRMED" },
  { id: "2", space: "Treatment Room", date: "Friday 28 Feb", time: "14:00–17:00", status: "CONFIRMED" },
];

const upcomingClasses = [
  { id: "1", title: "Morning Vinyasa Flow", date: "Tue, 25 Feb", time: "09:00", bookings: 8, capacity: 12 },
  { id: "2", title: "Yin Yoga", date: "Thu, 27 Feb", time: "19:00", bookings: 5, capacity: 10 },
];

export default function PractitionerDashboard() {
  return (
    <div>
      <div className="mb-10">
        <h1
          className="text-3xl font-light mb-1"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
        >
          Good morning, Sofia
        </h1>
        <p className="text-sm" style={{ color: "var(--color-stone-deep)" }}>
          Here's what's coming up this week.
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Classes this week", value: "3" },
          { label: "Total bookings", value: "22" },
          { label: "Rental hours (Feb)", value: "12h" },
          { label: "Profile views", value: "48" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-5"
            style={{ backgroundColor: "var(--color-stone-warm)" }}
          >
            <p
              className="text-2xl font-light mb-1"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              {s.value}
            </p>
            <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Upcoming rentals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-light"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              Upcoming rentals
            </h2>
            <Link href="/practitioner/rentals" className="text-xs hover:opacity-60 transition-opacity" style={{ color: "var(--color-stone-deep)" }}>
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingRentals.map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-xl flex items-center justify-between"
                style={{ backgroundColor: "var(--color-stone-warm)" }}
              >
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>{r.space}</p>
                  <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>
                    {r.date} · {r.time}
                  </p>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{ backgroundColor: "var(--color-trumpet-light)", color: "var(--color-charcoal)" }}
                >
                  {r.status}
                </span>
              </div>
            ))}
            <Link
              href="/practitioner/rentals"
              style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
              className="block w-full text-center py-2.5 rounded-xl text-sm font-medium mt-2 hover:opacity-90 transition-opacity"
            >
              + Book a space
            </Link>
          </div>
        </div>

        {/* Upcoming classes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-xl font-light"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
            >
              Upcoming classes
            </h2>
            <Link href="/practitioner/classes" className="text-xs hover:opacity-60 transition-opacity" style={{ color: "var(--color-stone-deep)" }}>
              Manage →
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingClasses.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl"
                style={{ backgroundColor: "var(--color-stone-warm)" }}
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>{c.title}</p>
                  <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>{c.date} · {c.time}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-stone)" }}>
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${(c.bookings / c.capacity) * 100}%`,
                        backgroundColor: "var(--color-trumpet)",
                      }}
                    />
                  </div>
                  <span className="text-xs" style={{ color: "var(--color-stone-deep)" }}>
                    {c.bookings}/{c.capacity}
                  </span>
                </div>
              </div>
            ))}
            <Link
              href="/practitioner/classes"
              style={{ border: "1px solid var(--color-stone)", color: "var(--color-charcoal)" }}
              className="block w-full text-center py-2.5 rounded-xl text-sm mt-2 hover:opacity-60 transition-opacity"
            >
              + Add a class
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
