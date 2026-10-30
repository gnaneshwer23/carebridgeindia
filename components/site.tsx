import Link from "next/link";
import { SiteChat } from "@/components/site-chat";
import { buttonVariants } from "@/components/ui/button";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const links = [
  { href: "/waiting", label: "NHS wait" },
  { href: "/costs", label: "UK costs" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-patients", label: "For patients" },
  { href: "/for-clinicians", label: "For clinicians" },
];

export const primaryCta = cn(
  buttonVariants({ size: "lg" }),
  "cb-cta h-12 rounded-2xl bg-teal px-5 text-base font-semibold text-white hover:bg-teal-deep",
);

export const secondaryCta = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "cb-cta h-12 rounded-2xl border-line bg-white/90 px-5 text-base font-semibold text-deep backdrop-blur-sm hover:bg-white",
);

const primary = primaryCta;
const secondary = secondaryCta;

const whatsappHeader = cn(
  buttonVariants({ variant: "ghost", size: "lg" }),
  "h-12 rounded-2xl px-3 text-base font-semibold text-teal hover:bg-mist hover:text-teal-deep",
);

export function Notice() {
  return (
    <p className="border-b border-line/70 bg-mist px-5 py-2.5 text-center text-sm leading-6 text-deep">
      Prototype for UK adults. Real enquiries are stored for review. Explore demo uses fictional cases only.
      Not clinical acceptance, not an emergency service, and not part of the NHS.
    </p>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <Link href="/" className="font-serif text-[1.65rem] leading-none tracking-tight text-pine">
          CareBridge
          <span className="mt-1 block font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-deep/55">
            INDIA · FOR THE UK
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-[15px] lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-2.5 py-2 text-deep/80 transition-colors hover:bg-mist hover:text-deep"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={whatsappHref("Hello CareBridge — I’d like to talk through a UK–India comparison.")}
            target="_blank"
            rel="noopener noreferrer"
            className={whatsappHeader}
          >
            WhatsApp
          </a>
          <Link href="/demo" className={secondary}>
            Explore demo
          </Link>
          <Link href="/enquire" className={primary}>
            Compare my options
          </Link>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl px-2 py-2 text-sm font-semibold text-teal"
          >
            WhatsApp
          </a>
          <Link href="/enquire" className={cn(primary, "h-11 px-4 text-sm")}>
            Compare
          </Link>
        </div>
      </div>
      <details className="border-t border-line px-5 py-3 lg:hidden">
        <summary className="cursor-pointer text-base font-medium text-deep">Menu</summary>
        <nav className="grid gap-3 py-4 text-base" aria-label="Mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="font-semibold text-teal">
            WhatsApp {WHATSAPP_DISPLAY}
          </a>
          <Link href="/demo" className="font-semibold text-teal">
            Explore demo
          </Link>
          <Link href="/enquire" className="font-semibold">
            Compare my options
          </Link>
        </nav>
      </details>
    </header>
  );
}

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

export function PageCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white/90 p-6 text-base leading-relaxed text-deep shadow-[0_1px_0_rgba(18,51,61,0.04)] md:p-8 md:text-lg [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-2">
      {children}
    </div>
  );
}

export function Article({
  title,
  lede,
  children,
}: {
  title: string;
  lede?: string;
  children: React.ReactNode;
}) {
  return (
    <article className="cb-atmosphere text-deep">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <p className="font-serif text-3xl tracking-tight text-pine md:text-4xl">CareBridge</p>
        <h1 className="mt-4 max-w-2xl font-serif text-[2.125rem] leading-[1.1] tracking-tight md:text-5xl">
          {title}
        </h1>
        {lede ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-deep/85">{lede}</p> : null}
        <div className="mt-10 grid gap-6 text-base leading-relaxed md:text-lg">{children}</div>
      </div>
    </article>
  );
}
