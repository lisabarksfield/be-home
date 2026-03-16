export default function CalendarSyncPage() {
  return (
    <div>
      <h1
        className="text-3xl font-light mb-4"
        style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}
      >
        Google Calendar Sync
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-stone-deep)" }}>
        Connect your Google Calendar to automatically add your Be Home rentals and classes.
      </p>

      <div className="max-w-md p-6 rounded-2xl" style={{ backgroundColor: "var(--color-stone-warm)" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--color-cream)" }}>
            📅
          </div>
          <div>
            <p className="font-medium text-sm" style={{ color: "var(--color-charcoal)" }}>Google Calendar</p>
            <p className="text-xs" style={{ color: "var(--color-stone-deep)" }}>Not connected</p>
          </div>
        </div>
        <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--color-stone-deep)" }}>
          When connected, confirmed bookings will automatically appear in your Google Calendar,
          and your clients will receive calendar invites.
        </p>
        <button
          style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
          className="w-full py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Connect Google Calendar
        </button>
        <p className="text-xs mt-3 text-center" style={{ color: "var(--color-stone-deep)" }}>
          Requires Google OAuth configuration (see setup guide)
        </p>
      </div>
    </div>
  );
}
