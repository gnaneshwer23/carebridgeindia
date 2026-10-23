"use client";

import { useDemo } from "@/components/demo/provider";
import { DemoBanner, Panel, primaryBtn, secondaryBtn } from "@/components/demo/ui";
import {
  ACK_DUE_ON,
  DEMO_TODAY,
  FOLLOW_UP_FLOW,
  FOLLOW_UP_LABELS,
  RESPONSIBLE_CLINICIAN,
  RESPONSIBLE_COORDINATOR,
  TELEPHONY_ENABLED,
  VOICE_FLOW,
  VOICE_TRANSCRIPTS,
  acknowledgementOverdue,
  followUpFromAnswers,
  type VoiceStatus,
} from "@/lib/demo/fixtures";

export function FollowUpPanel({ audience }: { audience: "patient" | "clinician" }) {
  const { state, update } = useDemo();
  const overdue = acknowledgementOverdue(state, DEMO_TODAY);

  function submit(form: FormData) {
    const answers = {
      wound: String(form.get("wound") ?? ""),
      pain: String(form.get("pain") ?? ""),
      person: String(form.get("person") ?? ""),
    };
    if (!answers.wound || !answers.pain || !answers.person) return;
    update({
      activeCase: "D",
      followUpAnswers: answers,
      followUpStatus: followUpFromAnswers(answers),
    });
  }

  return (
    <div className="grid gap-6">
      <DemoBanner>
        Follow-up for fictional patient D. Not an emergency service and not continuous monitoring. Live telephony is {TELEPHONY_ENABLED ? "on" : "off"}.
      </DemoBanner>

      {overdue ? (
        <p role="status" className="rounded-[16px] border border-[#8d2f2f] bg-white px-4 py-3 text-base leading-relaxed">
          Acknowledgement is overdue. It was due on {ACK_DUE_ON}. Responsible role: {RESPONSIBLE_CLINICIAN}. The item stays open until that role records an acknowledgement.
        </p>
      ) : null}

      <Panel>
        <h2 className="font-serif text-2xl">Questionnaire</h2>
        <ol className="mt-3 flex flex-wrap gap-2" aria-label="Follow-up states">
          {FOLLOW_UP_FLOW.map((status) => (
            <li
              key={status}
              aria-current={state.followUpStatus === status ? "step" : undefined}
              className={`rounded-full px-3 py-1 text-sm ${state.followUpStatus === status ? "bg-[#0B6B70] text-white" : "bg-[#EEF8FC]"}`}
            >
              {FOLLOW_UP_LABELS[status]}
            </li>
          ))}
        </ol>
        {audience === "patient" && state.followUpStatus === "due" ? (
          <form
            className="mt-4 grid gap-4"
            onSubmit={(event) => {
              event.preventDefault();
              submit(new FormData(event.currentTarget));
            }}
          >
            <label className="grid gap-2 text-base" htmlFor="wound">
              How does the wound look compared with yesterday?
              <select id="wound" name="wound" className="h-12 rounded-[16px] border border-[#D7E3E8] px-3" defaultValue="">
                <option value="" disabled>Select an answer</option>
                <option value="as_expected">As expected</option>
                <option value="more_red">More red or leaking</option>
                <option value="not_sure">Not sure</option>
              </select>
            </label>
            <label className="grid gap-2 text-base" htmlFor="pain">
              How is the pain compared with the written plan?
              <select id="pain" name="pain" className="h-12 rounded-[16px] border border-[#D7E3E8] px-3" defaultValue="">
                <option value="" disabled>Select an answer</option>
                <option value="as_expected">As expected</option>
                <option value="worse">Worse</option>
                <option value="not_sure">Not sure</option>
              </select>
            </label>
            <label className="grid gap-2 text-base" htmlFor="person">
              Do you want a person to take this over?
              <select id="person" name="person" className="h-12 rounded-[16px] border border-[#D7E3E8] px-3" defaultValue="">
                <option value="" disabled>Select an answer</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
            <button type="submit" className={primaryBtn}>Submit follow-up</button>
          </form>
        ) : (
          <div className="mt-4 text-base leading-relaxed">
            <p>Status: {FOLLOW_UP_LABELS[state.followUpStatus]}.</p>
            {state.followUpAnswers.wound ? (
              <p className="mt-2">
                Wound: {state.followUpAnswers.wound}. Pain: {state.followUpAnswers.pain}. Asked for a person: {state.followUpAnswers.person}. Unknown answers stay as “Not sure”.
              </p>
            ) : null}
            {audience === "patient" && state.followUpStatus === "submitted" ? (
              <button type="button" className={cnButton()} onClick={() => update({ followUpStatus: "awaiting_review" })}>
                Send to clinician review
              </button>
            ) : null}
          </div>
        )}
        {audience === "clinician" ? (
          <div className="mt-4 flex flex-wrap gap-3">
            {state.followUpStatus === "concern_flagged" || state.followUpStatus === "awaiting_review" ? (
              <button type="button" className={primaryBtn} onClick={() => update({ followUpStatus: "acknowledged" })}>
                Acknowledge
              </button>
            ) : null}
            {state.followUpStatus === "acknowledged" ? (
              <form
                className="grid w-full gap-3"
                onSubmit={(event) => {
                  event.preventDefault();
                  const response = String(new FormData(event.currentTarget).get("response") ?? "").trim();
                  if (response.length < 3) return;
                  update({ followUpStatus: "action_recorded", followUpResponse: response });
                }}
              >
                <label className="grid gap-2 text-base" htmlFor="response">
                  Document the response
                  <textarea id="response" name="response" className="min-h-24 rounded-[16px] border border-[#D7E3E8] p-3" />
                </label>
                <button type="submit" className={primaryBtn}>Record follow-up action</button>
              </form>
            ) : null}
            {state.followUpResponse ? <p>Recorded response: {state.followUpResponse}</p> : null}
          </div>
        ) : null}
      </Panel>

      <Panel>
        <h2 className="font-serif text-2xl">Simulated call</h2>
        <p className="mt-2 text-base leading-relaxed">Fictional transcript only. No call, SMS or telephony provider is used.</p>
        <p className="mt-2 text-base">Current: {state.voiceStatus.replaceAll("_", " ")}</p>
        <p className="mt-2 rounded-[12px] bg-[#EEF8FC] p-4 text-base leading-relaxed">{VOICE_TRANSCRIPTS[state.voiceStatus]}</p>
        <p className="mt-3 text-base">Responsible for the next human step: {state.voiceStatus === "requests_person" ? RESPONSIBLE_COORDINATOR : RESPONSIBLE_CLINICIAN}.</p>
        {audience === "patient" ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className={primaryBtn}
              onClick={() => {
                const index = VOICE_FLOW.indexOf(state.voiceStatus);
                const next = VOICE_FLOW[Math.min(index + 1, VOICE_FLOW.length - 1)] ?? "human_review";
                if (VOICE_FLOW.includes(state.voiceStatus)) update({ voiceStatus: next });
              }}
            >
              Advance simulation
            </button>
            {(
              [
                ["no_answer", "No answer"],
                ["wrong_person", "Wrong person"],
                ["disconnected", "Disconnected"],
                ["requests_person", "Patient requests a person"],
                ["permission_withdrawn", "Permission withdrawn"],
                ["escalation_awaiting", "Escalation awaiting acknowledgement"],
              ] as const
            ).map(([value, label]) => (
              <button key={value} type="button" className={secondaryBtn} onClick={() => update({ voiceStatus: value satisfies VoiceStatus, voiceAcknowledged: false })}>
                {label}
              </button>
            ))}
            <button type="button" className={secondaryBtn} disabled>
              Place a live call
            </button>
          </div>
        ) : null}
        {audience === "clinician" && state.voiceStatus === "escalation_awaiting" && !state.voiceAcknowledged ? (
          <button type="button" className={cn(primaryBtn, "mt-4")} onClick={() => update({ voiceAcknowledged: true })}>
            Acknowledge the voice escalation
          </button>
        ) : null}
        {state.voiceAcknowledged ? <p className="mt-3 text-base">Voice escalation acknowledged by {RESPONSIBLE_CLINICIAN}.</p> : null}
      </Panel>
    </div>
  );
}

function cnButton() {
  return primaryBtn;
}

function cn(className: string, extra?: string) {
  return extra ? `${className} ${extra}` : className;
}
