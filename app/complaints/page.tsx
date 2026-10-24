import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageCard, PageShell, pageAction } from "@/components/site";

export const metadata: Metadata = { title: "Complaints" };

export default function ComplaintsPage() {
  return (
    <PageShell>
      <Article
        title="Complaints"
        lede="A complaint about this prototype can be left on your case, or by starting an enquiry if you do not have one."
      >
        <PageCard>
          <p>
            Write what happened, what you expected, and what you want done. A coordinator records it on the case. This prototype does not yet have a separate complaints team, an independent adjudicator, or a published response deadline beyond the date set on the case.
          </p>
          <p className="mt-4">
            Complaints about clinical care, once a live provider exists, would go through the route agreed with that provider. No provider is approved for live cases now.
          </p>
        </PageCard>
        <Link href="/enquire" className={pageAction}>
          Compare my options
        </Link>
      </Article>
    </PageShell>
  );
}
