import type { Metadata } from "next";
import Link from "next/link";
import { PageCtaBand, PageHero, PageSection, PageShell, pageAction } from "@/components/site";
import { CostBenchmarkViz, CostStack } from "@/components/visuals/cost-stack";

export const metadata: Metadata = { title: "UK treatment costs" };

export default function CostsPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          title="When UK private care costs too much"
          lede="Whole India journey total beside your UK quote. Unknowns stay blank."
        />

        <PageSection className="border-b border-line bg-white">
          <CostStack />
        </PageSection>

        <PageSection className="cb-band-mist">
          <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
            Benchmarks are context
          </h2>
          <div className="mt-10">
            <CostBenchmarkViz />
          </div>
        </PageSection>

        <PageCtaBand>
          <p className="max-w-xl font-serif text-2xl leading-snug text-white md:text-3xl">
            Compare your UK quote with a full journey total.
          </p>
          <Link href="/enquire?concern=cost" className={pageAction}>
            Compare my options
          </Link>
        </PageCtaBand>
      </article>
    </PageShell>
  );
}
