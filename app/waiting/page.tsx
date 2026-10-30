import type { Metadata } from "next";
import Link from "next/link";
import { PageCtaBand, PageHero, PageSection, PageShell, pageAction } from "@/components/site";

export const metadata: Metadata = { title: "NHS waiting time" };

const labels = [
  {
    title: "Confirmed",
    copy: "A provider has named a treatment window, with a confirmation date and conditions.",
  },
  {
    title: "Estimate",
    copy: "A date or waiting period you were given in the UK, labelled as an estimate.",
  },
  {
    title: "Not supplied",
    copy: "No treatment date has been given. That stays blank. It is not treated as zero weeks.",
  },
];

export default function WaitingPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          tone="ink"
          title="When the NHS wait is the problem"
          lede="A provider-confirmed treatment window in India can sit beside the date or estimate you already have in the UK. A national waiting list is not your date."
        />

        <PageSection className="cb-band-soft border-b border-line">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              How dates are labelled
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-deep/80">
              The comparison keeps your UK picture honest. Nothing is filled in for you.
            </p>
          </div>
          <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {labels.map((item) => (
              <li key={item.title} className="border-t border-teal/30 pt-5">
                <h3 className="font-serif text-2xl text-deep">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-deep/80">{item.copy}</p>
              </li>
            ))}
          </ul>
        </PageSection>

        <PageSection className="cb-band-mist">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
                National lists are context, not your appointment
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-deep/85">
                NHS England reported about 7.3 million outstanding treatment pathways in July 2026,
                including 111,379 waiting over 52 weeks. Those are pathways, not people, and they do not
                say when your procedure would happen.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-deep/85">
                A consultation date in India is shown separately and is not a treatment date. There is no
                “weeks saved” figure. Clinical suitability and fitness to travel are not inferred from a
                shorter window.
              </p>
            </div>
            <p className="border-l-2 border-teal/40 pl-5 text-base leading-relaxed text-deep/75">
              <a
                className="font-semibold text-teal underline underline-offset-2"
                href="https://www.england.nhs.uk/statistics/wp-content/uploads/sites/2/2026/09/Jul26-RTT-statistical-press-notice-PDF-578K-97ylx5.pdf"
              >
                NHS England referral-to-treatment statistics, July 2026
              </a>
            </p>
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
