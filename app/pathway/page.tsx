import type { Metadata } from "next";
import Link from "next/link";
import { PageCtaBand, PageHero, PageSection, PageShell, pageAction } from "@/components/site";

export const metadata: Metadata = { title: "Initial treatment pathway" };

export default function PathwayPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          tone="ink"
          title="One procedure, after providers can price it"
          lede="Hip and knee replacement are the candidates for the first UK comparison. Neither is a service you can book here."
        />

        <PageSection className="border-b border-line bg-white">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
                Pilot scope
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-deep/85">
                The pilot starts with UK adults considering a primary hip or knee replacement, and only
                after written example proposals exist for the same procedure from at least two providers.
                Until then, the enquiry records interest. It does not confirm that a hospital, clinician
                or date is available.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
                Outside this service
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-deep/85">
                Cosmetic surgery, fertility care, transplants, emergency treatment and wellness trips are
                outside the service. A second opinion on its own is not a product.
              </p>
            </div>
          </div>
        </PageSection>

        <PageSection className="cb-band-mist">
          <blockquote className="max-w-3xl font-serif text-2xl leading-snug tracking-tight text-deep md:text-3xl">
            India recorded 507,244 medical-purpose foreign arrivals in 2025, below the 644,387 recorded
            in 2024. That history does not measure UK demand. This pilot is how that demand gets tested.
          </blockquote>
          <p className="mt-8 text-base text-deep/75">
            <a
              className="font-semibold text-teal underline underline-offset-2"
              href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2225423"
            >
              Press Information Bureau release on medical-purpose arrivals
            </a>
          </p>
        </PageSection>

        <PageCtaBand>
          <p className="max-w-xl font-serif text-2xl leading-snug text-white md:text-3xl">
            Record interest for a hip or knee comparison.
          </p>
          <Link href="/enquire" className={pageAction}>
            Compare my options
          </Link>
        </PageCtaBand>
      </article>
    </PageShell>
  );
}
