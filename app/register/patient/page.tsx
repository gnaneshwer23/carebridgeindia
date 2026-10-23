import type { Metadata } from "next";
import { SyntheticRegistration } from "@/components/synthetic-registration";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Patient account demonstration" };

export default function PatientRegisterPage() {
  return (
    <PageShell>
      <Article
        title="Create a patient account"
        lede="Demonstration of the proposed registration sequence. No account, care record, or clinical acceptance is created."
      >
        <SyntheticRegistration
          steps={[
            {
              title: "Account",
              fields: [
                { id: "email", label: "Email", hint: "Use a sample address such as patient@example.com." },
              ],
            },
            {
              title: "Eligibility",
              fields: [
                { id: "adult", label: "Confirm you are illustrating an adult patient", hint: "Type “adult”. This does not verify identity." },
              ],
            },
            {
              title: "Contact preferences",
              fields: [
                { id: "language", label: "Preferred language" },
                { id: "timezone", label: "Timezone", hint: "For example, Europe/London." },
              ],
            },
          ]}
          resultTitle="Demonstration complete"
          resultBody="No account was created and nothing was stored. Registration in this prototype is not clinical acceptance, and there is no care record to open."
        />
      </Article>
    </PageShell>
  );
}
