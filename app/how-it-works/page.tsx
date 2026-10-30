import type { Metadata } from "next";
import Link from "next/link";
import { PageCtaBand, PageHero, PageSection, PageShell, pageAction } from "@/components/site";
import { HowSequence } from "@/components/visuals/how-sequence";

export const metadata: Metadata = { title: "How the comparison works" };

export default function HowPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          title="How it works"
          lede="Prepare → compare → decide. Short path. No booking on this site."
        />

        <PageSection className="bg-white">
          <HowSequence />
        </PageSection>

        <PageCtaBand>
          <p className="max-w-xl font-serif text-2xl leading-snug text-white md:text-3xl">
            Start with the concern that brought you here.
          </p>
          <Link href="/enquire" className={pageAction}>
            Compare my options
          </Link>
        </PageCtaBand>
      </article>
    </PageShell>
  );
}
