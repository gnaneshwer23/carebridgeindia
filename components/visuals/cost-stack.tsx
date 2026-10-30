"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const layers = [
  { label: "Treatment & tests", height: "28%", color: "bg-teal" },
  { label: "Travel & stay", height: "22%", color: "bg-lagoon" },
  { label: "Transfers & rehab", height: "18%", color: "bg-pine" },
  { label: "Aftercare & fee", height: "14%", color: "bg-deep" },
];

export function CostStack() {
  const reduced = usePrefersReducedMotion();

  return (
    <figure className="grid items-end gap-10 lg:grid-cols-[1fr_1.1fr]" aria-labelledby="cost-stack-caption">
      <figcaption id="cost-stack-caption" className="sr-only">
        The India total stacks treatment, travel, transfers, rehab, aftercare, and any coordination fee.
        Unknown amounts stay not supplied.
      </figcaption>

      <div className="flex h-72 items-end gap-3 md:h-80" role="img" aria-hidden>
        {layers.map((layer, i) => (
          <div key={layer.label} className="flex flex-1 flex-col items-center gap-3">
            <div className="flex h-56 w-full items-end md:h-64">
              <div
                className={`w-full rounded-t-2xl ${layer.color} ${reduced ? "" : `cb-stack-rise cb-stagger-${i + 1}`}`}
                style={{ height: layer.height, minHeight: layer.height }}
              />
            </div>
            <p className="text-center text-xs leading-snug text-deep/75 md:text-sm">{layer.label}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <p className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
          Whole journey, not just the procedure
        </p>
        <ul className="grid gap-3 text-base text-deep/85">
          <li className="flex gap-3 border-l-2 border-teal/40 pl-4">Unknowns stay blank — never zero</li>
          <li className="flex gap-3 border-l-2 border-teal/40 pl-4">Lower total only when key costs are known</li>
          <li className="flex gap-3 border-l-2 border-teal/40 pl-4">India can cost more — that outcome is shown</li>
        </ul>
      </div>
    </figure>
  );
}

export function CostBenchmarkViz() {
  return (
    <figure
      className="overflow-hidden rounded-[28px] border border-line bg-white p-6 md:p-8"
      aria-labelledby="benchmark-caption"
    >
      <figcaption id="benchmark-caption" className="sr-only">
        PHIN March 2026 London average package prices are context, not your quote.
      </figcaption>
      <p className="text-sm font-semibold tracking-wide text-teal">PHIN · Mar 2026 · indicative</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl bg-aqua px-5 py-5">
          <p className="text-sm text-deep/65">London hip package avg</p>
          <p className="mt-1 font-serif text-4xl text-deep">£15,712</p>
        </div>
        <div className="rounded-2xl bg-mist px-5 py-5">
          <p className="text-sm text-deep/65">London knee package avg</p>
          <p className="mt-1 font-serif text-4xl text-deep">£15,689</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-deep/70">
        Benchmarks ≠ your quote. Packages differ. Source and exchange-rate dates appear on a real proposal.
      </p>
    </figure>
  );
}
