import type { Metadata } from "next";
import { Article, PageCard, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Provider standards" };

const checks = [
  "Hospital registration and the accreditation actually held.",
  "The clinician’s registration and identity.",
  "A defined procedure, with acceptance and exclusion criteria.",
  "A proposal template covering itemised costs, deposits, cancellation and extra charges.",
  "Named responsibilities for complications, recovery and complaints.",
  "An agreed way to share your information, reviewed before any records move.",
];

export default function StandardsPage() {
  return (
    <PageShell>
      <Article
        title="Care standards"
        lede="No provider is approved for live cases in this prototype. Accreditation, where it is later recorded, is not a guarantee of your outcome."
      >
        <PageCard>
          <ul className="grid gap-4">
            {checks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6">
            NHS guidance on treatment abroad asks people to check qualifications, complications, aftercare, recovery time, insurance and the full cost. Those checks are the gate for a live pathway, not a badge on this website.
          </p>
          <p className="mt-4">
            <a href="https://www.nhs.uk/using-the-nhs/healthcare-abroad/going-abroad-for-treatment/treatment-abroad-checklist/">
              NHS treatment abroad checklist
            </a>
          </p>
        </PageCard>
      </Article>
    </PageShell>
  );
}
