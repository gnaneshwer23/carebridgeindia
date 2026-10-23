import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <PageShell>
      <Article
        title="Contact"
        lede="Send an enquiry if you want a comparison. This address is not an emergency service and cannot book treatment."
      >
        <p>
          Use <Link href="/enquire" className="underline">Compare my options</Link> and keep the reference and access key that follow. If you already have them, open the case from <Link href="/access" className="underline">your access page</Link>.
        </p>
        <p>
          For a complaint about how an enquiry was handled, use the <Link href="/complaints" className="underline">complaints page</Link>. For urgent medical help, use local emergency services. Do not send medical records by email.
        </p>
      </Article>
    </PageShell>
  );
}
