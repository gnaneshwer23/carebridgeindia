import type { Metadata } from "next";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/enquiry-form";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Compare my options" };

export default function EnquirePage(props: {
  searchParams: Promise<{ concern?: string }>;
}) {
  return (
    <PageShell>
      <Article
        title="Compare my options"
        lede="Tell us whether time, cost, or both is the reason. Do not include a medical history. Sending this form does not reserve treatment."
      >
        <Suspense fallback={<p>Loading the form…</p>}>
          <EnquiryGate searchParams={props.searchParams} />
        </Suspense>
      </Article>
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
