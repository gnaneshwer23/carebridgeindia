"use client";

import dynamic from "next/dynamic";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const BridgeScene = dynamic(() => import("@/components/visuals/bridge-scene"), {
  ssr: false,
  loading: () => <BridgeFallback />,
});

function BridgeFallback() {
  return (
    <svg
      className="h-full w-full"
      viewBox="0 0 640 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M80 300 C180 160, 260 140, 320 190 C390 250, 460 120, 560 110"
        stroke="rgba(238,248,252,0.65)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="80" cy="300" r="14" fill="#0b6b70" />
      <circle cx="560" cy="110" r="14" fill="#1a8a8f" />
      <circle cx="320" cy="175" r="8" fill="#eef8fc" />
    </svg>
  );
}

export function BridgeCanvas({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={className} aria-hidden>
      {reduced ? <BridgeFallback /> : <BridgeScene />}
    </div>
  );
}
