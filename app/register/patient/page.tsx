import type { Metadata } from "next";
import { PatientOnboarding } from "@/components/demo/onboarding";
import { PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Patient demonstration" };

export default function PatientRegisterPage() {
  return (
    <PageShell>
      <div className="mx-auto grid max-w-[1200px] gap-6 px-5 py-10 md:px-8 md:py-14">
        <h1 className="font-serif text-4xl md:text-5xl">Patient demonstration</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-[#3a5560]">
          A short sequence into the fictional dashboard. Procedure is not pre-selected. Not sure is available.
        </p>
        <PatientOnboarding />
      </div>
    </PageShell>
  );
}
