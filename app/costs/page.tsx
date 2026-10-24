import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageCard, PageShell, pageAction } from "@/components/site";

export const metadata: Metadata = { title: "Compare treatment costs" };

export default function CostsPage() {
  return (
    <PageShell>
      <Article
        title="Treatment costs"
        lede="The comparison adds the journey, not only the procedure. A lower total is shown only when the important costs are known, and it can show that India would cost more."
      >
        <PageCard>
          <p>
            An expected India total includes treatment, required tests, travel, accommodation, transfers, planned rehabilitation and aftercare, and any coordination fee.
          </p>
          <p className="mt-4">
            Unknown amounts stay “not supplied”. They are not converted to zero. Estimates do not cap what a complication could cost.
          </p>
          <p className="mt-4">
            Your own UK quote, when you have one, is kept separate from a published benchmark. PHIN’s March 2026 package-price collection reported London average package prices of £15,712 for a hip replacement and £15,689 for a knee replacement. PHIN describes those prices as indicative, and packages do not all include the same things. They are context, not your quote. The benchmark’s source and date are shown on a real proposal, as is the exchange-rate date when a conversion is used.
          </p>
        </PageCard>
        <Link href="/enquire?concern=cost" className={pageAction}>
          Compare my options
        </Link>
      </Article>
    </PageShell>
  );
}
