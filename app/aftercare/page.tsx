import type { Metadata } from "next";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Costs, recovery and aftercare" };

export default function AftercarePage() {
  return (
    <PageShell>
      <Article
        title="Plan the return before any departure"
        lede="A proposal has to name who assesses you, who responds if something goes wrong, who provides follow-up, and who you contact."
      >
        <p>
          Recovery costs sit in the total: rehabilitation and the follow-up that has actually been agreed. Travel and accommodation are separate from the clinical fee. A coordination fee, if one is charged, is disclosed and is not taken on this site during the pilot.
        </p>
        <p>
          NHS-funded routine aftercare should not be assumed. A case cannot move into preparation in the coordinator workspace until those four responsibilities are named on the published proposal.
        </p>
        <p>
          If travel and recovery costs remove the advantage, or a safe handback cannot be agreed, the pathway should stop.
        </p>
      </Article>
    </PageShell>
  );
}
