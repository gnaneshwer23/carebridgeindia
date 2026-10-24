import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageCard, PageShell, pageAction } from "@/components/site";

export const metadata: Metadata = { title: "How the comparison works" };

const steps = [
  ["You", "Say whether the wait, the cost, or both brought you here."],
  ["Coordinator", "The enquiry is acknowledged. That is not clinical acceptance and it does not hold a date."],
  ["Provider", "A coordinator asks for a patient-specific proposal. You do not upload a medical record on this site."],
  ["You", "You can ask a question, pause, or decide not to continue. Asking to discuss proceeding does not book treatment or take payment."],
];

export default function HowPage() {
  return (
    <PageShell>
      <Article
        title="How it works"
        lede="You name the concern. A coordinator gathers a proposal. You decide, including a decision to stay."
      >
        <PageCard>
          <ol className="grid gap-6">
            {steps.map(([owner, copy], index) => (
              <li key={owner + copy}>
                <p className="font-semibold text-[#0B6B70]">{index + 1}. {owner}</p>
                <p className="mt-1">{copy}</p>
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
