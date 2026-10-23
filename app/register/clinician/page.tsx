import type { Metadata } from "next";
import { SyntheticRegistration } from "@/components/synthetic-registration";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Clinician application demonstration" };

export default function ClinicianRegisterPage() {
  return (
    <PageShell>
      <Article
        title="Clinician application"
        lede="Demonstration only. Submitting it does not start a credential check or open any patient record."
      >
        <SyntheticRegistration
          steps={[
            {
              title: "Identity",
              fields: [
                { id: "name", label: "Name", hint: "Use a sample name." },
                { id: "organisation", label: "Organisation" },
              ],
            },
            {
              title: "Professional details",
              fields: [
                { id: "body", label: "Registration body" },
                { id: "number", label: "Registration number", hint: "Use a sample number. It is not checked." },
                { id: "specialty", label: "Specialty" },
              ],
            },
          ]}
          resultTitle="Pending verification"
          resultBody="This demonstration was not saved. Status would be Pending verification. Patient search and clinical records stay unavailable. A real application would need a reviewer, evidence, and multi-factor authentication before any access."
        />
      </Article>
    </PageShell>
  );
}
