import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageCard, PageShell, pageAction } from "@/components/site";

export const metadata: Metadata = { title: "Help and contact" };

export default function ContactPage() {
  return (
    <PageShell>
      <Article
        title="Help and contact"
        lede="Send an enquiry if you want a comparison. This address is not an emergency service and cannot book treatment."
      >
        <PageCard>
          <p>
            Use <Link href="/enquire">Compare my options</Link> and keep the reference and access key that follow. If you already have them, open the case from <Link href="/access">your access page</Link>.
          </p>
          <p className="mt-4">
            For a complaint about how an enquiry was handled, use the <Link href="/complaints">complaints page</Link>. For urgent medical help, use local emergency services. Do not send medical records by email.
          </p>
        </PageCard>
        <Link href="/enquire" className={pageAction}>
          Compare my options
        </Link>
      </Article>
    </PageShell>
  );
}
