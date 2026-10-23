import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageShell } from "@/components/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Proposed patient platform" };

const stages = [
  ["Register", "You create a demonstration account. That is not clinical acceptance."],
  ["Assessment", "A named clinician would review records. No clinician is assigned in this prototype."],
  ["Plan", "A care plan would name owners and tasks. None is issued here."],
  ["Follow-up", "Questionnaires would be reviewed by staff. Calls are not part of this phase."],
];

export default function ForPatientsPage() {
  return (
    <PageShell>
      <Article
        title="Keep your treatment journey connected."
        lede="This is a proposed continuity-of-care direction. It is not the confirmed CareBridge service. The live comparison remains long waits and high private quotes."
      >
        <p>
          The hypothesis is that patients and care teams lose track of records, appointments and recovery updates when care moves between organisations. That hypothesis is not yet confirmed, and this page does not collect a care record.
        </p>
        <div className="grid gap-3">
          {stages.map(([title, copy]) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-4">
              <h2 className="text-xl">{title}</h2>
              <p className="mt-1 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
        <p>
          An agent, if one is added later, could prepare drafts and reminders. It would not diagnose, prescribe, decide fitness to travel, or close a clinical concern. A named clinician would have to own those decisions. No such agent is running.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link href="/register/patient" className={cn(buttonVariants(), "h-12 px-5")}>
            Create a patient account
          </Link>
          <Link href="/" className="self-center underline">
            Back to the treatment comparison
          </Link>
        </div>
      </Article>
    </PageShell>
  );
}
