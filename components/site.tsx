import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/waiting", label: "Waiting time" },
  { href: "/costs", label: "Treatment costs" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/standards", label: "Provider standards" },
];

export function Notice() {
  return (
    <p className="bg-[#e7eee4] px-5 py-2 text-center text-sm text-foreground">
      Validation prototype. Enquiries are stored for review. No bookings, payments or clinical services are available. Not an emergency service. No NHS affiliation.
    </p>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <Link href="/" className="font-serif text-2xl tracking-tight">
          CareBridge
          <span className="mt-0.5 block text-[0.65rem] font-sans tracking-[0.18em] text-muted-foreground">
            INDIA
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:underline">
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/enquire"
          className={cn(buttonVariants({ size: "lg" }), "hidden h-11 px-4 md:inline-flex")}
        >
          Compare my options
        </Link>
      </div>
      <details className="border-t border-border px-5 py-3 md:hidden">
        <summary className="cursor-pointer text-sm font-medium">Menu</summary>
        <nav className="grid gap-3 py-4 text-sm" aria-label="Mobile">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/enquire" className="font-medium text-primary">
            Compare my options
          </Link>
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-[#e7eee4] px-5 py-8 text-sm">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        <p>
          <strong>CareBridge India</strong>
          <br />
          Intended domain: carebridgeindia.co.uk
        </p>
        <p>
          A UK–India planned care comparison.
          <br />
          <Link href="/privacy" className="underline">Privacy</Link>
          {" · "}
          <Link href="/terms" className="underline">Terms</Link>
          {" · "}
          <Link href="/complaints" className="underline">Complaints</Link>
        </p>
        <p>
          <Link href="/pathway" className="underline">Initial pathway</Link>
          {" · "}
          <Link href="/aftercare" className="underline">Aftercare</Link>
          {" · "}
          <Link href="/contact" className="underline">Contact</Link>
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
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
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
    <article className="mx-auto grid max-w-3xl gap-6 px-5 py-14">
      <h1 className="text-4xl text-balance md:text-5xl">{title}</h1>
      {lede ? <p className="text-lg leading-8 text-muted-foreground">{lede}</p> : null}
      <div className="grid gap-4 leading-7">{children}</div>
    </article>
  );
}
