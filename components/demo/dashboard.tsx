"use client";

import Link from "next/link";
import { ProposalPanel } from "@/components/demo/proposal-panel";
import { useDemo } from "@/components/demo/provider";
import { DemoBanner, Panel, primaryBtn } from "@/components/demo/ui";
import {
  AGENT_BOUNDARY,
  DEMO_CASES,
  VERIFICATION_LABELS,
  getDemoCase,
  liveNext,
  type ScreenState,
} from "@/lib/demo/fixtures";
import { cn } from "@/lib/utils";

const screens: { id: ScreenState; label: string }[] = [
  { id: "ready", label: "Ready" },
  { id: "loading", label: "Loading" },
  { id: "empty", label: "Empty" },
  { id: "error", label: "Error" },
  { id: "completed", label: "Completed" },
];

export function PatientDashboard() {
  const { state, update } = useDemo();
  const item = getDemoCase(state.activeCase);
  const next = liveNext(state.activeCase, state);
  const completed = state.screen === "completed";

  return (
    <div className="grid gap-6">
      <DemoBanner>
        Patient dashboard in demo mode. {state.profile ? `${state.profile.name} is a demonstration profile, not a verified account.` : "No demonstration profile yet. You can still open the fictional cases."} Real enquiries still use Compare my options and are stored separately.
      </DemoBanner>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Fictional cases">
        {DEMO_CASES.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={state.activeCase === entry.id}
            className={cn(
              "h-12 rounded-[16px] px-4 text-base",
              state.activeCase === entry.id ? "bg-[#0B6B70] text-white" : "border border-[#D7E3E8] bg-white",
            )}
            onClick={() => update({ activeCase: entry.id })}
          >
            {entry.reference} {entry.title}
          </button>
        ))}
      </div>

      <fieldset className="grid gap-2">
        <legend className="text-sm text-[#3a5560]">Demonstration screen state</legend>
        <div className="flex flex-wrap gap-2">
          {screens.map((screen) => (
            <button
              key={screen.id}
              type="button"
              className={cn(
                "h-12 rounded-[16px] px-4 text-base",
                state.screen === screen.id ? "bg-[#12333D] text-white" : "bg-white border border-[#D7E3E8]",
              )}
              onClick={() => update({ screen: screen.id })}
            >
              {screen.label}
            </button>
          ))}
        </div>
      </fieldset>

      <p className="text-base text-[#3a5560]">
        {item.reference} · {item.procedure} · {completed ? "Demonstration complete" : item.stage}
      </p>

      <section className="rounded-[16px] bg-[#E7F6F4] p-6 shadow-[0_12px_40px_rgba(18,51,61,0.08)] md:p-8">
        <p className="text-sm font-semibold text-[#0B6B70]">Next action</p>
        <h1 className="mt-2 max-w-3xl font-serif text-3xl leading-tight md:text-5xl">
          {state.screen === "empty"
            ? "Nothing is waiting in this empty view"
            : state.screen === "error"
              ? "The demonstration could not load"
              : completed
                ? "No further demonstration step"
                : next.action}
        </h1>
        <p className="mt-4 text-lg leading-relaxed">
          Responsible: {state.screen === "error" ? "You can try again" : next.owner}
        </p>
        {state.screen === "error" ? (
          <button type="button" className={cn(primaryBtn, "mt-6")} onClick={() => update({ screen: "ready" })}>
            Try the demonstration again
          </button>
        ) : (
          <p className="mt-4 text-base leading-relaxed">
            {completed
              ? "Nothing was booked, paid or accepted for treatment."
              : "This card is the next step. It is not an appointment you can book from here."}
          </p>
        )}
      </section>

      {state.screen === "loading" ? (
        <div aria-busy="true" aria-live="polite" className="grid gap-3">
          <p>Loading demonstration</p>
          <div className="h-24 rounded-[16px] bg-white motion-safe:animate-pulse" />
          <div className="h-24 rounded-[16px] bg-white motion-safe:animate-pulse" />
        </div>
      ) : null}

      {state.screen === "error" ? (
        <Panel>
          <h2 className="font-serif text-2xl">The fictional case did not load</h2>
          <p className="mt-2 text-base leading-relaxed">Nothing was saved and no clinical service was contacted.</p>
        </Panel>
      ) : null}

      {state.screen === "ready" || state.screen === "completed" ? (
        <>
          <Panel>
            <h2 className="font-serif text-2xl">Comparison proposals</h2>
            <p className="mt-2 text-base leading-relaxed">{item.summary}</p>
            {item.proposals.length === 0 ? (
              <p className="mt-3 text-base">No price comparison on this case. A missing proposal is not a price of zero.</p>
            ) : (
              <div className="mt-4 grid gap-4">
                {item.proposals.map((proposal) => (
                  <ProposalPanel key={proposal.id} proposal={proposal} />
                ))}
              </div>
            )}
          </Panel>

          <div className="grid gap-4 md:grid-cols-2">
            <Panel>
              <h2 className="font-serif text-2xl">Appointments</h2>
              <ul className="mt-3 grid gap-3">
                {item.appointments.map((appointment) => (
                  <li key={appointment.title} className="rounded-[12px] bg-[#EEF8FC] px-4 py-3 text-base leading-relaxed">
                    <span className="font-semibold">{appointment.status === "confirmed" ? "Confirmed" : "Requested"}.</span>{" "}
                    {appointment.title}. {appointment.when}. {appointment.note}
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel>
              <h2 className="font-serif text-2xl">Care record</h2>
              <p className="mt-2 text-base leading-relaxed">
                A CareBridge care record for this fictional patient. It does not replace a hospital record and it is not NHS-integrated.
              </p>
              <Link href="/demo/record" className={cn(primaryBtn, "mt-4")}>
                Open the care record
              </Link>
            </Panel>
          </div>

          <Panel>
            <h2 className="font-serif text-2xl">Documents</h2>
            <ul className="mt-3 grid gap-2 text-base leading-relaxed">
              {item.documents.map((document) => (
                <li key={document.title}>
                  {document.title}. Source: {document.source}. Date: {document.date}. {VERIFICATION_LABELS[document.verification]}. Imported files are untrusted and cannot change access.
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <h2 className="font-serif text-2xl">Follow-up tasks</h2>
            <ul className="mt-3 grid gap-2 text-base">
              {item.tasks.map((task) => (
                <li key={task.title}>{task.title} · {task.owner} · {task.status}</li>
              ))}
            </ul>
            {state.activeCase === "D" ? (
              <Link href="/demo/follow-up" className={cn(primaryBtn, "mt-4")}>
                Open follow-up
              </Link>
            ) : null}
          </Panel>

          <div className="grid gap-4 md:grid-cols-2">
            <Panel>
              <h2 className="font-serif text-2xl">Care team</h2>
              <ul className="mt-3 grid gap-2 text-base">
                {item.team.map((member) => (
                  <li key={member.role}>{member.role}: {member.name}</li>
                ))}
              </ul>
              <p className="mt-2 text-sm leading-relaxed text-[#3a5560]">Roles in this demonstration are not verified affiliations.</p>
            </Panel>
            <Panel>
              <h2 className="font-serif text-2xl">Communication preferences</h2>
              <p className="mt-3 text-base leading-relaxed">
                {state.profile
                  ? `${state.profile.preference === "phone" ? "Phone" : "Email"} · ${state.profile.language} · ${state.profile.nation}`
                  : item.preferences}
              </p>
            </Panel>
          </div>

          <Panel>
            <h2 className="font-serif text-2xl">Simulated agents</h2>
            <p className="mt-2 text-base leading-relaxed">{AGENT_BOUNDARY}</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {item.agents.map((agent) => (
                <article key={agent.name} className="rounded-[16px] bg-[#EEF8FC] p-4">
                  <h3 className="text-lg font-semibold">{agent.name}</h3>
                  <p className="mt-1 text-base">Status: {agent.status}</p>
                  <p className="mt-1 text-base leading-relaxed">Source: {agent.source}</p>
                  <p className="mt-1 text-base leading-relaxed">Output: {agent.output}</p>
                  <p className="mt-1 text-base leading-relaxed">Human action: {agent.humanAction}</p>
                </article>
              ))}
            </div>
          </Panel>
        </>
      ) : null}

      {state.screen === "empty" ? (
        <Panel>
          <h2 className="font-serif text-2xl">Nothing supplied</h2>
          <p className="mt-2 text-base leading-relaxed">
            This empty view has no proposals, documents or medicines. Missing costs and missing medicines stay unknown. They are not zero and they are not “none”.
          </p>
        </Panel>
      ) : null}
    </div>
  );
}

