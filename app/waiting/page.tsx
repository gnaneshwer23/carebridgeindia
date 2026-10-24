import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageCard, PageShell, pageAction } from "@/components/site";

export const metadata: Metadata = { title: "Reduce my waiting time" };

export default function WaitingPage() {
  return (
    <PageShell>
      <Article
        title="Waiting time"
        lede="A provider-confirmed treatment window can sit beside a date you already have. A national waiting list is not your date."
      >
        <PageCard>
          <dl className="grid gap-6">
            <div>
              <dt className="font-semibold">Confirmed</dt>
              <dd className="mt-1">A provider has named a treatment window, with a confirmation date and conditions.</dd>
            </div>
            <div>
              <dt className="font-semibold">Estimate</dt>
              <dd className="mt-1">A date or waiting period you were given, labelled as an estimate.</dd>
            </div>
            <div>
              <dt className="font-semibold">Not supplied</dt>
              <dd className="mt-1">No treatment date has been given. That stays blank. It is not treated as zero weeks.</dd>
            </div>
          </dl>
          <p className="mt-6">
            NHS England reported about 7.3 million outstanding treatment pathways in July 2026, including 111,379 waiting over 52 weeks. Those are pathways, not people, and they do not say when your procedure would happen.
          </p>
          <p className="mt-4">
            A consultation date in India is shown separately and is not a treatment date. There is no “weeks saved” figure. Clinical suitability and fitness to travel are not inferred from a shorter window.
          </p>
          <p className="mt-4">
            <a href="https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2026/09/Jul26-RTT-statistical-press-notice-PDF-578K-97ylx5.pdf">
              NHS England referral-to-treatment statistics, July 2026
            </a>
          </p>
        </PageCard>
        <Link href="/enquire?concern=time" className={pageAction}>
          Compare my options
        </Link>
      </Article>
    </PageShell>
  );
}
