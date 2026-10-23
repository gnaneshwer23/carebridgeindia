import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageShell } from "@/components/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Proposed clinician platform" };

export default function ForCliniciansPage() {
  return (
    <PageShell>
      <Article
        title="Apply as a clinician"
        lede="A self-declared role does not grant access to patients. This demonstration ends at pending verification."
      >
        <ul className="grid gap-2">
          <li>Eligible roles would be checked against the relevant professional register.</li>
          <li>Access would be limited to explicitly assigned patients.</li>
          <li>Notes would stay in draft until a named clinician signed them.</li>
          <li>Multi-factor authentication would be required before any real activation.</li>
        </ul>
        <article className="rounded-2xl border border-border bg-card p-4">
          <h2 className="text-xl">Work queue</h2>
          <p className="mt-1 text-muted-foreground">
            No patients are assigned. Search and clinical records stay unavailable until a reviewer approves a scope. That reviewer workflow is not live.
          </p>
        </article>
        <div className="flex flex-wrap gap-4">
          <Link href="/register/clinician" className={cn(buttonVariants(), "h-12 px-5")}>
            Apply as a clinician
          </Link>
          <Link href="/for-patients" className="self-center underline">
            Proposed patient journey
          </Link>
        </div>
      </Article>
    </PageShell>
  );
}
