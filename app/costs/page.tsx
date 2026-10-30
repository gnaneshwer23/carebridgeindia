import type { Metadata } from "next";
import Link from "next/link";
import { PageCtaBand, PageHero, PageSection, PageShell, pageAction } from "@/components/site";

export const metadata: Metadata = { title: "UK treatment costs" };

const journey = [
  "Treatment and required tests",
  "Travel and accommodation",
  "Transfers and planned rehabilitation",
  "Agreed aftercare and any coordination fee",
];

export default function CostsPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          title="When UK private care costs too much"
          lede="The comparison adds the whole India journey, not only the procedure. A lower total is shown only when the important costs are known — and it can show that India would cost more."
        />

        <PageSection className="border-b border-line bg-white">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
                What the India total includes
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-deep/80">
                An expected India total sits beside your UK private quote when you have one. Unknown
                amounts stay “not supplied”. They are not converted to zero.
              </p>
            </div>
            <ol className="grid gap-5">
              {journey.map((item, index) => (
                <li
                  key={item}
                  className="flex items-start gap-4 border-b border-line/80 pb-5 last:border-0 last:pb-0"
                >
                  <span className="font-serif text-3xl leading-none text-teal/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="pt-1 text-lg leading-relaxed text-deep">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </PageSection>

        <PageSection className="cb-band-mist">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              Benchmarks are context, not your quote
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-deep/85">
              Estimates do not cap what a complication could cost. Incomplete savings are withheld. Your
              own UK quote is kept separate from a published benchmark.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-deep/85">
              PHIN’s March 2026 package-price collection reported London average package prices of £15,712
              for a hip replacement and £15,689 for a knee replacement. PHIN describes those prices as
              indicative, and packages do not all include the same things. The benchmark’s source and date
              are shown on a real proposal, as is the exchange-rate date when a conversion is used.
            </p>
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
