import type { Metadata } from "next";
import { LoginForm } from "@/components/session-forms";
import { Article, PageShell } from "@/components/site";

export const metadata: Metadata = {
  title: "Coordinator sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <PageShell>
      <Article
        title="Coordinator sign in"
        lede="Staff sign-in for this validation build uses a password and an audit log. Multi-factor authentication is required before any live clinical service."
      >
        <LoginForm />
      </Article>
    </PageShell>
  );
}
