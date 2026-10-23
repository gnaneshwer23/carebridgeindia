import Link from "next/link";
import { CompactExample, FullBreakdown } from "@/components/example-comparison";
import { PageShell } from "@/components/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const primary = cn(buttonVariants({ size: "lg" }), "h-12 rounded-[16px] px-5 text-base font-semibold");
const secondary = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "h-12 rounded-[16px] border-[#D7E3E8] bg-white px-5 text-base font-semibold text-[#12333D]",
);

const steps = [
  ["01", "Tell us your concern", "You", "Say whether the wait, the quote, or both is the reason."],
  ["02", "Provider review", "Coordinator", "A coordinator checks the enquiry. A clinician would still assess suitability."],
  ["03", "Compare the proposal", "Provider", "You see itemised costs, blanks, and any confirmed treatment window."],
  ["04", "Decide the next step", "You", "You can pause or stop. Nothing is booked from this site."],
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="bg-[#E7F6F4]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-12 md:px-8 md:py-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <h1 className="max-w-xl font-serif text-[2.15rem] leading-[1.08] text-[#12333D] md:text-[3.5rem]">
              Long treatment wait? High private care costs?
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3a5560]">
              Explore planned treatment in India with clear costs, provider-confirmed availability and support through the next steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/enquire" className={primary}>Compare my options</Link>
              <Link href="/demo" className={secondary}>Explore demo</Link>
            </div>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#3a5560]">
              A comparison is not a promise of a lower price, a sooner date, or that treatment abroad is suitable.
            </p>
          </div>
          <div className="relative">
            <div aria-hidden className="absolute -left-6 top-8 h-28 w-28 rounded-full bg-[#d5eef3]" />
            <div aria-hidden className="absolute -right-3 -top-4 h-16 w-24 rounded-[16px] bg-[#cfe4ea]" />
            <div className="relative">
              <CompactExample />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-5 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
          <Link href="/enquire?concern=time" className="rounded-[16px] border border-[#D7E3E8] bg-white p-6 shadow-[0_8px_24px_rgba(18,51,61,0.04)]">
            <h2 className="font-serif text-3xl">My wait is too long</h2>
            <p className="mt-3 text-base leading-relaxed text-[#3a5560]">A national waiting list cannot predict your date.</p>
          </Link>
          <Link href="/enquire?concern=cost" className="rounded-[16px] border border-[#D7E3E8] bg-white p-6 shadow-[0_8px_24px_rgba(18,51,61,0.04)]">
            <h2 className="font-serif text-3xl">My private quote is too expensive</h2>
            <p className="mt-3 text-base leading-relaxed text-[#3a5560]">The comparison includes travel, stay, rehabilitation and the coordination fee.</p>
          </Link>
          <Link href="/enquire?concern=both" className="rounded-[16px] border border-[#D7E3E8] p-6 md:col-span-2">
            <h2 className="font-serif text-2xl">Both the wait and the cost</h2>
            <p className="mt-2 text-base leading-relaxed text-[#3a5560]">Start an enquiry with both concerns selected.</p>
          </Link>
        </div>
      </section>

      <section className="bg-[#EEF8FC]">
        <div className="mx-auto max-w-[1200px] px-5 py-14 md:px-8 md:py-20">
          <FullBreakdown />
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1200px] gap-5 px-5 py-14 md:px-8 md:py-20">
          <h2 className="font-serif text-4xl">How a comparison moves</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map(([number, title, owner, copy]) => (
              <article key={number} className="rounded-[16px] border border-[#D7E3E8] bg-white p-5">
                <p className="font-serif text-3xl text-[#0B6B70]">{number}</p>
                <h3 className="mt-3 font-serif text-2xl">{title}</h3>
                <p className="mt-2 text-sm font-semibold text-[#0B6B70]">{owner}</p>
                <p className="mt-2 text-base leading-relaxed text-[#3a5560]">{copy}</p>
              </article>
            ))}
          </div>
          <Link href="/how-it-works" className="text-base font-semibold text-[#0B6B70] underline">
            How the comparison works
          </Link>
        </div>
      </section>

      <section className="bg-[#E7F6F4]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-12 md:px-8">
          <p className="max-w-xl text-lg leading-relaxed">Hip and knee replacement are candidate pathways, not services you can book here.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/enquire" className={primary}>Compare my options</Link>
            <Link href="/demo" className={secondary}>Explore demo</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
