"use client";

import Link from "next/link";
import { ProposalPanel } from "@/components/demo/proposal-panel";
import { useDemo } from "@/components/demo/provider";
import { DemoBanner, Panel } from "@/components/demo/ui";
import {
  DEMO_CASES,
  DEMO_TODAY,
  FOLLOW_UP_LABELS,
  RESPONSIBLE_CLINICIAN,
  acknowledgementOverdue,
  getDemoCase,
  liveNext,
} from "@/lib/demo/fixtures";
import { cn } from "@/lib/utils";

export function CoordinatorDemo() {
  const { state, update } = useDemo();
  const item = getDemoCase(state.activeCase);
  const next = liveNext(item.id, state);
  const overdue = item.id === "D" && acknowledgementOverdue(state, DEMO_TODAY);

  return (
    <div className="grid gap-6">
      <DemoBanner>
        Coordinator view of the four fictional cases. This is not the enquiry queue. Real enquiries stay in the signed-in coordinator desk and are not mixed with these fixtures.
      </DemoBanner>
      <ul className="grid gap-3">
        {DEMO_CASES.map((entry) => {
          const entryNext = liveNext(entry.id, state);
          const entryOverdue = entry.id === "D" && acknowledgementOverdue(state, DEMO_TODAY);
          return (
            <li key={entry.id}>
              <button
                type="button"
                className={cn(
                  "grid w-full gap-1 rounded-[16px] border bg-white p-5 text-left",
                  state.activeCase === entry.id ? "border-[#0B6B70]" : "border-[#D7E3E8]",
                )}
                onClick={() => update({ activeCase: entry.id })}
              >
                <span className="text-sm text-[#3a5560]">{entry.reference}</span>
                <span className="text-xl font-semibold">{entry.title}</span>
                <span>{entry.concern} · {entry.procedure}</span>
                <span>Status: {entry.stage}{entryOverdue ? " · Acknowledgement overdue" : ""}</span>
                <span>Owner: {entryNext.owner}</span>
                <span>Next: {entryNext.action}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <Panel>
        <h2 className="font-serif text-2xl">{item.reference}</h2>
        <p className="mt-2 text-base leading-relaxed">{item.summary}</p>
        <p className="mt-2 text-base">Next action: {next.action}</p>
        <p className="text-base">Responsible: {next.owner}</p>
        {overdue ? (
          <p className="mt-3 text-base">Overdue acknowledgement for {RESPONSIBLE_CLINICIAN}. Follow-up is {FOLLOW_UP_LABELS[state.followUpStatus]}.</p>
        ) : null}
        {item.id === "D" ? <p className="mt-2 text-base">Follow-up status: {FOLLOW_UP_LABELS[state.followUpStatus]}.</p> : null}
        <div className="mt-4 grid gap-4">
          {item.proposals.length === 0 ? (
            <p>No price on this fictional case. That is not a zero cost.</p>
          ) : (
            item.proposals.map((proposal) => <ProposalPanel key={proposal.id} proposal={proposal} />)
          )}
        </div>
        <p className="mt-4 text-base">
          <Link href="/coordinator/login" className="underline">Real enquiry queue</Link>
          {" "}requires coordinator sign-in and does not list DEMO-A to DEMO-D.
        </p>
      </Panel>
    </div>
  );
}
