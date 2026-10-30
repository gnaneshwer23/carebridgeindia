import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageCard, PageShell, pageAction } from "@/components/site";

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
      <Article
        title="How it works"
        lede="Prepare your concern. Compare a personalised India proposal against your UK wait and costs. Decide — including deciding not to travel."
      >
        <PageCard>
          <ol className="grid gap-8">
            {steps.map((step, index) => (
              <li key={step.owner + step.copy} className="grid gap-1 border-l-2 border-teal/35 pl-4">
                <p className="text-sm font-semibold tracking-wide text-teal">
                  {index + 1}. {step.phase} · {step.owner}
                </p>
                <p className="text-deep/90">{step.copy}</p>
              </li>
            ))}
          </ol>
        </PageCard>
        <Link href="/enquire" className={pageAction}>
          Compare my options
        </Link>
      </Article>
    </PageShell>
  );
}
