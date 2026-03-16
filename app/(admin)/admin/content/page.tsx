import { content } from "@/lib/content";

// Helper to render a value preview
function ValuePreview({ value }: { value: unknown }) {
  if (typeof value === "string") {
    return (
      <p className="text-sm leading-relaxed" style={{ color: "var(--color-charcoal)" }}>
        {value.length > 120 ? value.slice(0, 120) + "…" : value}
      </p>
    );
  }
  if (typeof value === "number") {
    return <p className="text-sm" style={{ color: "var(--color-charcoal)" }}>{value}</p>;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <p className="text-xs italic" style={{ color: "var(--color-stone-deep)" }}>Empty list</p>;
    if (typeof value[0] === "string") {
      return (
        <ul className="space-y-1">
          {value.map((item, i) => (
            <li key={i} className="text-sm flex gap-2" style={{ color: "var(--color-charcoal)" }}>
              <span style={{ color: "var(--color-trumpet)" }}>–</span>
              {String(item).length > 80 ? String(item).slice(0, 80) + "…" : String(item)}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p className="text-xs italic" style={{ color: "var(--color-stone-deep)" }}>
        {value.length} item{value.length !== 1 ? "s" : ""} (objects — see file)
      </p>
    );
  }
  return <p className="text-xs italic" style={{ color: "var(--color-stone-deep)" }}>Object (see file)</p>;
}

// Renders a flat set of key/value fields from a section object
function FieldGroup({ label, data, path }: { label: string; data: Record<string, unknown>; path: string }) {
  const entries = Object.entries(data).filter(([, v]) => typeof v !== "object" || Array.isArray(v));
  if (entries.length === 0) return null;
  return (
    <div className="mb-1">
      <p className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "var(--color-stone-deep)" }}>
        {label}
      </p>
      <div className="space-y-3">
        {entries.map(([key, value]) => (
          <div key={key} className="rounded-lg p-3" style={{ backgroundColor: "var(--color-cream)" }}>
            <div className="flex items-center justify-between gap-2 mb-1">
              <code className="text-xs font-mono" style={{ color: "var(--color-trumpet-deep)" }}>
                {path}.{key}
              </code>
              <span className="text-xs shrink-0" style={{ color: "var(--color-stone)" }}>
                {Array.isArray(value) ? `array[${(value as unknown[]).length}]` : typeof value}
              </span>
            </div>
            <ValuePreview value={value} />
          </div>
        ))}
      </div>
    </div>
  );
}

interface SectionProps {
  id: string;
  title: string;
  page: string;
  fields: Record<string, unknown>;
}

function Section({ id, title, page, fields }: SectionProps) {
  // Top-level strings/arrays
  const topLevelEntries = Object.entries(fields).filter(
    ([, v]) => typeof v !== "object" || Array.isArray(v)
  );
  // Nested objects (hero, story, cta, etc.)
  const nestedEntries = Object.entries(fields).filter(
    ([, v]) => v !== null && typeof v === "object" && !Array.isArray(v)
  ) as [string, Record<string, unknown>][];

  return (
    <div id={id} className="rounded-2xl overflow-hidden mb-6" style={{ backgroundColor: "var(--color-stone-warm)" }}>
      <div className="px-6 py-4 flex items-center justify-between" style={{ backgroundColor: "var(--color-charcoal)" }}>
        <div>
          <h2 className="text-lg font-medium" style={{ color: "var(--color-cream)" }}>
            {title}
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--color-stone-deep)" }}>
            Page: <span style={{ color: "var(--color-trumpet)" }}>{page}</span>
            {"  ·  "}
            Edit in: <code className="font-mono" style={{ color: "var(--color-trumpet-light)" }}>lib/content.ts → {id}</code>
          </p>
        </div>
      </div>
      <div className="p-6 space-y-5">
        {/* Top-level fields */}
        {topLevelEntries.length > 0 && (
          <FieldGroup
            label="Fields"
            data={Object.fromEntries(topLevelEntries)}
            path={`content.${id}`}
          />
        )}
        {/* Nested sub-sections */}
        {nestedEntries.map(([key, obj]) => (
          <FieldGroup
            key={key}
            label={key}
            data={obj}
            path={`content.${id}.${key}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ContentPage() {
  const sections: SectionProps[] = [
    { id: "homepage", title: "Homepage", page: "/", fields: content.homepage as unknown as Record<string, unknown> },
    { id: "about", title: "About", page: "/about", fields: content.about as unknown as Record<string, unknown> },
    { id: "studio", title: "The Studio", page: "/studio", fields: content.studio as unknown as Record<string, unknown> },
    { id: "treatmentRoom", title: "Treatment Room", page: "/treatment-room", fields: content.treatmentRoom as unknown as Record<string, unknown> },
    { id: "catering", title: "Catering & Drinks", page: "/catering", fields: content.catering as unknown as Record<string, unknown> },
    { id: "classes", title: "Classes", page: "/classes", fields: content.classes as unknown as Record<string, unknown> },
    { id: "events", title: "Events", page: "/events", fields: content.events as unknown as Record<string, unknown> },
    { id: "treatments", title: "Treatments", page: "/treatments", fields: content.treatments as unknown as Record<string, unknown> },
    { id: "practitioners", title: "Practitioners", page: "/practitioners", fields: content.practitioners as unknown as Record<string, unknown> },
    { id: "contact", title: "Contact", page: "/contact", fields: content.contact as unknown as Record<string, unknown> },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--color-charcoal)" }}>
          Site Content
        </h1>
        <p className="text-sm leading-relaxed max-w-xl" style={{ color: "var(--color-stone-deep)" }}>
          All website copy is stored in one file:{" "}
          <code className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}>
            lib/content.ts
          </code>
          . To update any text, open that file, find the field shown below, and change the value.
          The site updates immediately on save (in dev) or on next deploy.
        </p>
      </div>

      {/* Quick-jump nav */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="text-xs px-3 py-1.5 rounded-full hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "var(--color-stone-warm)", color: "var(--color-charcoal)" }}
          >
            {s.title}
          </a>
        ))}
      </div>

      {/* How to edit callout */}
      <div
        className="mb-8 p-5 rounded-xl flex gap-4"
        style={{ backgroundColor: "var(--color-trumpet)", color: "var(--color-charcoal)" }}
      >
        <span className="text-2xl shrink-0">✏️</span>
        <div>
          <p className="font-medium mb-1">How to update copy</p>
          <ol className="text-sm space-y-1 list-decimal list-inside">
            <li>Open <code className="font-mono text-xs">lib/content.ts</code> in your code editor</li>
            <li>Find the section for the page you want to update (e.g. <code className="font-mono text-xs">content.about.story.headline</code>)</li>
            <li>Change the text value and save the file</li>
            <li>The site updates instantly in development, or on next deploy in production</li>
          </ol>
        </div>
      </div>

      {/* Sections */}
      {sections.map((s) => (
        <Section key={s.id} {...s} />
      ))}
    </div>
  );
}
