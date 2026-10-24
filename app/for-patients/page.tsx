import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageCard, PageShell, pageAction } from "@/components/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "For patients" };

const secondary = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "h-12 w-fit rounded-[16px] border-[#D7E3E8] bg-white px-5 text-base font-semibold text-[#12333D]",
);

export default function ForPatientsPage() {
  return (
    <PageShell>
      <Article
        title="For patients"
        lede="Send a real enquiry if you want a comparison. The demonstration uses fictional cases and does not open your record."
      >
        <PageCard>
          <p>
            A coordinator reviews a real enquiry. That review is not clinical acceptance, and nothing is booked from this site.
          </p>
          <p className="mt-4">
            The demonstration can show assessment tasks, preparation, and a follow-up that flags a concern for a named clinician role to acknowledge. Simulated agents prepare drafts and reminders. They do not diagnose, prescribe, decide fitness to travel, or close a clinical concern, and they do not run on a real enquiry.
          </p>
          <p className="mt-4">
            The care record in the demonstration is not a hospital record and it is not connected to the NHS. Creating a demonstration profile does not verify your identity.
          </p>
        </PageCard>
        <div className="flex flex-wrap gap-3">
          <Link href="/enquire" className={pageAction}>Compare my options</Link>
          <Link href="/register/patient" className={secondary}>Start the patient demonstration</Link>
          <Link href="/demo/patient" className={secondary}>Open the fictional dashboard</Link>
        </div>
      </Article>
    </PageShell>
  );
}
