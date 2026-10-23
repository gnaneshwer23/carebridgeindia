import type { Metadata } from "next";
import { ClinicianApplication } from "@/components/demo/clinician";
import { PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Clinician application" };

export default function ClinicianRegisterPage() {
  return (
    <PageShell>
      <div className="mx-auto grid max-w-[1200px] gap-6 px-5 py-10 md:px-8 md:py-14">
        <h1 className="font-serif text-4xl md:text-5xl">Clinician application</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[#3a5560]">
          Sample details only. Submitting does not check a register and does not open a patient record.
        </p>
        <ClinicianApplication />
      </div>
    </PageShell>
  );
}
