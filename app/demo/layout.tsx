import type { Metadata } from "next";
import { DemoProvider } from "@/components/demo/provider";
import { PageShell } from "@/components/site";

export const metadata: Metadata = {
  title: "Demonstration",
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageShell>
      <DemoProvider>
        <div className="mx-auto w-full max-w-[1200px] px-5 py-8 md:px-8 md:py-12">{children}</div>
      </DemoProvider>
    </PageShell>
  );
}
