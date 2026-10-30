import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageCard, PageShell, pageAction, secondaryCta } from "@/components/site";

export const metadata: Metadata = { title: "For clinicians" };

export default function ForCliniciansPage() {
  return (
    <PageShell>
      <Article
        title="For clinicians"
        lede="The clinician workspace is a demonstration. An application does not open a real patient record."
      >
        <PageCard>
          <p>
            In the demonstration, an application can be submitted, under review, or waiting for more
            information, and it can later be approved, declined, suspended, or expired.
          </p>
          <p className="mt-4">
            A verified fictional role can review assigned demonstration patients only. Notes stay in
            draft until that role signs them. Corrections are amendments.
          </p>
          <p className="mt-4">
            Live access would require verified credentials, a defined scope, multi-factor
            authentication and an explicit assignment. This prototype does not perform those checks and
            does not connect the demonstration to stored enquiries.
          </p>
        </PageCard>
        <div className="flex flex-wrap gap-3">
          <Link href="/register/clinician" className={pageAction}>
            Apply as a clinician
          </Link>
          <Link href="/demo/clinician" className={secondaryCta}>
            Open the clinician workspace
          </Link>
        </div>
      </Article>
    </PageShell>
  );
}
