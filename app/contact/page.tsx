import type { Metadata } from "next";
import Link from "next/link";
import { Article, PageCard, PageShell, pageAction, secondaryCta } from "@/components/site";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Help and contact" };

export default function ContactPage() {
  return (
    <PageShell>
      <Article
        title="Help and contact"
        lede="Send an enquiry if you want a personalised UK–India comparison, or message us on WhatsApp. This is not an emergency service and cannot book treatment."
      >
        <PageCard>
          <p>
            Use <Link href="/enquire">Compare my options</Link> and keep the reference and access key
            that follow. If you already have them, open the case from{" "}
            <Link href="/access">your access page</Link>.
          </p>
          <p className="mt-4">
            Prefer a conversation? WhatsApp CareBridge at{" "}
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
              {WHATSAPP_DISPLAY}
            </a>
            . The site assistant (text or voice) can also point you to how-it-works, waits, and costs —
            without inventing prices or clinical advice.
          </p>
          <p className="mt-4">
            For a complaint about how an enquiry was handled, use the{" "}
            <Link href="/complaints">complaints page</Link>. For urgent medical help in the UK, use NHS
            111 or local emergency services. Do not send medical records by email.
          </p>
        </PageCard>
        <div className="flex flex-wrap gap-3">
          <Link href="/enquire" className={pageAction}>
            Compare my options
          </Link>
          <a
            href={whatsappHref("Hello CareBridge — I’d like help with a UK–India comparison.")}
            target="_blank"
            rel="noopener noreferrer"
            className={secondaryCta}
          >
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
        </div>
      </Article>
    </PageShell>
  );
}
