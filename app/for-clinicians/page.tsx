import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHero,
  PageSection,
  PageShell,
  pageAction,
  secondaryCta,
} from "@/components/site";

export const metadata: Metadata = { title: "For clinicians" };

const states = [
  "Submitted",
  "Under review",
  "Waiting for more information",
  "Approved, declined, suspended, or expired",
];

export default function ForCliniciansPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          title="For clinicians"
          lede="The clinician workspace is a demonstration. An application does not open a real patient record."
        />

        <PageSection className="border-b border-line bg-white">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              Application states in the demonstration
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-deep/80">
              Status is visible. Live clinical access is not.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {states.map((state) => (
              <li
                key={state}
                className="border-l-2 border-teal/40 py-1 pl-4 text-lg leading-relaxed text-deep"
              >
                {state}
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection className="cb-band-mist">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
                Verified roles, draft notes, amendments
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-deep/85">
                A verified fictional role can review assigned demonstration patients only. Notes stay in
                draft until that role signs them. Corrections are amendments.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-deep/85">
                Live access would require verified credentials, a defined scope, multi-factor
                authentication and an explicit assignment. This prototype does not perform those checks and
                does not connect the demonstration to stored enquiries.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/register/clinician" className={pageAction}>
                Apply as a clinician
              </Link>
              <Link href="/demo/clinician" className={secondaryCta}>
                Open the clinician workspace
              </Link>
            </div>
          </div>
        </PageSection>
      </article>
    </PageShell>
  );
}
