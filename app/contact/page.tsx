import type { Metadata } from "next";
import Link from "next/link";
import {
  PageHero,
  PageSection,
  PageShell,
  pageAction,
  secondaryCta,
} from "@/components/site";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Help and contact" };

export default function ContactPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          title="Help and contact"
          lede="Send an enquiry if you want a personalised UK–India comparison, or message us on WhatsApp. This is not an emergency service and cannot book treatment."
        />

        <PageSection className="border-b border-line bg-white">
          <div className="grid gap-8 md:grid-cols-2">
            <Link
              href="/enquire"
              className="group block rounded-[1.75rem] border border-line bg-paper/80 p-7 transition-[transform,border-color,background-color] duration-200 ease-out hover:border-teal/40 hover:bg-mist active:scale-[0.99] md:p-9"
            >
              <p className="font-serif text-3xl tracking-tight text-deep">Compare my options</p>
              <p className="mt-3 text-base leading-relaxed text-deep/80">
                Start a personalised enquiry. Keep the reference and access key that follow, or open an
                existing case from your access page.
              </p>
              <span className="mt-6 inline-block text-sm font-semibold text-teal group-hover:text-teal-deep">
                Open the form
              </span>
            </Link>
            <a
              href={whatsappHref("Hello CareBridge — I’d like help with a UK–India comparison.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-[1.75rem] border border-line bg-paper/80 p-7 transition-[transform,border-color,background-color] duration-200 ease-out hover:border-teal/40 hover:bg-mist active:scale-[0.99] md:p-9"
            >
              <p className="font-serif text-3xl tracking-tight text-deep">WhatsApp</p>
              <p className="mt-3 text-base leading-relaxed text-deep/80">
                Prefer a conversation? Message CareBridge at {WHATSAPP_DISPLAY}. The site assistant can
                also point you to how-it-works, waits, and costs — without inventing prices or clinical
                advice.
              </p>
              <span className="mt-6 inline-block text-sm font-semibold text-teal group-hover:text-teal-deep">
                Message {WHATSAPP_DISPLAY}
              </span>
            </a>
          </div>
        </PageSection>

        <PageSection className="cb-band-mist">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              Complaints and emergencies
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-deep/85">
              For a complaint about how an enquiry was handled, use the{" "}
              <Link href="/complaints" className="font-semibold text-teal underline underline-offset-2">
                complaints page
              </Link>
              . For urgent medical help in the UK, use NHS 111 or local emergency services. Do not send
              medical records by email.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/enquire" className={pageAction}>
                Compare my options
              </Link>
              <Link href="/access" className={secondaryCta}>
                Open your access page
              </Link>
            </div>
          </div>
        </PageSection>
      </article>
    </PageShell>
  );
}
