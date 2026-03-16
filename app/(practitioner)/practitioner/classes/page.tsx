import Link from "next/link";

const myClasses = [
  { id: "1", title: "Morning Vinyasa Flow", type: "CLASS", day: "Tuesday 09:00", published: true, bookings: 8, capacity: 12 },
  { id: "2", title: "Yin Yoga", type: "CLASS", day: "Thursday 19:00", published: true, bookings: 5, capacity: 10 },
  { id: "3", title: "Weekend Flow", type: "CLASS", day: "Saturday 09:30", published: true, bookings: 10, capacity: 15 },
  { id: "4", title: "Spring Renewal Retreat", type: "RETREAT", day: "Sat 8 Mar · All day", published: false, bookings: 0, capacity: 12 },
];

export default function PractitionerClassesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1
          className="text-3xl font-light"
          style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
        >
          My Classes & Events
        </h1>
        <button
          style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
          className="px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          + Add class
        </button>
      </div>

      <div className="space-y-3">
        {myClasses.map((c) => (
          <div
            key={c.id}
            className="p-5 rounded-xl flex flex-wrap items-center justify-between gap-4"
            style={{ backgroundColor: "var(--color-stone-warm)" }}
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>{c.title}</p>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={
                    c.published
                      ? { backgroundColor: "var(--color-trumpet-light)", color: "var(--color-charcoal)" }
                      : { backgroundColor: "var(--color-stone)", color: "var(--color-charcoal)" }
                  }
                >
                  {c.published ? "Live" : "Draft"}
                </span>
              </div>
              <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>
                {c.day} · {c.type}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: "var(--color-charcoal)" }}>
                  {c.bookings}/{c.capacity}
                </p>
                <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>bookings</p>
              </div>
              <button
                className="text-xs px-3 py-1.5 rounded-full border hover:opacity-60 transition-opacity"
                style={{ borderColor: "var(--color-stone)", color: "var(--color-charcoal)" }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
