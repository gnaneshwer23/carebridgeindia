import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { ComparisonView } from "@/components/comparison-view";
import {
  DeclineForm,
  PauseForm,
  QuestionForm,
} from "@/components/session-forms";
import { PageShell } from "@/components/site";
import { Button } from "@/components/ui/button";
import { getPatientSession, getRevealKey } from "@/lib/auth";
import { getCaseBundle } from "@/lib/case-data";
import {
  ACTION_OWNER_LABELS,
  PROCEDURE_OPTIONS,
  STATUS_LABELS,
  labelFor,
} from "@/lib/labels";
import { formatIsoDate } from "@/lib/format";
import { presentProposal } from "@/lib/present";
import { deleteEnquiry, discussProceeding, dismissAccessKey } from "@/lib/actions/patient";

export const instant = false;
export const metadata: Metadata = {
  title: "Your case",
  robots: { index: false, follow: false },
};

export default async function MyCasePage() {
  await connection();
  const session = await getPatientSession();
  if (!session) redirect("/access");
  const bundle = await getCaseBundle(session.caseId);
  if (!bundle) redirect("/access");
  const reveal = await getRevealKey();
  const { caseRow } = bundle;
  const visible = bundle.proposals.filter(
    (item) => item.proposal.status === "published" || item.proposal.status === "superseded",
  );
  const messages = bundle.messages.filter((message) => message.kind !== "note");
  const waiting =
    messages.length > 0 && messages[messages.length - 1]?.kind === "question";

  return (
    <PageShell>
      <div className="mx-auto grid max-w-3xl gap-8 px-5 py-12 md:py-20">
        <header className="grid gap-3">
          <p className="text-sm text-muted-foreground">
            {`Reference ${caseRow.reference} · ${labelFor(PROCEDURE_OPTIONS, caseRow.procedure)} · ${STATUS_LABELS[caseRow.status] ?? caseRow.status}`}
          </p>
          <h1 className="text-4xl">Your case</h1>
          <p className="text-lg text-muted-foreground">
            {`${STATUS_LABELS[caseRow.status] ?? caseRow.status}. This page is not clinical acceptance and it does not reserve a treatment date.`}
          </p>
        </header>

        {reveal ? (
          <section className="grid gap-3 rounded-2xl border border-border bg-card p-5">
            <h2 className="text-2xl">Save this access key</h2>
            <p>
              It is shown once. With your reference, it opens this case on another device. Coordinators cannot look it up later.
            </p>
            <p className="font-medium break-all">{reveal}</p>
            <form action={dismissAccessKey}>
              <Button type="submit" variant="secondary" className="h-12 px-4">
                I have saved the key
              </Button>
            </form>
          </section>
        ) : null}

        <section className="grid gap-3 rounded-2xl border border-border bg-wash p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Next action</p>
          <h2 className="text-3xl">{caseRow.nextAction}</h2>
          <p>
            {`${ACTION_OWNER_LABELS[caseRow.nextActionOwner] ?? caseRow.nextActionOwner} · Coordinator: ${bundle.ownerName ?? "Not yet assigned"}`}
          </p>
          {visible.length > 0 ? (
            <a href="#proposals" className="text-base font-medium text-primary underline">
              Review comparison
            </a>
          ) : (
            <p className="text-sm text-muted-foreground">
              No proposal has been published. Nothing can be booked from this page.
            </p>
          )}
        </section>

        <section id="proposals" className="grid gap-4">
          <h2 className="text-3xl">Proposals</h2>
          {visible.length === 0 ? (
            <p>No proposal has been published. A missing proposal is not a price of zero.</p>
          ) : (
            visible.map((item) => {
              const model = presentProposal(item, {
                ukWaitKind: caseRow.waitKind,
                ukWaitDetail: caseRow.waitDetail,
              });
              const availability = model.timing.treatmentWindows.length
                ? "Treatment window supplied"
                : "Treatment window not supplied";
              return (
                <article key={item.proposal.id} className="grid gap-3 rounded-2xl border border-border bg-card p-5">
                  <h3 className="text-2xl">{model.procedureExact || "Procedure not supplied"}</h3>
                  <p>{model.result.complete ? "Expected total complete" : "Expected total withheld until every required cost is supplied"}</p>
                  <p>{availability}</p>
                  <p>{model.expiresOn ? `Expires ${formatIsoDate(model.expiresOn)}` : "Expiry not supplied"}</p>
                  <details>
                    <summary className="cursor-pointer font-medium text-primary">Review comparison</summary>
                    <div className="mt-4">
                      <ComparisonView model={model} />
                    </div>
                  </details>
                </article>
              );
            })
          )}
        </section>

        <section className="grid gap-3">
          <h2 className="text-3xl">Questions</h2>
          {waiting ? <p>A question is waiting for an answer.</p> : null}
          {messages.length === 0 ? <p>No questions yet.</p> : null}
          <ul className="grid gap-3">
            {messages.map((message) => (
              <li key={message.id} className="rounded-lg border border-border px-4 py-3 text-sm">
                <p className="font-medium">
                  {message.kind === "question" ? "You" : message.authorLabel}
                </p>
                <p className="mt-1 whitespace-pre-wrap">{message.body}</p>
              </li>
            ))}
          </ul>
          <QuestionForm />
        </section>

        <section className="grid gap-3">
          <h2 className="text-3xl">Preparation and aftercare</h2>
          {bundle.tasks.length === 0 ? (
            <p>No tasks have been agreed.</p>
          ) : (
            <ul className="grid gap-2">
              {bundle.tasks.map((task) => (
                <li key={task.id}>
                  {task.title} · {task.party} · {task.status}
                  {task.detail ? ` · ${task.detail}` : ""}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="grid gap-6 border-t border-border pt-6">
          <h2 className="text-3xl">Your decision</h2>
          <p>
            You can pause or stop. Neither choice books treatment, takes payment, or changes NHS care.
          </p>
          <form action={discussProceeding}>
            <Button type="submit" className="h-11 px-4">
              I want to discuss proceeding
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">
            This asks for a conversation. It does not book treatment.
          </p>
          <PauseForm />
          <DeclineForm />
          <form action={deleteEnquiry}>
            <Button type="submit" variant="secondary" className="h-11 px-4">
              Delete this enquiry
            </Button>
          </form>
        </section>
      </div>
    </PageShell>
  );
}
