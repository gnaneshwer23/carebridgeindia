import type { Metadata } from "next";
import { Article, PageCard, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Terms" };

export default function TermsPage() {
  return (
    <PageShell>
      <Article
        title="Terms"
        lede="Sending an enquiry does not create a treatment contract, a booking, or a duty to find you a hospital."
      >
        <PageCard>
          <p>
            CareBridge India, as built here, stores an enquiry and lets a coordinator prepare a comparison. Figures come from what is entered. They can be incomplete, and a savings line is withheld when they are. Nothing on the public pages is a quote.
          </p>
          <p className="mt-4">
            You can pause, stop or delete an enquiry. Discussing whether to proceed does not authorise treatment or payment. Any later coordination fee would have to be disclosed before it is charged, and treatment charges would be paid to the clinical provider. No fee is collected in this release.
          </p>
          <p className="mt-4">
            The service is not an emergency service, is not part of the NHS, and does not decide whether you are fit to travel. If you need urgent care, use local emergency services.
          </p>
        </PageCard>
      </Article>
    </PageShell>
  );
}