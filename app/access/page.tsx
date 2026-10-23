import type { Metadata } from "next";
import { AccessForm } from "@/components/session-forms";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = {
  title: "Open your case",
  robots: { index: false, follow: false },
};

export default function AccessPage() {
  return (
    <PageShell>
      <Article
        title="Open your case"
        lede="Use the reference and access key from the acknowledgement. The key is not stored in a form we can read back to you."
      >
        <AccessForm />
      </Article>
    </PageShell>
  );
}
