import Link from "next/link";

const stats = [
  { label: "Active practitioners", value: "4" },
  { label: "Pending approvals", value: "2" },
  { label: "Rentals this month", value: "18" },
  { label: "Contact submissions", value: "7" },
];

const recentRentals = [
  { practitioner: "Sofia Mendes", space: "The Studio", date: "Tue 25 Feb", status: "CONFIRMED" },
  { practitioner: "Ana Rodrigues", space: "Treatment Room", date: "Wed 26 Feb", status: "CONFIRMED" },
  { practitioner: "New User", space: "The Studio", date: "Thu 27 Feb", status: "PENDING" },
];

const pendingPractitioners = [
  { name: "Maria Costa", specialty: "Sound Healing", applied: "20 Feb 2025" },
  { name: "Carlos Silva", specialty: "Nutrition Coaching", applied: "19 Feb 2025" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1
        className="text-3xl font-light mb-8"
        style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
      >
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
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
        {/* Pending practitioner approvals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
              Pending approvals
            </h2>
            <Link href="/admin/practitioners" className="text-xs hover:opacity-60" style={{ color: "var(--color-stone-deep)" }}>
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {pendingPractitioners.map((p) => (
              <div
                key={p.name}
                className="p-4 rounded-xl flex items-center justify-between"
                style={{ backgroundColor: "var(--color-stone-warm)" }}
              >
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>{p.name}</p>
                  <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>{p.specialty} · Applied {p.applied}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="text-xs px-3 py-1.5 rounded-full font-medium"
                    style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
                  >
                    Approve
                  </button>
                  <button
                    className="text-xs px-3 py-1.5 rounded-full"
                    style={{ border: "1px solid var(--color-stone)", color: "var(--color-charcoal)" }}
                  >
                    Review
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent rentals */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-light" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
              Recent rentals
            </h2>
            <Link href="/admin/rentals" className="text-xs hover:opacity-60" style={{ color: "var(--color-stone-deep)" }}>
              View all →
            </Link>
          </div>
          <div className="space-y-3">
            {recentRentals.map((r, i) => (
              <div
                key={i}
                className="p-4 rounded-xl flex items-center justify-between"
                style={{ backgroundColor: "var(--color-stone-warm)" }}
              >
                <div>
                  <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>
                    {r.practitioner} · {r.space}
                  </p>
                  <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>{r.date}</p>
                </div>
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={
                    r.status === "CONFIRMED"
                      ? { backgroundColor: "var(--color-trumpet-light)", color: "var(--color-charcoal)" }
                      : { backgroundColor: "var(--color-stone)", color: "var(--color-charcoal)" }
                  }
                >
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
