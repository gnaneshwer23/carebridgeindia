"use client";

import { useId, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const steps = [
  {
    phase: "Prepare",
    owner: "You",
    label: "Name the concern",
    copy: "Say whether an NHS wait, a UK private quote, or both brought you here. Keep medical history off this form.",
  },
  {
    phase: "Compare",
    owner: "Coordinator",
    label: "Enquiry acknowledged",
    copy: "Your enquiry is acknowledged. That is not clinical acceptance and it does not hold a date.",
  },
  {
    phase: "Compare",
    owner: "Provider",
    label: "Patient-specific proposal",
    copy: "A coordinator asks for a patient-specific proposal. You do not upload a medical record on this site.",
  },
  {
    phase: "Decide",
    owner: "You",
    label: "Ask, pause, or stop",
    copy: "Ask a question, pause, or decide not to continue. Asking to discuss proceeding does not book treatment or take payment.",
  },
] as const;

export function HowSequence() {
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();
  const baseId = useId();
  const step = steps[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
      <ol className="grid gap-3" aria-label="Comparison steps">
        {steps.map((item, i) => {
          const on = i === active;
          return (
            <li key={`${item.owner}-${item.label}`}>
              <button
                type="button"
                aria-current={on ? "step" : undefined}
                aria-controls={`${baseId}-detail`}
                onClick={() => setActive(i)}
                className={`cb-cta flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-[border-color,background-color,transform] duration-200 ease-out ${
                  on
                    ? "border-teal bg-mist"
                    : "border-line bg-white/80 hover:border-teal/40"
                }`}
              >
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-serif text-xl ${
                    on ? "bg-teal text-white" : "bg-aqua text-deep"
                  } ${reduced ? "" : "transition-colors duration-200"}`}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="block text-xs font-semibold tracking-wide text-teal">
                    {item.phase} · {item.owner}
                  </span>
                  <span className="mt-0.5 block font-serif text-xl text-deep">{item.label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div
        id={`${baseId}-detail`}
        className="relative min-h-[280px] overflow-hidden rounded-[28px] cb-hero-plane p-8 text-aqua md:p-10"
        aria-live="polite"
      >
        <HowIllustration index={active} reduced={reduced} />
        <p className="relative z-10 text-xs font-semibold tracking-[0.18em] text-aqua/65">
          {step.phase.toUpperCase()} · {step.owner.toUpperCase()}
        </p>
        <p className="relative z-10 mt-4 font-serif text-3xl leading-tight text-white md:text-4xl">
          {step.label}
        </p>
        <p className="relative z-10 mt-5 max-w-md text-base leading-relaxed text-aqua/85 md:text-lg">
          {step.copy}
        </p>
      </div>
    </div>
  );
}

function HowIllustration({ index, reduced }: { index: number; reduced: boolean }) {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      viewBox="0 0 480 360"
      aria-hidden
    >
      <path
        d="M40 280 C120 180, 180 160, 240 200 C300 240, 360 120, 440 100"
        stroke="rgba(238,248,252,0.55)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="6 10"
        className={reduced ? undefined : "cb-draw-line"}
        pathLength={1}
        key={index}
      />
      {[0, 1, 2, 3].map((i) => {
        const x = 70 + i * 110;
        const y = 260 - i * 35;
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === index ? 10 : 5}
            fill={i === index ? "#eef8fc" : "rgba(238,248,252,0.35)"}
          />
        );
      })}
    </svg>
  );
}
