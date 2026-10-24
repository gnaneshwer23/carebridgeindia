import Link from "next/link";
import { CompactExample } from "@/components/example-comparison";
import { PageShell } from "@/components/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const primary = cn(buttonVariants({ size: "lg" }), "h-12 rounded-[16px] px-5 text-base font-semibold");
const secondary = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "h-12 rounded-[16px] border-[#D7E3E8] bg-white px-5 text-base font-semibold text-[#12333D]",
);

export default function HomePage() {
  return (
    <PageShell>
      <section className="bg-[#EEF8FC]">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="max-w-xl font-serif text-[2.15rem] leading-[1.08] text-[#12333D] md:text-[3.5rem]">
              Long treatment wait? High private care costs?
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#12333D]">
              Explore planned treatment in India with clear costs, provider-confirmed availability and support through the next steps.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/enquire" className={primary}>Compare my options</Link>
              <Link href="/demo" className={secondary}>Explore demo</Link>
            </div>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#12333D]">
              A comparison is not a booking, not clinical acceptance, and not a guaranteed saving or a sooner date.
            </p>
          </div>
          <CompactExample />
        </div>
      </section>
    </PageShell>
  );
}
