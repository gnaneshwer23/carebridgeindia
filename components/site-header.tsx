"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { WHATSAPP_DISPLAY, whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const links = [
  { href: "/waiting", label: "NHS wait" },
  { href: "/costs", label: "UK costs" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/for-patients", label: "For patients" },
  { href: "/for-clinicians", label: "For clinicians" },
  { href: "/contact", label: "Help & contact" },
];

const primary = cn(
  buttonVariants({ size: "lg" }),
  "cb-cta h-12 rounded-2xl bg-teal px-5 text-base font-semibold text-white hover:bg-teal-deep",
);

const secondary = cn(
  buttonVariants({ variant: "outline", size: "lg" }),
  "cb-cta h-12 rounded-2xl border-line bg-white/90 px-5 text-base font-semibold text-deep backdrop-blur-sm hover:bg-white",
);

const whatsappHeader = cn(
  buttonVariants({ variant: "ghost", size: "lg" }),
  "h-12 rounded-2xl px-3 text-base font-semibold text-teal hover:bg-mist hover:text-teal-deep",
);

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <Link href="/" className="font-serif text-[1.65rem] leading-none tracking-tight text-pine">
          CareBridge
          <span className="mt-1 block font-sans text-[0.65rem] font-semibold tracking-[0.2em] text-deep/55">
            INDIA · FOR THE UK
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 text-[15px] lg:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative rounded-xl px-3 py-2 text-deep/75 transition-[color,background-color] duration-200 ease-out hover:bg-mist hover:text-deep",
                  active && "bg-mist text-deep",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-teal/70"
                  />
                ) : null}
              </Link>
            );
          })}
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

        <div className="flex items-center gap-2.5 lg:hidden">
          <Link href="/enquire" className={cn(primary, "h-11 px-4 text-sm")}>
            Compare
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className={cn(
              "group relative inline-flex h-11 items-center gap-2.5 rounded-2xl border border-teal/35 bg-white/90 pl-3.5 pr-3 text-sm font-semibold text-deep shadow-[0_1px_0_rgba(18,51,61,0.06)] transition-[transform,background-color,border-color,box-shadow] duration-200 ease-out",
              "hover:border-teal/55 hover:bg-mist active:scale-[0.97]",
              open && "border-teal/60 bg-mist",
            )}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((value) => !value)}
          >
            <span>{open ? "Close" : "Browse"}</span>
            <span className="relative h-3.5 w-3.5" aria-hidden>
              <span
                className={cn(
                  "absolute left-0 top-[3px] h-[1.5px] w-3.5 origin-center rounded-full bg-teal transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  open && "translate-y-[4px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[9px] h-[1.5px] w-2.5 origin-center rounded-full bg-teal/80 transition-[transform,width,opacity] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                  open && "top-[3px] w-3.5 -rotate-45 opacity-100",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-ink/35 backdrop-blur-[2px] lg:hidden"
            aria-label="Dismiss menu"
            onClick={() => setOpen(false)}
          />
          <div id={panelId} className="absolute left-0 right-0 top-full z-50 px-3 pb-4 lg:hidden">
            <div
              className="cb-reveal relative overflow-hidden rounded-[1.75rem] border border-line/80 bg-paper shadow-[0_24px_60px_rgba(15,44,52,0.22)]"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
            >
              <div className="cb-menu-wash absolute inset-0" aria-hidden />
              <div className="relative px-5 pb-6 pt-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-serif text-2xl tracking-tight text-pine">Navigate</p>
                  <button
                    ref={closeRef}
                    type="button"
                    className="rounded-xl px-3 py-2 text-sm font-semibold text-teal transition-colors hover:bg-white/70"
                    onClick={() => setOpen(false)}
                  >
                    Done
                  </button>
                </div>
                <nav className="mt-5 grid gap-1" aria-label="Mobile">
                  {links.map((link, index) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "group flex items-baseline justify-between gap-4 rounded-2xl px-3 py-3.5 transition-colors duration-200 ease-out",
                          active ? "bg-white/80 text-deep" : "text-deep/90 hover:bg-white/70",
                        )}
                      >
                        <span className="font-serif text-[1.55rem] leading-none tracking-tight">
                          {link.label}
                        </span>
                        <span className="font-sans text-xs font-semibold tracking-[0.18em] text-teal/55">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    );
                  })}
                </nav>
                <div className="mt-5 grid gap-2 border-t border-line/70 pt-5">
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl bg-mist px-4 py-3 text-base font-semibold text-teal"
                  >
                    WhatsApp {WHATSAPP_DISPLAY}
                  </a>
                  <Link href="/demo" className={cn(secondary, "justify-center")}>
                    Explore demo
                  </Link>
                  <Link href="/enquire" className={cn(primary, "justify-center")}>
                    Compare my options
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
