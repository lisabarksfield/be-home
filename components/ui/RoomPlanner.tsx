"use client";

import { useEffect, useRef, useState } from "react";

type Room = "studio" | "workshop" | "treatment";

export function RoomPlanner({ room }: { room: Room }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1500);

  useEffect(() => {
    let settled = false;
    const resize = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      if (event.data?.type !== "behome-planner:resize" || !Number.isFinite(event.data.height)) return;
      settled = true;
      setHeight(Math.min(6000, Math.max(600, Math.ceil(event.data.height) + 4)));
    };
    window.addEventListener("message", resize);

    // The iframe's own resize broadcast can fire before this listener (or
    // before the iframe has even loaded) depending on hydration timing, so
    // poll for it briefly instead of relying on a single message.
    const ping = () => frame.current?.contentWindow?.postMessage({ type: "behome-planner:request-resize" }, window.location.origin);
    ping();
    const interval = setInterval(() => { if (settled) clearInterval(interval); else ping(); }, 200);
    const timeout = setTimeout(() => clearInterval(interval), 5000);

    return () => { window.removeEventListener("message", resize); clearInterval(interval); clearTimeout(timeout); };
  }, []);

  return (
    <iframe
      ref={frame}
      src={`/room-planner/index.html?embed=1&room=${room}`}
      title="Be Home interactive room planner"
      style={{ width: "100%", height, border: 0, display: "block" }}
    />
  );
}
