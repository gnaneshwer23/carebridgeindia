import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PageShell } from "@/components/site";
import { cn } from "@/lib/utils";

export default function HomePage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.15fr_0.85fr] md:py-20">
        <div>
          <h1 className="max-w-xl text-5xl text-balance md:text-6xl">
            Long treatment wait? High private care costs?
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Explore planned treatment in India with clear costs, provider-confirmed availability and support through the next steps.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/enquire" className={cn(buttonVariants({ size: "lg" }), "h-12 px-5 text-base")}>
              Compare my options
            </Link>
            <Link href="/how-it-works" className="text-base underline">
              How the comparison works
            </Link>
          </div>
          <p className="mt-6 max-w-xl text-sm text-muted-foreground">
            A comparison is not a promise of a lower price, a sooner date, or that overseas treatment is suitable.
          </p>
        </div>
        <figure
          aria-label="A diagram linking the United Kingdom and India"
          className="relative flex min-h-80 items-center justify-center overflow-hidden rounded-t-[9rem] rounded-b-xl bg-[#dce6d8]"
        >
          <div className="size-64 rounded-full border border-[#8eaa90]" />
          <div className="absolute size-44 rounded-full border border-[#a9c0a6]" />
          <p className="absolute font-serif text-7xl text-[#275a49]">⌒</p>
          <p className="absolute left-6 top-10 font-serif text-sm">United Kingdom</p>
          <p className="absolute bottom-24 right-6 font-serif text-sm">India</p>
          <figcaption className="absolute bottom-4 rounded-lg bg-background px-4 py-3 text-sm">
            Your comparison, from the first question through recovery.
          </figcaption>
        </figure>
      </section>

      <section className="border-y border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
          <div>
            <h2 className="text-2xl">Could suitable treatment happen sooner?</h2>
            <p className="mt-3 text-muted-foreground">
              A national waiting list cannot predict your date. The comparison uses a date or estimate you supply, beside a provider-confirmed treatment window.
            </p>
            <Link href="/waiting" className="mt-4 inline-block underline">
              If the wait is the problem
            </Link>
          </div>
          <div>
            <h2 className="text-2xl">What would the whole journey cost?</h2>
            <p className="mt-3 text-muted-foreground">
              Treatment, travel, accommodation, rehabilitation and the coordination fee are shown separately. Missing prices stay marked “not supplied”.
            </p>
            <Link href="/costs" className="mt-4 inline-block underline">
              If the quote is the problem
            </Link>
          </div>
          <div>
            <h2 className="text-2xl">What if the plan changes?</h2>
            <p className="mt-3 text-muted-foreground">
              Each proposal has an expiry, exclusions and named responsibilities for complications and follow-up. You can pause or stop without pressure.
            </p>
            <Link href="/aftercare" className="mt-4 inline-block underline">
              Recovery and aftercare
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-pine text-background">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-4">
          <h2 className="text-3xl md:col-span-4">From the first question to recovery</h2>
          {[
            ["Understand", "Tell us whether time, cost, or both is the reason you are looking."],
            ["Review", "A coordinator checks the enquiry. A clinician would still have to assess suitability."],
            ["Compare", "You see itemised costs, what is unknown, and any confirmed treatment window."],
            ["Decide", "Proceeding, pausing and stopping are all recorded. Nothing is booked from this site."],
          ].map(([title, copy], index) => (
            <article key={title} className="border-t border-white/30 pt-4">
              <p className="text-sm text-[#d7e4dc]">0{index + 1}</p>
              <h3 className="mt-2 text-2xl">{title}</h3>
              <p className="mt-2 text-[#d7e4dc]">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-3xl gap-4 px-5 py-14 leading-7">
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
