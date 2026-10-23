import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageShell } from "@/components/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "For patients" };

const primary = cn(buttonVariants(), "h-12 w-fit rounded-[16px] px-5 text-base");

export default function ForPatientsPage() {
  return (
    <PageShell>
      <Article
        title="For patients"
        lede="The service helps you compare planned treatment in India when a wait is long or a private quote is high. The demonstration shows how a case could continue through assessment, preparation and recovery."
      >
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["Compare", "Send a real enquiry. A coordinator reviews it. That is not clinical acceptance."],
            ["Assessment", "In the demonstration, a named clinician role reviews fictional records."],
            ["Preparation", "Tasks name who does what. Nothing is booked from the website."],
            ["Follow-up", "A questionnaire can flag a concern for a clinician to acknowledge."],
          ].map(([title, copy]) => (
            <article key={title} className="rounded-[16px] border border-[#D7E3E8] bg-white p-4">
              <h2 className="font-serif text-xl">{title}</h2>
              <p className="mt-1">{copy}</p>
            </article>
          ))}
        </div>
        <p>
          Simulated agents prepare drafts and reminders. They do not diagnose, prescribe, decide fitness to travel, or close a clinical concern. A named clinician role owns those decisions in the demonstration. They do not run on a real enquiry.
        </p>
        <p>
          The care record in the demonstration is not a hospital record and it is not connected to the NHS. Creating a demonstration profile does not verify your identity.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/register/patient" className={primary}>Start the patient demonstration</Link>
          <Link href="/demo/patient" className={primary}>Open the fictional dashboard</Link>
          <Link href="/enquire" className="self-center underline">Compare my options</Link>
        </div>
      </Article>
    </PageShell>
  );
}
