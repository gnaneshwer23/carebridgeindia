import Link from "next/link";
import { CompactExample } from "@/components/example-comparison";
import { HeroAsk } from "@/components/hero-ask";
import { HeroVisual } from "@/components/hero-visual";
import { PageShell, primaryCta, secondaryCta } from "@/components/site";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/whatsapp";

const path = [
  {
    title: "Prepare",
    copy: "Tell us whether an NHS wait, a UK private quote, or both brought you here. No medical history upload on this site.",
  },
  {
    title: "Compare",
    copy: "A coordinator gathers a patient-specific proposal: total expected cost and provider-confirmed availability, with unknowns left blank.",
  },
  {
    title: "Decide",
    copy: "Ask a question, pause, proceed to discussion, or decide not to travel. Nothing here books treatment or takes payment.",
  },
];

const faqs = [
  {
    q: "Is CareBridge part of the NHS?",
    a: "No. CareBridge is an independent comparison pathway for UK adults. It is not clinical acceptance, not an emergency service, and not part of the NHS.",
  },
  {
    q: "Will you quote me a price or savings percentage here?",
    a: "No. This site does not invent catalogue prices, “starting from” figures, or savings percentages. A personalised total expected cost comes after an enquiry, with unknowns left blank.",
  },
  {
    q: "Does India mean no waiting list?",
    a: "No. We do not claim “no waiting list” or guaranteed dates. Availability is provider-confirmed for your case when a coordinator gathers a proposal — and a consultation is not a treatment window.",
  },
  {
    q: "How do I talk to a person?",
    a: `Use WhatsApp at ${WHATSAPP_DISPLAY}, or start Compare my options so a coordinator can follow up. For emergencies in the UK, use NHS 111 or local emergency services.`,
  },
];

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
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-deep/85">
              See a personalised India comparison — total expected cost and provider-confirmed
              availability — then decide, including deciding not to travel.
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
          <div className="cb-reveal-late max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              Prepare, compare, decide
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-deep/80">
              A clear path for UK adults weighing planned treatment in India — without marketplace
              packages or catalogue prices.
            </p>
          </div>
          <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {path.map((step, index) => (
              <li key={step.title} className="relative">
                <p className="font-serif text-5xl leading-none text-teal/25">{index + 1}</p>
                <h3 className="mt-3 font-serif text-2xl text-deep">{step.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-deep/80">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cb-atmosphere">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              What the comparison is
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-deep/80">
              Your situation beside a provider-confirmed India proposal. Not AI pricing, not “save up
              to”, and not a booking.
            </p>
          </div>
          <ul className="mt-10 grid gap-6 text-base leading-relaxed text-deep/85 md:grid-cols-2 md:text-lg">
            <li className="border-l-2 border-teal/40 pl-4">
              NHS wait context and any UK private quote you share stay labelled for what they are —
              estimate, confirmed date, or not supplied.
            </li>
            <li className="border-l-2 border-teal/40 pl-4">
              India totals include the journey: treatment, required tests, travel, stay, transfers,
              planned rehab and aftercare, and any coordination fee.
            </li>
            <li className="border-l-2 border-teal/40 pl-4">
              Unknown amounts are not treated as zero. Incomplete savings are withheld. A consultation
              is not a treatment window.
            </li>
            <li className="border-l-2 border-teal/40 pl-4">
              Support includes deciding not to travel if the numbers or the plan do not hold up.
            </li>
          </ul>
          <div className="mt-12">
            <CompactExample />
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link href="/enquire" className={primaryCta}>
              Compare my options
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-deep/70">
              A comparison is not clinical acceptance and not a guaranteed saving or a sooner date.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              Before you start, the honest answers
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-deep/80">
              Clear limits keep the comparison trustworthy.
            </p>
          </div>
          <div className="mt-10 max-w-3xl divide-y divide-line border-y border-line">
            {faqs.map((item) => (
              <details key={item.q} className="group py-5">
                <summary className="cursor-pointer list-none font-serif text-xl text-deep marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="mt-1 text-teal transition-transform duration-200 group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-deep/80 md:text-lg">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-20">
          <div className="max-w-xl">
            <p className="font-serif text-3xl tracking-tight text-white md:text-4xl">
              Ready for a personalised comparison?
            </p>
            <p className="mt-4 text-lg leading-relaxed text-aqua/80">
              Start an enquiry, ask the assistant, or message us on WhatsApp. Nothing here books
              treatment.
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
