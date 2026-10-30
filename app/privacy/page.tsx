import type { Metadata } from "next";
import { PageHero, PageSection, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Privacy" };

const sections = [
  {
    title: "What the form stores",
    copy: "The form stores your concern, the procedure you are considering, whether a clinician has discussed it, your nation and city or county, any wait or quote you choose to give, a timeframe, and your contact details. It does not ask for a medical history, NHS number or documents. There is no upload.",
  },
  {
    title: "Lawful basis status",
    copy: "The stated use is coordinator review of the enquiry. An Article 6 lawful basis, an Article 9 condition and a data protection impact assessment are not completed. Do not use this prototype for live clinical records. Special-category data needs both an Article 6 basis and an Article 9 condition, and overseas access needs its own assessment.",
  },
  {
    title: "Who can see a case",
    copy: "Your case is visible to you with the access key, and to signed-in coordinators. It is not placed in the page address after the first acknowledgement. You can delete the enquiry, which removes the case and its proposals from the database. A short audit entry that the case was deleted can remain, without the clinical details.",
  },
  {
    title: "Staff access",
    copy: "Staff sign-in for this validation build is a password and an audit log. Multi-factor authentication is required before any live clinical service. Preview and production data are not separated until separate database credentials are configured.",
  },
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          title="Privacy"
          lede="The enquiry asks only for the comparison. Procedure, wait and quote details can still reveal information about your health."
        />
        <PageSection className="border-b border-line bg-white" narrow>
          <div className="grid gap-12">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-line pt-8 first:border-0 first:pt-0">
                <h2 className="font-serif text-2xl tracking-tight text-deep md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-deep/85">{section.copy}</p>
              </section>
            ))}
          </div>
        </PageSection>
        <PageSection className="cb-band-mist" narrow>
          <a
            className="font-semibold text-teal underline underline-offset-2"
            href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/special-category-data/"
          >
            ICO guidance on special category data
          </a>
        </PageSection>
      </article>
    </PageShell>
  );
}
