import type { Metadata } from "next";
import { PageHero, PageSection, PageShell } from "@/components/site";

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
      <article>
        <PageHero
          title="Care standards"
          lede="No provider is approved for live cases in this prototype. For UK adults comparing India care, accreditation — where it is later recorded — is not a guarantee of your outcome."
        />

        <PageSection className="border-b border-line bg-white">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              What a live pathway would check
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-deep/80">
              These are gates for a live service, not badges on this website.
            </p>
          </div>
          <ol className="mt-12 grid gap-6 md:grid-cols-2">
            {checks.map((item, index) => (
              <li key={item} className="flex gap-4 border-t border-line pt-5">
                <span className="font-serif text-2xl leading-none text-teal/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-lg leading-relaxed text-deep">{item}</p>
              </li>
            ))}
          </ol>
        </PageSection>

        <PageSection className="cb-band-mist">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              NHS guidance remains the patient checklist
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-deep/85">
              NHS guidance on treatment abroad asks people to check qualifications, complications,
              aftercare, recovery time, insurance and the full cost. Those checks are the gate for a live
              pathway, not a badge on this website.
            </p>
            <p className="mt-6">
              <a
                className="font-semibold text-teal underline underline-offset-2"
                href="https://www.nhs.uk/using-the-nhs/healthcare-abroad/going-abroad-for-treatment/treatment-abroad-checklist/"
              >
                NHS treatment abroad checklist
              </a>
            </p>
          </div>
        </PageSection>
      </article>
    </PageShell>
  );
}
