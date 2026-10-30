import type { Metadata } from "next";
import { PageHero, PageSection, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Terms" };

const sections = [
  {
    title: "What an enquiry does",
    copy: "CareBridge India, as built here, stores an enquiry and lets a coordinator prepare a comparison. Figures come from what is entered. They can be incomplete, and a savings line is withheld when they are. Nothing on the public pages is a quote.",
  },
  {
    title: "Pause, stop, or delete",
    copy: "You can pause, stop or delete an enquiry. Discussing whether to proceed does not authorise treatment or payment. Any later coordination fee would have to be disclosed before it is charged, and treatment charges would be paid to the clinical provider. No fee is collected in this release.",
  },
  {
    title: "Who this is for",
    copy: "The service is for UK adults considering planned care. It is not an emergency service, is not part of the NHS, and does not decide whether you are fit to travel. If you need urgent care in the UK, use NHS 111 or local emergency services.",
  },
];

export default function TermsPage() {
  return (
    <PageShell>
      <article>
        <PageHero
          title="Terms"
          lede="Sending an enquiry does not create a treatment contract, a booking, or a duty to find you a hospital."
        />
        <PageSection className="bg-white" narrow>
          <div className="grid gap-12">
            {sections.map((section) => (
              <section key={section.title} className="border-t border-line pt-8 first:border-0 first:pt-0">
                <h2 className="font-serif text-2xl tracking-tight text-deep md:text-3xl">
                  {section.title}
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-deep/85">{section.copy}</p>
              </section>
            ))}
          </div>
        </PageSection>
      </article>
    </PageShell>
  );
}
