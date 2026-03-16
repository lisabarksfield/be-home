const payments = [
  { id: "1", description: "Studio Rental · Tue 25 Feb", amount: "€75", status: "PAID", date: "25 Feb 2025" },
  { id: "2", description: "Treatment Room · Fri 28 Feb", amount: "€60", status: "PAID", date: "28 Feb 2025" },
  { id: "3", description: "Studio Rental · Tue 4 Mar", amount: "€75", status: "PENDING", date: "4 Mar 2025" },
];

export default function PaymentsPage() {
  return (
    <div>
      <h1
        className="text-3xl font-light mb-4"
        style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
      >
        Payments
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-stone-deep)" }}>
        Your space rental payments to Be Home.
      </p>

      <div className="space-y-3">
        {payments.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-xl flex flex-wrap items-center justify-between gap-4"
            style={{ backgroundColor: "var(--color-stone-warm)" }}
          >
            <div>
              <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>{p.description}</p>
              <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>{p.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-medium" style={{ color: "var(--color-charcoal)" }}>{p.amount}</span>
              <span
                className="text-xs px-2.5 py-1 rounded-full"
                style={
                  p.status === "PAID"
                    ? { backgroundColor: "var(--color-trumpet-light)", color: "var(--color-charcoal)" }
                    : { backgroundColor: "var(--color-stone)", color: "var(--color-charcoal)" }
                }
              >
                {p.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-8 p-5 rounded-xl text-center"
        style={{ backgroundColor: "var(--color-stone-warm)" }}
      >
        <p className="text-sm" style={{ color: "var(--color-stone-deep)" }}>
          Stripe payments will be connected once your account is configured.
          Contact <a href="mailto:hello@behomecascais.com" className="underline" style={{ color: "var(--color-charcoal)" }}>hello@behomecascais.com</a> for payment queries.
        </p>
      </div>
    </div>
  );
}
