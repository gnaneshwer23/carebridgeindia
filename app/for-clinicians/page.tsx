import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageShell } from "@/components/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "For clinicians" };

const primary = cn(buttonVariants(), "h-12 w-fit rounded-[16px] px-5 text-base");

export default function ForCliniciansPage() {
  return (
    <PageShell>
      <Article
        title="For clinicians"
        lede="Apply in the demonstration, then explore a fictional worklist. An application never opens a real patient record."
      >
        <ul className="grid gap-3 md:grid-cols-2">
          {[
            "Submitted, under review, or more information needed.",
            "Approved, declined, suspended, or expired.",
            "A verified fictional role can review assigned demonstration patients only.",
            "Notes stay in draft until a clinician signs them. Corrections are amendments.",
          ].map((item) => (
            <li key={item} className="rounded-[16px] border border-[#D7E3E8] bg-white p-4">{item}</li>
          ))}
        </ul>
        <p>
          Live access would require verified credentials, a defined scope, multi-factor authentication and an explicit assignment. This prototype does not perform those checks and does not connect the demonstration to stored enquiries.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/register/clinician" className={primary}>Apply as a clinician</Link>
          <Link href="/demo/clinician" className={primary}>Open the clinician workspace</Link>
        </div>
      </Article>
    </PageShell>
  );
}
