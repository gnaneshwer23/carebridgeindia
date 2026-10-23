import Link from "next/link";
import { ExampleComparison } from "@/components/example-comparison";
import { buttonVariants } from "@/components/ui/button";
import { PageShell } from "@/components/site";
import { cn } from "@/lib/utils";

const steps = [
  ["Understand", "You", "Tell us whether time, cost, or both is the reason you are looking."],
  ["Review", "Coordinator", "A coordinator checks the enquiry. A clinician would still have to assess suitability."],
  ["Compare", "Provider", "You see itemised costs, what is unknown, and any confirmed treatment window."],
  ["Decide", "You", "Proceeding, pausing and stopping are all recorded. Nothing is booked from this site."],
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="bg-wash">
        <div className="mx-auto grid max-w-[75rem] items-center gap-10 px-5 py-12 md:grid-cols-[1.2fr_0.98fr] md:py-20">
          <div>
            <h1 className="max-w-xl text-4xl text-balance md:text-6xl">
              Long treatment wait? High private care costs?
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Explore planned treatment in India with clear costs, provider-confirmed availability and support through the next steps.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/enquire" className={cn(buttonVariants({ size: "lg" }), "h-12 px-5 text-base")}>
                Compare my options
              </Link>
              <a href="#example" className="text-base underline">
                See an example comparison
              </a>
            </div>
            <p className="mt-6 max-w-xl text-sm text-muted-foreground">
              A comparison is not a promise of a lower price, a sooner date, or that overseas treatment is suitable.
            </p>
          </div>
          <ExampleComparison />
        </div>
      </section>

      <section className="mx-auto grid max-w-[75rem] gap-6 px-5 py-12 md:grid-cols-2 md:py-20">
        <Link href="/enquire?concern=time" className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-2xl">My wait is too long</h2>
          <p className="mt-3 text-muted-foreground">
            A national waiting list cannot predict your date.
          </p>
        </Link>
        <Link href="/enquire?concern=cost" className="rounded-2xl border border-border bg-card p-6">
          <h2 className="text-2xl">My private quote is too expensive</h2>
          <p className="mt-3 text-muted-foreground">
            The comparison includes travel, stay, rehabilitation and the coordination fee.
          </p>
        </Link>
        <p className="md:col-span-2">
          <Link href="/enquire?concern=both" className="underline">
            Both apply
          </Link>
        </p>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[75rem] gap-6 px-5 py-12 md:grid-cols-4 md:py-20">
          <h2 className="text-3xl md:col-span-4">From the first question to recovery</h2>
          {steps.map(([title, owner, copy], index) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-sm text-muted-foreground">{`0${index + 1} · ${owner}`}</p>
              <h3 className="mt-2 text-2xl">{title}</h3>
              <p className="mt-2 text-muted-foreground">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-3xl gap-4 px-5 py-12 leading-7 md:py-20">
        <h2 className="text-3xl">What this pilot does not do</h2>
        <p>
          Hip and knee replacement are research candidates, not confirmed launch services. There is no hospital directory, no second-opinion marketplace, and no automated judgement of who is suitable to travel.
        </p>
        <p>
          Prices and dates are entered by a coordinator from provider material. They are not generated. Treatment payments, if a case ever proceeds, would be made to the clinical provider rather than held here.
        </p>
      </section>
    </PageShell>
  );
}
