import type { Metadata } from "next";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Initial treatment pathway" };

export default function PathwayPage() {
  return (
    <PageShell>
      <Article
        title="One procedure, after providers can price it"
        lede="Hip and knee replacement are the candidates for the first comparison. Neither is a service you can book here."
      >
        <p>
          The pilot starts with adults considering a primary hip or knee replacement, and only after written example proposals exist for the same procedure from at least two providers. Until then, the enquiry records interest. It does not confirm that a hospital, clinician or date is available.
        </p>
        <p>
          Cosmetic surgery, fertility care, transplants, emergency treatment and wellness trips are outside the service. A second opinion on its own is not a product.
        </p>
        <p>
          India recorded 507,244 medical-purpose foreign arrivals in 2025, below the 644,387 recorded in 2024. That history does not measure UK demand. This pilot is how that demand gets tested.
        </p>
        <p>
          <a href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2225423">
            Press Information Bureau release on medical-purpose arrivals
          </a>
        </p>
      </Article>
    </PageShell>
  );
}
