import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageShell } from "@/components/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Compare treatment costs" };

export default function CostsPage() {
  return (
    <PageShell>
      <Article
        title="If the quote is the problem"
        lede="The comparison adds the journey, not just the procedure. A headline saving is shown only when the important costs are known, and it can show that India would cost more."
      >
        <p>
          PHIN’s March 2026 package-price collection reported London average package prices of £15,712 for a hip replacement and £15,689 for a knee replacement. PHIN describes those prices as indicative, and packages do not all include the same things. They are context, not your quote.
        </p>
        <p>
          An expected India total includes treatment, required tests, travel, accommodation, transfers, planned rehabilitation and aftercare, and any coordination fee. Your own UK quote is kept separate from a published benchmark. The benchmark’s source and date are shown, as is the exchange-rate date when a conversion is used.
        </p>
        <p>
          Unknown amounts stay “not supplied”. They are not converted to zero. Estimates do not cap what a complication could cost.
        </p>
        <Link href="/enquire?concern=cost" className={cn(buttonVariants(), "h-11 w-fit px-4")}>
          Compare my options
        </Link>
      </Article>
    </PageShell>
  );
}
