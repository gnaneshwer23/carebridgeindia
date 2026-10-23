"use client";

import Link from "next/link";
import { useDemo } from "@/components/demo/provider";
import { DemoBanner, Panel, secondaryBtn } from "@/components/demo/ui";
import { primaryBtn } from "@/components/demo/ui";

const links = [
  ["/register/patient", "Patient onboarding"],
  ["/demo/patient", "Patient dashboard"],
  ["/register/clinician", "Clinician application"],
  ["/demo/clinician", "Clinician workspace"],
  ["/demo/coordinator", "Coordinator demonstration"],
  ["/demo/follow-up", "Follow-up and simulated call"],
];

export default function DemoHomePage() {
  const { reset } = useDemo();
  return (
    <div className="grid gap-6">
      <DemoBanner>
        Four fictional cases run from comparison through assessment, a care record and recovery. They are not inserted into the enquiry database.
      </DemoBanner>
      <h1 className="font-serif text-4xl md:text-5xl">Explore the demonstration</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <Panel>
          <h2 className="font-serif text-2xl">A · Long wait</h2>
          <p className="mt-2 text-base leading-relaxed">An estimated UK wait, a conditional India treatment window, and assessment tasks. The consultation is kept separate from the treatment window.</p>
        </Panel>
        <Panel>
          <h2 className="font-serif text-2xl">B · Expensive quote</h2>
          <p className="mt-2 text-base leading-relaxed">A UK quote beside an itemised India journey. Version 1 withholds a savings line because rehabilitation is missing. Version 2 is complete and the India total is higher.</p>
        </Panel>
        <Panel>
          <h2 className="font-serif text-2xl">C · Record conflict</h2>
          <p className="mt-2 text-base leading-relaxed">Two sources disagree about a medicine. The record agent flags it. A clinician can sign a note and add an amendment without erasing the earlier text.</p>
        </Panel>
        <Panel>
          <h2 className="font-serif text-2xl">D · Recovery concern</h2>
          <p className="mt-2 text-base leading-relaxed">A follow-up answer flags a concern. It waits in the clinician queue until the named role acknowledges it and records a response.</p>
        </Panel>
      </div>
      <div className="flex flex-wrap gap-3">
        {links.map(([href, label]) => (
          <Link key={href} href={href} className={primaryBtn}>{label}</Link>
        ))}
        <button type="button" className={secondaryBtn} onClick={reset}>Reset demonstration</button>
      </div>
      <p className="text-base leading-relaxed">
        A real comparison still starts at <Link href="/enquire" className="underline">Compare my options</Link>. That form is stored for coordinator review. This demonstration is not.
      </p>
    </div>
  );
}
