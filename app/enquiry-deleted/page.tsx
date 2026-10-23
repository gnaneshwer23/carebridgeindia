import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Enquiry deleted" };

export default function DeletedPage() {
  return (
    <PageShell>
      <Article
        title="The enquiry has been deleted"
        lede="The case and its proposals have been removed from the database."
      >
        <p>
          <Link href="/" className="underline">
            Return to the start
          </Link>
        </p>
      </Article>
    </PageShell>
  );
}
