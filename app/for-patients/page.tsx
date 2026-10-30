import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHero,
  PageSection,
  PageShell,
  pageAction,
  secondaryCta,
} from "@/components/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "For patients" };

export default function ForPatientsPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          tone="ink"
          title="For UK patients"
          lede="Send a real enquiry if you want a personalised wait and cost comparison. The demonstration uses fictional cases and does not open your record."
        />

        <PageSection className="cb-band-soft border-b border-line">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              A real enquiry, reviewed by a coordinator
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-deep/85">
              A coordinator reviews a real enquiry from a UK adult. That review is not clinical
              acceptance, and nothing is booked from this site.
            </p>
            <Link href="/enquire" className={cn(pageAction, "mt-8")}>
              Compare my options
            </Link>
          </div>
        </PageSection>

        <PageSection className="cb-band-mist">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
                What the demonstration shows
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-deep/85">
                The demonstration can show assessment tasks, preparation, and a follow-up that flags a
                concern for a named clinician role to acknowledge. Simulated agents prepare drafts and
                reminders. They do not diagnose, prescribe, decide fitness to travel, or close a clinical
                concern, and they do not run on a real enquiry.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-deep/85">
                The care record in the demonstration is not a hospital record and it is not connected to
                the NHS. Creating a demonstration profile does not verify your identity.
              </p>
            </div>
            <div className="flex flex-col justify-end gap-3">
              <Link href="/register/patient" className={secondaryCta}>
                Start the patient demonstration
              </Link>
              <Link href="/demo/patient" className={secondaryCta}>
                Open the fictional dashboard
              </Link>
            </div>
          </div>
        </PageSection>
      </article>
    </PageShell>
  );
}
