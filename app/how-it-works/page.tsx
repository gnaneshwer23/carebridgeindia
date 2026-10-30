import type { Metadata } from "next";
import Link from "next/link";
import { PageCtaBand, PageHero, PageSection, PageShell, pageAction } from "@/components/site";

export const metadata: Metadata = { title: "How the comparison works" };

const steps = [
  {
    phase: "Prepare",
    owner: "You",
    copy: "Say whether an NHS wait, a UK private quote, or both brought you here. Keep medical history off this form.",
  },
  {
    phase: "Compare",
    owner: "Coordinator",
    copy: "Your enquiry is acknowledged. That is not clinical acceptance and it does not hold a date.",
  },
  {
    phase: "Compare",
    owner: "Provider",
    copy: "A coordinator asks for a patient-specific proposal. You do not upload a medical record on this site.",
  },
  {
    phase: "Decide",
    owner: "You",
    copy: "Ask a question, pause, or decide not to continue. Asking to discuss proceeding does not book treatment or take payment.",
  },
];

export default function HowPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          title="How it works"
          lede="Prepare your concern. Compare a personalised India proposal against your UK wait and costs. Decide — including deciding not to travel."
        />

        <PageSection className="bg-white">
          <ol className="grid gap-0">
            {steps.map((step, index) => (
              <li
                key={step.owner + step.copy}
                className="grid gap-4 border-t border-line py-10 first:border-t-0 first:pt-0 md:grid-cols-[7rem_1fr] md:gap-10 md:py-12"
              >
                <p className="font-serif text-5xl leading-none text-teal/25 md:text-6xl">{index + 1}</p>
                <div>
                  <p className="text-sm font-semibold tracking-[0.14em] text-teal">
                    {step.phase}
                    <span className="mx-2 text-line">·</span>
                    {step.owner}
                  </p>
                  <p className="mt-3 max-w-2xl text-xl leading-relaxed text-deep md:text-2xl md:leading-snug">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </PageSection>

        <PageCtaBand>
          <p className="max-w-xl font-serif text-2xl leading-snug text-white md:text-3xl">
            Start with the concern that brought you here.
          </p>
          <Link href="/enquire" className={pageAction}>
            Compare my options
          </Link>
        </PageCtaBand>
      </article>
    </PageShell>
  );
}
