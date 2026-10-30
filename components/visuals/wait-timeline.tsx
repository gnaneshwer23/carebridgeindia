"use client";

import { useId, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const labels = [
  {
    id: "confirmed",
    title: "Confirmed",
    short: "Named window + conditions",
    copy: "A provider has named a treatment window, with a confirmation date and conditions.",
  },
  {
    id: "estimate",
    title: "Estimate",
    short: "UK period you were given",
    copy: "A date or waiting period you were given in the UK, labelled as an estimate.",
  },
  {
    id: "blank",
    title: "Not supplied",
    short: "Stays blank — not zero",
    copy: "No treatment date has been given. That stays blank. It is not treated as zero weeks.",
  },
] as const;

export function WaitTimeline() {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const baseId = useId();
  const current = labels[active];

  return (
    <figure className="relative" aria-labelledby={`${baseId}-caption`}>
      <figcaption id={`${baseId}-caption`} className="sr-only">
        How dates are labelled: Confirmed, Estimate, or Not supplied. Select a label to read its meaning.
      </figcaption>

      <div className="relative mx-auto max-w-3xl">
        <svg viewBox="0 0 720 120" className="h-auto w-full" aria-hidden>
          <line
            x1="48"
            y1="56"
            x2="672"
            y2="56"
            stroke="#c9dce3"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1="48"
            y1="56"
            x2={48 + active * 312}
            y2="56"
            stroke="#0b6b70"
            strokeWidth="3"
            strokeLinecap="round"
            className={reduced ? undefined : "cb-timeline-fill"}
          />
          {labels.map((item, i) => {
            const x = 48 + i * 312;
            const on = i === active;
            return (
              <g key={item.id}>
                <circle
                  cx={x}
                  cy={56}
                  r={on ? 18 : 12}
                  fill={on ? "#0b6b70" : "#e7f6f4"}
                  stroke="#0b6b70"
                  strokeWidth="2.5"
                  className={reduced ? undefined : "transition-[r,fill] duration-200 ease-out"}
                />
              </g>
            );
          })}
        </svg>

        <div
          className="mt-2 grid grid-cols-3 gap-2"
          role="tablist"
          aria-label="Date label types"
        >
          {labels.map((item, i) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`${baseId}-panel`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  setActive((v) => (v + 1) % labels.length);
                }
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  setActive((v) => (v - 1 + labels.length) % labels.length);
                }
              }}
              className="cb-cta rounded-2xl px-2 py-3 text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
            >
              <span className="block font-serif text-lg text-deep md:text-xl">{item.title}</span>
              <span className="mt-1 block text-xs text-deep/65 md:text-sm">{item.short}</span>
            </button>
          ))}
        </div>
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className="mx-auto mt-8 max-w-xl border-l-2 border-teal/40 pl-5"
      >
        <p className="font-serif text-2xl text-deep">{current.title}</p>
        <p className="mt-2 text-base leading-relaxed text-deep/80">{current.copy}</p>
      </div>
    </figure>
  );
}

export function WaitScaleViz() {
  return (
    <figure
      className="overflow-hidden rounded-[28px] border border-line bg-ink p-6 text-aqua md:p-8"
      aria-labelledby="wait-scale-caption"
    >
      <figcaption id="wait-scale-caption" className="sr-only">
        National waiting lists are context, not your appointment date.
      </figcaption>
      <p className="text-xs font-semibold tracking-[0.18em] text-aqua/60">CONTEXT · NOT YOUR DATE</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="font-serif text-5xl tracking-tight text-white md:text-6xl">7.3m</p>
          <p className="mt-2 text-sm leading-relaxed text-aqua/75">
            Outstanding pathways (Jul 2026) — pathways, not people
          </p>
        </div>
        <div>
          <p className="font-serif text-5xl tracking-tight text-white md:text-6xl">111k</p>
          <p className="mt-2 text-sm leading-relaxed text-aqua/75">
            Waiting over 52 weeks — still not your procedure date
          </p>
        </div>
      </div>
      <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
        <div className="cb-pulse-bar h-full w-[18%] rounded-full bg-lagoon/80" />
      </div>
      <p className="mt-4 text-sm text-aqua/65">
        No “weeks saved”. Consultation ≠ treatment window.
      </p>
      <a
        className="mt-5 inline-block text-sm font-semibold text-aqua underline underline-offset-2 decoration-aqua/40 hover:decoration-aqua"
        href="https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2026/09/Jul26-RTT-statistical-press-notice-PDF-578K-97ylx5.pdf"
      >
        NHS England RTT, July 2026
      </a>
    </figure>
  );
}
