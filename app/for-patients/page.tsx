import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageCard, PageShell, pageAction, secondaryCta } from "@/components/site";

export const metadata: Metadata = { title: "For patients" };

export default function ForPatientsPage() {
  return (
    <PageShell>
      <Article
        title="For UK patients"
        lede="Send a real enquiry if you want a personalised wait and cost comparison. The demonstration uses fictional cases and does not open your record."
      >
        <PageCard>
          <p>
            A coordinator reviews a real enquiry from a UK adult. That review is not clinical
            acceptance, and nothing is booked from this site.
          </p>
          <p className="mt-4">
            The demonstration can show assessment tasks, preparation, and a follow-up that flags a
            concern for a named clinician role to acknowledge. Simulated agents prepare drafts and
            reminders. They do not diagnose, prescribe, decide fitness to travel, or close a clinical
            concern, and they do not run on a real enquiry.
          </p>
          <p className="mt-4">
            The care record in the demonstration is not a hospital record and it is not connected to
            the NHS. Creating a demonstration profile does not verify your identity.
          </p>
        </PageCard>
        <div className="flex flex-wrap gap-3">
          <Link href="/enquire" className={pageAction}>
            Compare my options
          </Link>
          <Link href="/register/patient" className={secondaryCta}>
            Start the patient demonstration
          </Link>
          <Link href="/demo/patient" className={secondaryCta}>
            Open the fictional dashboard
          </Link>
        </div>
      </Article>
    </PageShell>
  );
}
