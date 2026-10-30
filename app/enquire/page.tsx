import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero, PageSection, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Compare my options" };

export default function EnquirePage(props: {
  searchParams: Promise<{ concern?: string }>;
}) {
  return (
    <PageShell>
      <article>
        <PageHero
          tone="ink"
          title="Compare my options"
          lede="Tell us whether NHS wait, UK private cost, or both is the reason. Do not include a medical history. Sending this form does not reserve treatment."
        />
        <PageSection className="cb-band-mist">
          <div className="mx-auto max-w-2xl">
            <Suspense fallback={<p className="text-deep/70">Loading the form…</p>}>
              <EnquiryGate searchParams={props.searchParams} />
            </Suspense>
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
