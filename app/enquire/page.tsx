import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/enquiry-form";
import Link from "next/link";
import { PageSection, PageShell } from "@/components/site";
import { EnquireAtmosphere } from "@/components/visuals/enquire-atmosphere";

export const metadata: Metadata = { title: "Compare my options" };

export default function EnquirePage(props: {
  searchParams: Promise<{ concern?: string }>;
}) {
  return (
    <PageShell>
      <article>
        <header className="relative overflow-hidden cb-hero-plane text-white">
          <EnquireAtmosphere />
          <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:px-8 md:py-24">
            <p className="cb-reveal font-serif text-3xl tracking-tight text-aqua md:text-4xl">
              CareBridge
            </p>
            <h1 className="cb-reveal-delay mt-5 max-w-3xl font-serif text-[2.35rem] leading-[1.05] tracking-tight text-white md:text-[3.25rem]">
              Compare my options
            </h1>
            <p className="cb-reveal-late mt-5 max-w-xl text-lg leading-relaxed text-aqua/85">
              NHS wait, UK private cost, or both. No medical history. Sending does not reserve treatment.
            </p>
            <ol className="cb-reveal-late mt-10 flex flex-wrap gap-3" aria-label="Enquiry path">
              {["Concern", "Details", "Send"].map((label, i) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-aqua"
                >
                  <span className="font-serif text-lg text-white">{i + 1}</span>
                  {label}
                </li>
              ))}
            </ol>
          </div>
        </header>

        <PageSection className="cb-band-mist">
          <div className="mx-auto max-w-2xl">
            <Suspense
              fallback={
                <p className="rounded-2xl border border-line bg-white/80 px-5 py-8 text-deep/70">
                  Loading the form…
                </p>
              }
            >
              <EnquiryGate searchParams={props.searchParams} />
            </Suspense>
            <p className="mt-8 text-center text-sm text-deep/65">
              Prefer a conversation first?{" "}
              <Link href="/contact" className="font-semibold text-teal underline underline-offset-2">
                Contact
              </Link>
            </p>
          </div>
        </PageSection>
      </article>
    </PageShell>
  );
}

async function EnquiryGate({
  searchParams,
}: {
  searchParams: Promise<{ concern?: string }>;
}) {
  const { concern } = await searchParams;
  const defaultConcern =
    concern === "time" || concern === "cost" || concern === "both" ? concern : "";
  return <EnquiryForm defaultConcern={defaultConcern} />;
}
