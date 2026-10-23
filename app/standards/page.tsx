import type { Metadata } from "next";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Provider standards" };

export default function StandardsPage() {
  return (
    <PageShell>
      <Article
        title="What has to be true before a provider receives a live case"
        lede="No provider is approved for live cases in this prototype. Accreditation, where it is later recorded, is not a guarantee of your outcome."
      >
        <ul className="grid list-disc gap-2 pl-5">
          <li>Hospital registration and the accreditation actually held.</li>
          <li>The clinician’s registration and identity.</li>
          <li>A defined procedure, with acceptance and exclusion criteria.</li>
          <li>A proposal template covering itemised costs, deposits, cancellation and extra charges.</li>
          <li>Named responsibilities for complications, recovery and complaints.</li>
          <li>An agreed way to share your information, reviewed before any records move.</li>
        </ul>
        <p>
          NHS guidance on treatment abroad asks people to check qualifications, complications, aftercare, recovery time, insurance and the full cost. Those checks are the gate for a live pathway, not a badge on this website.
        </p>
        <p>
          <a href="https://www.nhs.uk/using-the-nhs/healthcare-abroad/going-abroad-for-treatment/treatment-abroad-checklist/">
            NHS treatment abroad checklist
          </a>
        </p>
      </Article>
    </PageShell>
  );
}
