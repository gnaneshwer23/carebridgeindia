"use client";

import type { CSSProperties } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function ComparisonBars() {
  const reduced = usePrefersReducedMotion();

  return (
    <figure
      className="relative overflow-hidden rounded-[28px] border border-line bg-white/95 p-6 md:p-10"
      aria-labelledby="comparison-bars-title"
    >
      <p className="text-sm font-semibold tracking-wide text-teal">Demonstration only</p>
      <h2 id="comparison-bars-title" className="mt-1 font-serif text-3xl tracking-tight text-deep">
        Side by side
      </h2>

      <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-14">
        <Bar
          label="Example UK total"
          amount="£16,700"
          width="92%"
          tone="uk"
          animate={!reduced}
        />
        <Bar
          label="Example India journey"
          amount="£11,000"
          width="60%"
          tone="in"
          animate={!reduced}
          delay
        />
      </div>

      <dl className="mt-10 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-6">
        <div>
          <dt className="text-sm text-deep/65">Example difference</dt>
          <dd className="font-serif text-3xl text-deep">£5,700</dd>
        </div>
        <div className="max-w-xs text-sm leading-relaxed text-deep/70">
          UK date not supplied · India window awaiting confirmation · Not a quote
        </div>
      </dl>
    </figure>
  );
}

function Bar({
  label,
  amount,
  width,
  tone,
  animate,
  delay,
}: {
  label: string;
  amount: string;
  width: string;
  tone: "uk" | "in";
  animate: boolean;
  delay?: boolean;
}) {
  const fill =
    tone === "uk"
      ? `h-full rounded-full bg-deep/80 ${animate ? (delay ? "cb-grow-bar-delay" : "cb-grow-bar") : ""}`
      : `h-full rounded-full bg-teal ${animate ? (delay ? "cb-grow-bar-delay" : "cb-grow-bar") : ""}`;

  const style: CSSProperties = animate
    ? ({ ["--bar-w"]: width } as CSSProperties)
    : { width };

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm text-deep/70">{label}</p>
        <p className="font-serif text-3xl tracking-tight text-deep md:text-4xl">{amount}</p>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-aqua">
        <div className={fill} style={style} />
      </div>
    </div>
  );
}
