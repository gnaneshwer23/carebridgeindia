import type { Metadata } from "next";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "How the comparison works" };

export default function HowPage() {
  return (
    <PageShell>
      <Article
        title="How the comparison works"
        lede="You choose a problem, a coordinator gathers a proposal, and you see the same fields every time — including the blanks."
      >
        <ol className="grid gap-3">
          <li className="rounded-2xl border border-border bg-card p-4"><strong>You.</strong> Say whether the wait, the cost, or both brought you here.</li>
          <li className="rounded-2xl border border-border bg-card p-4"><strong>Coordinator.</strong> The enquiry is acknowledged. That is not clinical acceptance and it does not hold a date.</li>
          <li className="rounded-2xl border border-border bg-card p-4"><strong>Provider.</strong> A coordinator asks for a patient-specific proposal. You do not upload a medical record on this site.</li>
          <li className="rounded-2xl border border-border bg-card p-4"><strong>You.</strong> You can ask a question, pause, or decide not to continue. Asking to discuss proceeding does not book treatment or take payment.</li>
        </ol>
        <p>
          UK–India coordination already exists elsewhere. The test here is whether a case-specific comparison is clear enough to support a decision, including a decision to stay.
        </p>
      </Article>
    </PageShell>
  );
}
