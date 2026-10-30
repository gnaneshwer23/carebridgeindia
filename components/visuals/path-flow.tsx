"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const steps = [
  { title: "Prepare", label: "Your concern" },
  { title: "Compare", label: "Provider proposal" },
  { title: "Decide", label: "Including not to travel" },
];

export function PathFlow() {
  const reduced = usePrefersReducedMotion();

  return (
    <figure className="relative" aria-labelledby="path-flow-caption">
      <figcaption id="path-flow-caption" className="sr-only">
        Three-step path: Prepare your concern, compare a provider proposal, then decide — including
        deciding not to travel.
      </figcaption>

      <svg
        viewBox="0 0 960 220"
        className="hidden h-auto w-full md:block"
        role="img"
        aria-hidden
      >
        <defs>
          <linearGradient id="cb-path-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0b6b70" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#0b6b70" />
            <stop offset="100%" stopColor="#1a8a8f" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          d="M80 110 H880"
          stroke="url(#cb-path-line)"
          strokeWidth="3"
          strokeLinecap="round"
          className={reduced ? undefined : "cb-draw-line"}
          pathLength={1}
        />
        {steps.map((step, i) => {
          const x = 160 + i * 320;
          return (
            <g key={step.title} className={reduced ? undefined : `cb-stagger-${i + 1}`}>
              <circle cx={x} cy={110} r={38} fill="#e7f6f4" stroke="#0b6b70" strokeWidth="2.5" />
              <text
                x={x}
                y={116}
                textAnchor="middle"
                fill="#12333d"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 22 }}
              >
                {i + 1}
              </text>
              <text
                x={x}
                y={178}
                textAnchor="middle"
                fill="#12333d"
                style={{ fontFamily: "var(--font-fraunces), Georgia, serif", fontSize: 28 }}
              >
                {step.title}
              </text>
              <text
                x={x}
                y={206}
                textAnchor="middle"
                fill="#3d564c"
                style={{ fontFamily: "var(--font-manrope), sans-serif", fontSize: 14 }}
              >
                {step.label}
              </text>
            </g>
          );
        })}
      </svg>

      <ol className="grid gap-6 md:hidden">
        {steps.map((step, i) => (
          <li key={step.title} className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-teal bg-mist font-serif text-2xl text-deep">
              {i + 1}
            </span>
            <div>
              <p className="font-serif text-2xl text-deep">{step.title}</p>
              <p className="text-sm text-deep/70">{step.label}</p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
