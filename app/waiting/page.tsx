import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageShell } from "@/components/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Reduce my waiting time" };

export default function WaitingPage() {
  return (
    <PageShell>
      <Article
        title="Understand whether an alternative date is available"
        lede="A provider-confirmed treatment window can be set beside a treatment date or estimate you already have. A national waiting list cannot become your personal date."
      >
        <ul className="grid gap-2">
          <li>Confirmed: a provider has named a treatment window, with a confirmation date and conditions.</li>
          <li>Estimate: a date or waiting period you were given, labelled as an estimate.</li>
          <li>Not supplied: no treatment date has been given. That is left blank. It is not treated as zero weeks.</li>
        </ul>
        <p>
          NHS England reported about 7.3 million outstanding treatment pathways in July 2026, including 111,379 waiting over 52 weeks. Those are pathways, not people, and they do not say when your procedure would happen.
        </p>
        <p>
          On the enquiry, say whether your timing is an appointment date, an estimate someone gave you, or your own assumption. A consultation date in India is shown separately and is not treated as a treatment date. There is no “weeks saved” figure.
        </p>
        <p>Clinical suitability and fitness to travel are not inferred from a shorter window.</p>
        <p>
          <a
            href="https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2026/09/Jul26-RTT-statistical-press-notice-PDF-578K-97ylx5.pdf"
          >
            NHS England referral-to-treatment statistics, July 2026
          </a>
        </p>
        <Link href="/enquire?concern=time" className={cn(buttonVariants(), "h-11 w-fit px-4")}>
          Compare my options
        </Link>
      </Article>
    </PageShell>
  );
}
