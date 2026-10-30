"use client";

import { useId, useState } from "react";
import { WHATSAPP_DISPLAY } from "@/lib/whatsapp";

const items = [
  {
    title: "Not NHS",
    answer:
      "CareBridge is an independent comparison pathway for UK adults. It is not clinical acceptance, not an emergency service, and not part of the NHS.",
  },
  {
    title: "No invented prices",
    answer:
      "This site does not invent catalogue prices, “starting from” figures, or savings percentages. A personalised total expected cost comes after an enquiry, with unknowns left blank.",
  },
  {
    title: "No “no waiting list”",
    answer:
      "We do not claim “no waiting list” or guaranteed dates. Availability is provider-confirmed for your case when a coordinator gathers a proposal — and a consultation is not a treatment window.",
  },
  {
    title: "Talk to a person",
    answer: `Use WhatsApp at ${WHATSAPP_DISPLAY}, or start Compare my options so a coordinator can follow up. For emergencies in the UK, use NHS 111 or local emergency services.`,
  },
];

export function HonestyStrip() {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" role="list">
      {items.map((item, i) => {
        const on = open === i;
        return (
          <button
            key={item.title}
            type="button"
            role="listitem"
            aria-expanded={on}
            aria-controls={`${baseId}-a-${i}`}
            onClick={() => setOpen(i)}
            className={`cb-cta rounded-[24px] border p-5 text-left transition-[border-color,background-color] duration-200 ease-out ${
              on ? "border-teal bg-mist" : "border-line bg-white/90 hover:border-teal/35"
            }`}
          >
            <span className="font-serif text-2xl text-deep">{item.title}</span>
            <span
              id={`${baseId}-a-${i}`}
              className={`mt-3 block text-sm leading-relaxed text-deep/80 ${on ? "" : "line-clamp-2"}`}
            >
              {item.answer}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function PromiseMarks() {
  const marks = [
    { title: "Your UK picture", label: "Wait estimate or private quote, labelled honestly" },
    { title: "India journey total", label: "Treatment, tests, travel, stay, rehab, aftercare" },
    { title: "Unknowns stay blank", label: "Never treated as zero; incomplete savings withheld" },
    { title: "Not travelling is OK", label: "A valid outcome of the comparison" },
  ];

  return (
    <ul className="grid gap-4 sm:grid-cols-2" aria-label="What the comparison is">
      {marks.map((m, i) => (
        <li
          key={m.title}
          className={`relative overflow-hidden rounded-[24px] border border-line bg-white/90 p-5 cb-stagger-${i + 1}`}
        >
          <span className="absolute -right-2 -top-3 font-serif text-6xl text-teal/10" aria-hidden>
            {i + 1}
          </span>
          <p className="relative font-serif text-xl text-deep">{m.title}</p>
          <p className="relative mt-2 text-sm leading-relaxed text-deep/75">{m.label}</p>
        </li>
      ))}
    </ul>
  );
}
