"use client";

import Link from "next/link";
import { useState } from "react";
import { FollowUpPanel } from "@/components/demo/follow-up";
import { useDemo } from "@/components/demo/provider";
import { DemoBanner, Panel, primaryBtn, secondaryBtn } from "@/components/demo/ui";
import {
  CLINICIAN_STATUS_LABELS,
  DEMO_CASES,
  DEMO_TODAY,
  acknowledgementOverdue,
  liveNext,
  type ClinicianStatus,
} from "@/lib/demo/fixtures";
import { cn } from "@/lib/utils";

const control = "h-12 w-full rounded-[16px] border border-[#D7E3E8] bg-white px-3 text-base";

const statuses: ClinicianStatus[] = [
  "submitted",
  "under_review",
  "more_information",
  "approved",
  "declined",
  "suspended",
  "expired",
];

export function ClinicianApplication() {
  const { state, update } = useDemo();
  const [error, setError] = useState("");
  const form = state.clinician;

  function setField(key: keyof typeof form, value: string) {
    update({ clinician: { ...form, [key]: value } });
  }

  return (
    <div className="grid gap-6">
      <DemoBanner>
        An application never grants access to real patient records. These statuses are simulated.
      </DemoBanner>
      <form
        className="grid gap-4 rounded-[16px] border border-[#D7E3E8] bg-white p-5 md:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          if (!form.name.trim() || !form.organisation.trim() || !form.specialty.trim() || !form.jurisdiction.trim() || !form.registrationBody.trim() || !form.registrationNumber.trim() || !form.intendedRole) {
            setError("Complete every field with sample details. Nothing is checked against a register.");
            return;
          }
          setError("");
          update({ clinician: { ...form, status: "submitted" }, exploreRole: "pending" });
        }}
      >
        <h2 className="font-serif text-3xl">Application</h2>
        {error ? <p role="alert" className="rounded-[16px] border border-[#8d2f2f] px-4 py-3">{error}</p> : null}
        <label className="grid gap-2 text-base">Name
          <input className={control} value={form.name} onChange={(event) => setField("name", event.target.value)} autoComplete="off" />
        </label>
        <label className="grid gap-2 text-base">Organisation
          <input className={control} value={form.organisation} onChange={(event) => setField("organisation", event.target.value)} autoComplete="off" />
        </label>
        <label className="grid gap-2 text-base">Specialty
          <input className={control} value={form.specialty} onChange={(event) => setField("specialty", event.target.value)} />
        </label>
        <label className="grid gap-2 text-base">Jurisdiction
          <input className={control} value={form.jurisdiction} onChange={(event) => setField("jurisdiction", event.target.value)} />
        </label>
        <label className="grid gap-2 text-base">Registration body
          <input className={control} value={form.registrationBody} onChange={(event) => setField("registrationBody", event.target.value)} />
        </label>
        <label className="grid gap-2 text-base">Registration details
          <input className={control} value={form.registrationNumber} onChange={(event) => setField("registrationNumber", event.target.value)} />
          <span className="text-sm text-[#3a5560]">Use a sample number. It is not looked up.</span>
        </label>
        <label className="grid gap-2 text-base">Intended role
          <select className={control} value={form.intendedRole} onChange={(event) => setField("intendedRole", event.target.value)}>
            <option value="">Select a role</option>
            <option>Orthopaedic surgeon</option>
            <option>Anaesthetist</option>
            <option>General practitioner</option>
            <option>Nurse</option>
            <option>Care coordinator</option>
          </select>
        </label>
        <button type="submit" className={primaryBtn}>Submit demonstration application</button>
      </form>

      <Panel>
        <h2 className="font-serif text-2xl">Status: {CLINICIAN_STATUS_LABELS[form.status]}</h2>
        <p className="mt-2 text-base leading-relaxed">
          Live access would require verified credentials, a defined scope, multi-factor authentication and an explicit assignment. This page does not do those checks. Approved, in this simulation, still does not open a Neon case.
        </p>
        <ul className="mt-4 grid gap-2">
          {statuses.map((status) => (
            <li key={status} className={cn("rounded-[12px] px-3 py-2 text-base", form.status === status ? "bg-[#E7F6F4] font-semibold" : "bg-[#EEF8FC]")}>
              {CLINICIAN_STATUS_LABELS[status]}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[#3a5560]">Demonstration controls. They do not contact a reviewer.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {statuses.map((status) => (
            <button key={status} type="button" className={secondaryBtn} onClick={() => update({ clinician: { ...form, status } })}>
              Set {CLINICIAN_STATUS_LABELS[status]}
            </button>
          ))}
        </div>
        <Link href="/demo/clinician" className={cn(primaryBtn, "mt-6")}>Open the clinician workspace</Link>
      </Panel>
    </div>
  );
}

export function ClinicianWorkspace() {
  const { state, update } = useDemo();
  const overdue = acknowledgementOverdue(state, DEMO_TODAY);
  const verified = state.exploreRole === "verified";

  return (
    <div className="grid gap-6">
      <DemoBanner>
        Workspace for fictional patients only. Live access would require verified credentials, scope, multi-factor authentication and explicit assignment. There is no route from here into real enquiries.
      </DemoBanner>
      <Panel>
        <h2 className="font-serif text-2xl">Explore a role</h2>
        <p className="mt-2 text-base leading-relaxed">This switch does not approve your application and does not verify a registration.</p>
        <div className="mt-4 grid gap-3">
          <label className="flex min-h-12 items-center gap-3 rounded-[16px] border border-[#D7E3E8] px-4">
            <input type="radio" name="role" checked={state.exploreRole === "pending"} onChange={() => update({ exploreRole: "pending" })} />
            Pending verification
          </label>
          <label className="flex min-h-12 items-center gap-3 rounded-[16px] border border-[#D7E3E8] px-4">
            <input type="radio" name="role" checked={verified} onChange={() => update({ exploreRole: "verified" })} />
            Verified clinician with assigned fictional patients
          </label>
        </div>
      </Panel>

      {!verified ? (
        <Panel>
          <h2 className="font-serif text-2xl">Pending verification</h2>
          <p className="mt-2 text-base leading-relaxed">No fictional patients are shown. Record review, notes and the worklist stay unavailable in this view.</p>
        </Panel>
      ) : (
        <>
          <Panel>
            <h2 className="font-serif text-2xl">Worklist</h2>
            <ul className="mt-4 grid gap-3">
              {DEMO_CASES.map((item) => {
                const next = liveNext(item.id, state);
                return (
                  <li key={item.id} className="rounded-[16px] bg-[#EEF8FC] p-4">
                    <p className="font-semibold">{item.reference} · {item.title}</p>
                    <p className="mt-1 text-base">{item.person} · {item.stage}</p>
                    <p className="mt-1 text-base">Next: {next.action}</p>
                    <p className="text-base">Responsible: {next.owner}</p>
                    <button type="button" className={cn(secondaryBtn, "mt-3")} onClick={() => update({ activeCase: item.id })}>
                      Select {item.reference}
                    </button>
                  </li>
                );
              })}
            </ul>
            <Link href="/demo/clinician/record" className={cn(primaryBtn, "mt-4")}>Review the selected record</Link>
          </Panel>
          {overdue ? (
            <p role="status" className="rounded-[16px] border border-[#8d2f2f] bg-white px-4 py-3 text-base">
              Follow-up acknowledgement is overdue. Responsible role: reviewing clinician (demonstration).
            </p>
          ) : null}
          <FollowUpPanel audience="clinician" />
        </>
      )}
    </div>
  );
}
