import { connection } from "next/server";
import { notFound } from "next/navigation";
import { ComparisonView } from "@/components/comparison-view";
import {
  CaseStatusForm,
  MessageForm,
  ReissueForm,
  TaskForm,
} from "@/components/coordinator-forms";
import { ProposalEditor } from "@/components/proposal-editor";
import { setTaskStatus } from "@/lib/actions/staff";
import { getCaseBundle } from "@/lib/case-data";
import { formatMinor } from "@/lib/format";
import {
  CONCERN_OPTIONS,
  NATION_OPTIONS,
  PROCEDURE_OPTIONS,
  STATUS_LABELS,
  WAIT_KIND_OPTIONS,
  labelFor,
} from "@/lib/labels";
import { presentProposal, toDraft } from "@/lib/present";
import { Button } from "@/components/ui/button";

export const instant = false;

export default async function CasePage(props: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await props.params;
  const bundle = await getCaseBundle(id);
  if (!bundle) notFound();
  const { caseRow } = bundle;
  const draft = bundle.proposals.find((item) => item.proposal.status === "draft") ?? null;
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });

  return (
    <div className="grid gap-10">
      <header className="grid gap-2">
        <p className="text-sm text-muted-foreground">{caseRow.reference}</p>
        <h1 className="text-4xl">{caseRow.contactName}</h1>
        <p>
          {STATUS_LABELS[caseRow.status]} · {labelFor(CONCERN_OPTIONS, caseRow.concern)} · {labelFor(PROCEDURE_OPTIONS, caseRow.procedure)}
        </p>
        <p className="text-sm text-muted-foreground">
          {caseRow.contactEmail}
          {caseRow.contactPhone ? ` · ${caseRow.contactPhone}` : ""} · prefers {caseRow.contactPreference}
        </p>
      </header>

      <section className="grid gap-4 rounded-2xl border border-border bg-card p-5">
        <h2 className="text-2xl">Status and next action</h2>
        <CaseStatusForm
          caseId={caseRow.id}
          status={caseRow.status}
          nextAction={caseRow.nextAction}
          nextActionOwner={caseRow.nextActionOwner}
          responseDueOn={caseRow.responseDueOn ?? ""}
          pauseReason={caseRow.pauseReason ?? ""}
          declineReason={caseRow.declineReason ?? ""}
        />
      </section>

      <section className="grid gap-2 text-sm leading-6">
        <h2 className="text-2xl">Enquiry</h2>
        <p>
          {`${labelFor(NATION_OPTIONS, caseRow.ukNation)}, ${caseRow.location}. Wait: ${labelFor(WAIT_KIND_OPTIONS, caseRow.waitKind)}${caseRow.waitDetail ? ` — ${caseRow.waitDetail}` : ""}.`}
        </p>
        <p>
          {`UK quote: ${caseRow.quoteAmountMinor === null ? "not supplied" : formatMinor(caseRow.quoteAmountMinor)}${caseRow.quoteDate ? `, dated ${caseRow.quoteDate}` : ""}. Timeframe: ${caseRow.timeframe}.`}
        </p>
        <p>{`Coordinator: ${bundle.ownerName ?? "Unassigned"}.`}</p>
        {caseRow.responseDueOn && caseRow.responseDueOn < today ? (
          <p>Response date {caseRow.responseDueOn} has passed.</p>
        ) : null}
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl">Record</h2>
        <ul className="grid gap-2 text-sm">
          {bundle.messages.map((message) => (
            <li key={message.id} className="rounded-lg border border-border px-4 py-3">
              <span className="font-medium">{message.authorLabel}</span> · {message.kind}
              <p className="mt-1 whitespace-pre-wrap">{message.body}</p>
            </li>
          ))}
        </ul>
        <MessageForm caseId={caseRow.id} />
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl">Tasks</h2>
        <ul className="grid gap-2">
          {bundle.tasks.map((task) => (
            <li key={task.id} className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <span>
                {task.title} · {task.party} · {task.status}
                {task.detail ? ` · ${task.detail}` : ""}
              </span>
              <form action={setTaskStatus}>
                <input type="hidden" name="taskId" value={task.id} />
                <input type="hidden" name="caseId" value={caseRow.id} />
                <input type="hidden" name="status" value={task.status === "done" ? "open" : "done"} />
                <Button type="submit" variant="secondary" className="h-9 px-3">
                  {task.status === "done" ? "Reopen" : "Mark done"}
                </Button>
              </form>
            </li>
          ))}
        </ul>
        <TaskForm caseId={caseRow.id} />
      </section>

      <section className="grid gap-4">
        <h2 className="text-2xl">Proposals</h2>
        {bundle.proposals
          .filter((item) => item.proposal.status !== "draft")
          .map((item) => (
            <ComparisonView
              key={item.proposal.id}
              model={presentProposal(item, {
                ukWaitKind: caseRow.waitKind,
                ukWaitDetail: caseRow.waitDetail,
              })}
            />
          ))}
        <h3 className="text-xl">{draft ? `Draft version ${draft.proposal.version}` : "New proposal"}</h3>
        <ProposalEditor caseId={caseRow.id} draft={draft ? toDraft(draft) : null} />
      </section>

      <section className="grid gap-3">
        <h2 className="text-2xl">Access</h2>
        <ReissueForm caseId={caseRow.id} />
      </section>

      <section className="grid gap-2 text-sm">
        <h2 className="text-2xl">Audit</h2>
        <ul className="grid gap-1">
          {bundle.audits.map((event) => (
            <li key={event.id}>
              {event.createdAt.toLocaleString("en-GB", { timeZone: "Europe/London" })} · {event.action}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
