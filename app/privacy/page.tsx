import type { Metadata } from "next";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <PageShell>
      <Article
        title="Privacy"
        lede="The enquiry asks only for the comparison. Procedure, wait and quote details can still reveal information about your health."
      >
        <p>
          The form stores your concern, the procedure you are considering, whether a clinician has discussed it, your nation and city or county, any wait or quote you choose to give, a timeframe, and your contact details. It does not ask for a medical history, NHS number or documents. There is no upload.
        </p>
        <p>
          The stated use is coordinator review of the enquiry. An Article 6 lawful basis, an Article 9 condition and a data protection impact assessment are not completed. Do not use this prototype for live clinical records. Special-category data needs both an Article 6 basis and an Article 9 condition, and overseas access needs its own assessment.
        </p>
        <p>
          Your case is visible to you with the access key, and to signed-in coordinators. It is not placed in the page address after the first acknowledgement. You can delete the enquiry, which removes the case and its proposals from the database. A short audit entry that the case was deleted can remain, without the clinical details.
        </p>
        <p>
          Staff sign-in for this validation build is a password and an audit log. Multi-factor authentication is required before any live clinical service. Preview and production data are not separated until separate database credentials are configured.
        </p>
        <p>
          <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/a-guide-to-lawful-basis/special-category-data/">
            ICO guidance on special category data
          </a>
        </p>
      </Article>
    </PageShell>
  );
}
