import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/waiting", label: "Waiting time" },
  { href: "/costs", label: "Treatment costs" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-patients", label: "For patients" },
  { href: "/for-clinicians", label: "For clinicians" },
];

const primary = cn(
  buttonVariants({ size: "lg" }),
  "h-12 rounded-[16px] px-4 text-base font-semibold",
);

const secondary = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "h-12 rounded-[16px] border-[#D7E3E8] bg-white px-4 text-base font-semibold text-[#12333D]",
);

export function Notice() {
  return (
    <p className="bg-[#E7F6F4] px-5 py-2 text-center text-sm leading-6 text-[#12333D]">
      Prototype. Real enquiries are stored for review. The Explore demo uses fictional cases only. Not clinical acceptance, not an emergency service, and not part of the NHS.
    </p>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-[#D7E3E8] bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3 md:px-8">
        <Link href="/" className="font-serif text-2xl leading-none tracking-tight text-[#1A5C4C]">
          CareBridge
          <span className="mt-1 block font-sans text-[0.7rem] tracking-[0.16em] text-[#3a5560]">INDIA</span>
        </Link>
        <nav className="hidden items-center gap-4 text-[15px] lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-md px-1 py-2 hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <Link href="/demo" className={secondary}>Explore demo</Link>
          <Link href="/enquire" className={primary}>Compare my options</Link>
        </div>
        <Link href="/enquire" className={cn(primary, "lg:hidden")}>Compare</Link>
      </div>
      <details className="border-t border-[#D7E3E8] px-5 py-3 lg:hidden">
        <summary className="cursor-pointer text-base font-medium">Menu</summary>
        <nav className="grid gap-3 py-4 text-base" aria-label="Mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
          <Link href="/demo" className="font-semibold text-[#0B6B70]">Explore demo</Link>
          <Link href="/enquire" className="font-semibold">Compare my options</Link>
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-[#D7E3E8] bg-white px-5 py-10 text-base">
      <div className="mx-auto grid max-w-[1200px] gap-6 md:grid-cols-3 md:px-3">
        <p>
          <strong className="font-serif text-xl text-[#1A5C4C]">CareBridge India</strong>
          <br />
          Planned treatment comparison for UK patients looking at India.
        </p>
        <p className="leading-7">
          <Link href="/standards" className="underline">Care standards</Link>
          {" · "}
          <Link href="/aftercare" className="underline">Recovery and aftercare</Link>
          <br />
          <Link href="/contact" className="underline">Help and contact</Link>
          {" · "}
          <Link href="/complaints" className="underline">Complaints</Link>
          <br />
          <Link href="/privacy" className="underline">Privacy</Link>
          {" · "}
          <Link href="/terms" className="underline">Terms</Link>
        </p>
        <p className="leading-7">
          <Link href="/pathway" className="underline">Initial pathway</Link>
          {" · "}
          <Link href="/demo" className="underline">Explore demo</Link>
          <br />
          <Link href="/coordinator/login" className="underline">Coordinator sign in</Link>
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
      <main id="main" className="flex-1">{children}</main>
      <SiteFooter />
    </>
  );
}

export const pageAction = cn(
  buttonVariants({ size: "lg" }),
  "h-12 w-fit rounded-[16px] px-5 text-base font-semibold",
);

export function PageCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[16px] border border-[#D7E3E8] bg-white p-6 text-base leading-relaxed text-[#12333D] md:p-8 md:text-lg [&_a]:text-[#0B6B70] [&_a]:underline">
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
    <article className="bg-[#EEF8FC] text-[#12333D]">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-24">
        <h1 className="max-w-2xl font-serif text-[2.125rem] leading-[1.12] md:text-5xl">{title}</h1>
        {lede ? <p className="mt-5 max-w-2xl text-lg leading-relaxed">{lede}</p> : null}
        <div className="mt-10 grid gap-6 text-base leading-relaxed md:text-lg">
          {children}
        </div>
      </div>
    </article>
  );
}
