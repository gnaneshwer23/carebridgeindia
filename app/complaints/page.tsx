import type { Metadata } from "next";
import Link from "next/link";
import { PageCtaBand, PageHero, PageSection, PageShell, pageAction } from "@/components/site";

export const metadata: Metadata = { title: "Complaints" };

export default function ComplaintsPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          title="Complaints"
          lede="A complaint about this prototype can be left on your case, or by starting an enquiry if you do not have one."
        />

        <PageSection className="border-b border-line bg-white">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
                How to raise one
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-deep/85">
                Write what happened, what you expected, and what you want done. A coordinator records it
                on the case. This prototype does not yet have a separate complaints team, an independent
                adjudicator, or a published response deadline beyond the date set on the case.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
                Clinical care later
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-deep/85">
                Complaints about clinical care, once a live provider exists, would go through the route
                agreed with that provider. No provider is approved for live cases now.
              </p>
            </div>
          </div>
        </PageSection>

        <PageCtaBand>
          <p className="max-w-xl font-serif text-2xl leading-snug text-white md:text-3xl">
            Start an enquiry if you need a case to attach a complaint to.
          </p>
          <Link href="/enquire" className={pageAction}>
            Compare my options
          </Link>
        </PageCtaBand>
      </article>
    </PageShell>
  );
}
