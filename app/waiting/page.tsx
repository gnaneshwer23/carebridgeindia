import type { Metadata } from "next";
import Link from "next/link";
import { PageCtaBand, PageHero, PageSection, PageShell, pageAction } from "@/components/site";
import { WaitScaleViz, WaitTimeline } from "@/components/visuals/wait-timeline";

export const metadata: Metadata = { title: "NHS waiting time" };

export default function WaitingPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          tone="ink"
          title="When the NHS wait is the problem"
          lede="Your UK date or estimate beside a provider-confirmed India window. Labels stay honest."
        />

        <PageSection className="cb-band-soft border-b border-line">
          <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
            How dates are labelled
          </h2>
          <div className="mt-12">
            <WaitTimeline />
          </div>
        </PageSection>

        <PageSection className="cb-band-mist">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-14">
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
                National lists are context
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-deep/80">
                They do not say when your procedure would happen. Consultation ≠ treatment date.
              </p>
            </div>
            <WaitScaleViz />
          </div>
        </PageSection>

        <PageCtaBand>
          <p className="max-w-xl font-serif text-2xl leading-snug text-white md:text-3xl">
            Put your wait beside a provider-confirmed window.
          </p>
          <Link href="/enquire?concern=time" className={pageAction}>
            Compare my options
          </Link>
        </PageCtaBand>
      </article>
    </PageShell>
  );
}
