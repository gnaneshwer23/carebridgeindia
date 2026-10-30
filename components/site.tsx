import Link from "next/link";
import { SiteChat } from "@/components/site-chat";
import { SiteHeader } from "@/components/site-header";
import { buttonVariants } from "@/components/ui/button";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const primaryCta = cn(
  buttonVariants({ size: "lg" }),
  "cb-cta h-12 rounded-2xl bg-teal px-5 text-base font-semibold text-white hover:bg-teal-deep",
);

export const secondaryCta = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "cb-cta h-12 rounded-2xl border-line bg-white/90 px-5 text-base font-semibold text-deep backdrop-blur-sm hover:bg-white",
);

export function Notice() {
  return (
    <p className="border-b border-line/70 bg-mist px-5 py-2.5 text-center text-sm leading-6 text-deep">
      Prototype for UK adults. Real enquiries are stored for review. Explore demo uses fictional cases only.
      Not clinical acceptance, not an emergency service, and not part of the NHS.
    </p>
  );
}

export { SiteHeader };

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-ink px-5 py-12 text-base text-aqua/90">
      <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-3 md:px-3">
        <p>
          <strong className="font-serif text-2xl text-white">CareBridge India</strong>
          <br />
          <span className="mt-2 block leading-7 text-aqua/75">
            Personalised wait and cost comparison for UK adults considering planned treatment in India.
          </span>
        </p>
        <p className="leading-7 text-aqua/80 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-aqua/40 hover:[&_a]:decoration-aqua">
          <Link href="/standards">Care standards</Link>
          {" · "}
          <Link href="/aftercare">Recovery and aftercare</Link>
          <br />
          <Link href="/contact">Help and contact</Link>
          {" · "}
          <Link href="/complaints">Complaints</Link>
          <br />
          <Link href="/privacy">Privacy</Link>
          {" · "}
          <Link href="/terms">Terms</Link>
        </p>
        <p className="leading-7 text-aqua/80 [&_a]:underline [&_a]:underline-offset-2 [&_a]:decoration-aqua/40 hover:[&_a]:decoration-aqua">
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer">
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <br />
          <Link href="/pathway">Initial pathway</Link>
          {" · "}
          <Link href="/demo">Explore demo</Link>
          <br />
          <Link href="/coordinator/login">Coordinator sign in</Link>
        </p>
      </div>
    </footer>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Notice />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <SiteChat />
    </>
  );
}

export const pageAction = cn(primaryCta, "w-fit");

export function PageCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-white/90 p-6 text-base leading-relaxed text-deep shadow-[0_1px_0_rgba(18,51,61,0.04)] md:p-8 md:text-lg [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-2",
        className,
      )}
    >
      {children}
    </div>
  );
}

type Tone = "mist" | "ink" | "paper";

const heroTone: Record<Tone, string> = {
  mist: "cb-atmosphere",
  ink: "cb-hero-plane text-white",
  paper: "bg-white",
};

export function PageHero({
  title,
  lede,
  tone = "mist",
  children,
}: {
  title: string;
  lede?: string;
  tone?: Tone;
  children?: React.ReactNode;
}) {
  const onInk = tone === "ink";
  return (
    <header className={cn("relative overflow-hidden", heroTone[tone])}>
      {tone === "mist" ? <div className="cb-page-glow pointer-events-none absolute inset-0" aria-hidden /> : null}
      <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
        <p
          className={cn(
            "cb-reveal font-serif text-3xl tracking-tight md:text-4xl",
            onInk ? "text-aqua" : "text-pine",
          )}
        >
          CareBridge
        </p>
        <h1
          className={cn(
            "cb-reveal-delay mt-5 max-w-3xl font-serif text-[2.35rem] leading-[1.05] tracking-tight md:text-[3.25rem]",
            onInk ? "text-white" : "text-deep",
          )}
        >
          {title}
        </h1>
        {lede ? (
          <p
            className={cn(
              "cb-reveal-late mt-6 max-w-2xl text-lg leading-relaxed md:text-xl",
              onInk ? "text-aqua/85" : "text-deep/85",
            )}
          >
            {lede}
          </p>
        ) : null}
        {children ? <div className="cb-reveal-late mt-10">{children}</div> : null}
      </div>
    </header>
  );
}

export function PageSection({
  children,
  className,
  narrow,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <section className={cn("relative", className)}>
      <div
        className={cn(
          "mx-auto px-5 py-14 md:px-8 md:py-20",
          narrow ? "max-w-3xl" : "max-w-[1200px]",
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function PageCtaBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-5 px-5 py-12 md:px-8 md:py-14">
        {children}
      </div>
    </section>
  );
}

/** Compact interior article — used by forms and utility pages. */
export function Article({
  title,
  lede,
  children,
  tone = "mist",
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
  tone?: Tone;
}) {
  return (
    <article>
      <PageHero title={title} lede={lede} tone={tone} />
      <PageSection narrow className="bg-paper">
        <div className="grid gap-8 text-base leading-relaxed text-deep md:text-lg">{children}</div>
      </PageSection>
    </article>
  );
}
