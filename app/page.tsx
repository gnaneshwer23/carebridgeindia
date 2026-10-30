import Link from "next/link";
import { HeroAsk } from "@/components/hero-ask";
import { HeroVisual } from "@/components/hero-visual";
import { PageShell, primaryCta, secondaryCta } from "@/components/site";
import { ComparisonBars } from "@/components/visuals/comparison-bars";
import { HonestyStrip, PromiseMarks } from "@/components/visuals/honesty-strip";
import { PathFlow } from "@/components/visuals/path-flow";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/whatsapp";

export default function HomePage() {
  return (
    <PageShell>
      <section className="relative overflow-hidden cb-atmosphere">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-28">
          <div className="cb-reveal">
            <p className="font-serif text-[2.75rem] leading-none tracking-tight text-pine md:text-6xl">
              CareBridge
            </p>
            <p className="mt-2 font-sans text-xs font-semibold tracking-[0.22em] text-deep/55">
              INDIA · FOR UK ADULTS
            </p>
            <h1 className="mt-8 max-w-xl font-serif text-[2.2rem] leading-[1.05] tracking-tight text-deep md:text-[3.35rem]">
              Long NHS wait. High UK private cost.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-deep/85">
              Personalised India comparison — then decide, including not to travel.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/enquire" className={primaryCta}>
                Compare my options
              </Link>
              <Link href="/how-it-works" className={secondaryCta}>
                How it works
              </Link>
            </div>
            <HeroAsk />
          </div>
          <div className="cb-reveal-delay">
            <HeroVisual />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <h2 className="cb-reveal-late font-serif text-3xl tracking-tight text-deep md:text-4xl">
            Prepare, compare, decide
          </h2>
          <div className="mt-10">
            <PathFlow />
          </div>
        </div>
      </section>

      <section className="cb-atmosphere">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
            What the comparison is
          </h2>
          <div className="mt-10">
            <PromiseMarks />
          </div>
          <div className="mt-12">
            <ComparisonBars />
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link href="/enquire" className={primaryCta}>
              Compare my options
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-deep/70">
              Not clinical acceptance. Not a guaranteed saving or sooner date.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
            Honest limits
          </h2>
          <div className="mt-10">
            <HonestyStrip />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-20">
          <div className="max-w-xl">
            <p className="font-serif text-3xl tracking-tight text-white md:text-4xl">
              Ready for a personalised comparison?
            </p>
            <p className="mt-3 text-base leading-relaxed text-aqua/80">
              Enquiry, assistant, or WhatsApp — nothing books treatment.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/enquire" className={primaryCta}>
              Compare my options
            </Link>
            <a
              href={whatsappHref("Hello CareBridge — I’d like to talk through a UK–India comparison.")}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryCta}
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
