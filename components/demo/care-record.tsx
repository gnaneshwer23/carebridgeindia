"use client";

import { useState } from "react";
import { useDemo } from "@/components/demo/provider";
import { DemoBanner, Panel, primaryBtn, secondaryBtn } from "@/components/demo/ui";
import {
  MEDICINE_NOTE_ID,
  RESPONSIBLE_CLINICIAN,
  VERIFICATION_LABELS,
  getDemoCase,
  type RecordSection,
} from "@/lib/demo/fixtures";

const sections: { id: RecordSection; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "history", label: "Patient-reported history" },
  { id: "medicines", label: "Medicines" },
  { id: "allergies", label: "Allergies" },
  { id: "documents", label: "Documents and results" },
  { id: "encounters", label: "Encounters" },
  { id: "plan", label: "Care plan" },
  { id: "tasks", label: "Tasks" },
  { id: "follow_up", label: "Follow-up reports" },
  { id: "notes", label: "Signed notes and amendments" },
];

export function CareRecord({ canReview }: { canReview: boolean }) {
  const { state, update } = useDemo();
  const item = getDemoCase(state.activeCase);
  const note = state.notes[MEDICINE_NOTE_ID];
  const [draft, setDraft] = useState(note?.body ?? "");
  const [amendment, setAmendment] = useState("");
  const showReview = canReview && state.activeCase === "C" && state.exploreRole === "verified";

  function saveEdit() {
    if (!note || note.status !== "awaiting_review") return;
    const version = note.versions.length + 1;
    update({
      notes: {
        ...state.notes,
        [MEDICINE_NOTE_ID]: {
          ...note,
          body: draft,
          versions: [
            ...note.versions,
            {
              version,
              body: draft,
              author: RESPONSIBLE_CLINICIAN,
              action: "Draft edited. Previous text kept.",
              at: "2026-10-23",
            },
          ],
        },
      },
    });
  }

  function setStatus(status: "signed" | "rejected" | "amended", action: string, body = note?.body ?? "") {
    if (!note) return;
    const version = note.versions.length + 1;
    update({
      notes: {
        ...state.notes,
        [MEDICINE_NOTE_ID]: {
          status,
          body,
          reviewer: RESPONSIBLE_CLINICIAN,
          versions: [
            ...note.versions,
            {
              version,
              body,
              author: RESPONSIBLE_CLINICIAN,
              action,
              at: "2026-10-23",
            },
          ],
        },
      },
    });
  }

  return (
    <div className="grid gap-6">
      <DemoBanner>
        CareBridge care record for {item.person}. Fictional entries only. This does not replace a hospital record and it is not NHS-integrated.
      </DemoBanner>
      <p className="text-base text-[#3a5560]">{item.reference} · {item.procedure}</p>

      {sections.map((section) => {
        const entries = item.record.filter((entry) => entry.section === section.id);
        return (
          <Panel key={section.id}>
            <h2 className="font-serif text-2xl">{section.label}</h2>
            {entries.length === 0 && section.id !== "notes" ? (
              <p className="mt-3 text-base leading-relaxed">Not supplied.</p>
            ) : null}
            <div className="mt-3 grid gap-3">
              {entries.map((entry) => (
                <article key={entry.id} className="rounded-[12px] bg-[#EEF8FC] p-4 text-base leading-relaxed">
                  <h3 className="font-semibold">{entry.title}</h3>
                  <p className="mt-1">{entry.body}</p>
                  <p className="mt-2 text-sm">
                    {VERIFICATION_LABELS[entry.verification]} · Source: {entry.source} · Event date: {entry.eventDate} · Author: {entry.author}
                    {entry.reviewer ? ` · Reviewer: ${entry.reviewer}` : ""}
                  </p>
                </article>
              ))}
            </div>
            {section.id === "notes" && state.activeCase === "C" && note ? (
              <article className="mt-3 rounded-[12px] border border-[#D7E3E8] p-4 text-base leading-relaxed">
                <p className="text-sm font-semibold text-[#0B6B70]">
                  {note.status === "awaiting_review"
                    ? "AI draft"
                    : note.status === "signed"
                      ? "Clinician verified"
                      : note.status === "rejected"
                        ? "Rejected draft"
                        : "Amendment linked to the signed draft"}
                </p>
                <h3 className="mt-1 font-semibold">Medicine conflict</h3>
                <p className="mt-2">{note.body}</p>
                <p className="mt-2">
                  Evidence beside the draft: patient-reported ramipril 5 mg on 2 March 2026, and imported ramipril 10 mg on 28 February 2026. Both stay visible. The agent does not pick a dose.
                </p>
                <p className="mt-2 text-sm">
                  Source: the two medicine entries · Event date: 2026-10-20 · Author: Record agent
                  {note.reviewer ? ` · Reviewer: ${note.reviewer}` : " · Reviewer: not yet"}
                </p>
                <ol className="mt-3 grid gap-2">
                  {note.versions.map((version) => (
                    <li key={version.version} className="rounded-[12px] bg-[#EEF8FC] px-3 py-2">
                      Version {version.version} · {version.action} · {version.author} · {version.at}
                      <span className="mt-1 block">{version.body}</span>
                    </li>
                  ))}
                </ol>
                {showReview && note.status === "awaiting_review" ? (
                  <div className="mt-4 grid gap-3">
                    <label className="grid gap-2" htmlFor="draft-body">
                      Edit the draft
                      <textarea id="draft-body" className="min-h-28 rounded-[16px] border border-[#D7E3E8] p-3 text-base" value={draft} onChange={(event) => setDraft(event.target.value)} />
                    </label>
                    <div className="flex flex-wrap gap-3">
                      <button type="button" className={secondaryBtn} onClick={saveEdit}>Save edit</button>
                      <button type="button" className={secondaryBtn} onClick={() => setStatus("rejected", "Draft rejected. Evidence kept.")}>Reject</button>
                      <button type="button" className={primaryBtn} onClick={() => setStatus("signed", "Signed. The draft text was not overwritten later.")}>Approve and sign</button>
                    </div>
                  </div>
                ) : null}
                {showReview && (note.status === "signed" || note.status === "amended") ? (
                  <div className="mt-4 grid gap-3">
                    <label className="grid gap-2" htmlFor="amendment">
                      Record a correction
                      <textarea id="amendment" className="min-h-24 rounded-[16px] border border-[#D7E3E8] p-3 text-base" value={amendment} onChange={(event) => setAmendment(event.target.value)} />
                    </label>
                    <button
                      type="button"
                      className={primaryBtn}
                      onClick={() => {
                        if (amendment.trim().length < 3) return;
                        setStatus("amended", `Amendment linked to version 1. Earlier text kept.`, amendment.trim());
                        setAmendment("");
                      }}
                    >
                      Add amendment
                    </button>
                  </div>
                ) : null}
                {canReview && state.exploreRole !== "verified" ? (
                  <p className="mt-3">Review actions stay off until you explore the verified fictional role. That switch does not open real records.</p>
                ) : null}
                {!canReview ? (
                  <p className="mt-3">Signing and amendments are done in the clinician demonstration, by the reviewing clinician.</p>
                ) : null}
              </article>
            ) : null}
            {section.id === "notes" && state.activeCase !== "C" ? (
              <p className="mt-3 text-base">No signed note on this case.</p>
            ) : null}
          </Panel>
        );
      })}
    </div>
  );
}
