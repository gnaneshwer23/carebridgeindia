"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const BridgeScene = dynamic(() => import("@/components/visuals/bridge-scene"), {
  ssr: false,
  loading: () => null,
});

export function EnquireAtmosphere() {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -right-[10%] top-[-20%] h-[120%] w-[55%] opacity-40 md:opacity-55">
        {reduced ? (
          <svg viewBox="0 0 640 420" className="h-full w-full" fill="none">
            <path
              d="M80 300 C180 160, 260 140, 320 190 C390 250, 460 120, 560 110"
              stroke="rgba(238,248,252,0.5)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="80" cy="300" r="10" fill="rgba(238,248,252,0.45)" />
            <circle cx="560" cy="110" r="10" fill="rgba(238,248,252,0.55)" />
          </svg>
        ) : (
          <BridgeScene />
        )}
      </div>
    </div>
  );
}
