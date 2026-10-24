import type { Metadata } from "next";
import { Article, PageCard, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Costs, recovery and aftercare" };

const duties = [
  ["Clinical assessment", "Who decides whether the procedure is suitable."],
  ["Complications", "Who responds if something goes wrong, and how to reach them."],
  ["Follow-up", "Who provides the agreed recovery care, and where."],
  ["Escalation", "Who you contact if that plan is not working."],
];

export default function AftercarePage() {
  return (
    <PageShell>
      <Article
        title="Recovery and aftercare"
        lede="A proposal has to name who does what before any departure. If that plan cannot be agreed, the pathway should stop."
      >
        <PageCard>
          <dl className="grid gap-6">
            {duties.map(([title, copy]) => (
              <div key={title}>
                <dt className="font-semibold">{title}</dt>
                <dd className="mt-1">{copy}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6">
            Recovery costs sit in the total: rehabilitation and the follow-up that has actually been agreed. Travel and accommodation are separate from the clinical fee. A coordination fee, if one is charged, is disclosed and is not taken on this site during the pilot. NHS routine follow-up is not arranged by this site, and NHS-funded routine aftercare should not be assumed.
          </p>
          <p className="mt-4">
            A case cannot move into preparation in the coordinator workspace until those four responsibilities are named on the published proposal. If travel and recovery costs remove the advantage, or a safe handback cannot be agreed, the pathway should stop.
          </p>
        </PageCard>
      </Article>
    </PageShell>
  );
}
