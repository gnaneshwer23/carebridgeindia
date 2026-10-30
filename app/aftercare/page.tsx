import type { Metadata } from "next";
import { PageHero, PageSection, PageShell } from "@/components/site";

export const metadata: Metadata = { title: "Costs, recovery and aftercare" };

const duties = [
  ["Clinical assessment", "Who decides whether the procedure is suitable."],
  ["Complications", "Who responds if something goes wrong, and how to reach them."],
  ["Follow-up", "Who provides the agreed recovery care, and where."],
  ["Escalation", "Who you contact if that plan is not working."],
];

export default function AftercarePage() {
  return (
    <PageShell>
      <article>
        <PageHero
          tone="ink"
          title="Recovery and aftercare"
          lede="Before any UK patient departs, a proposal has to name who does what for recovery. If that plan cannot be agreed, the pathway should stop."
        />

        <PageSection className="border-b border-line bg-white">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              Four responsibilities that must be named
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-deep/80">
              A case cannot move into preparation until these sit on the published proposal.
            </p>
          </div>
          <dl className="mt-12 grid gap-8 sm:grid-cols-2">
            {duties.map(([title, copy], index) => (
              <div key={title} className="border-t border-teal/30 pt-5">
                <dt className="flex items-baseline gap-3">
                  <span className="font-serif text-2xl text-teal/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-2xl text-deep">{title}</span>
                </dt>
                <dd className="mt-3 text-base leading-relaxed text-deep/80">{copy}</dd>
              </div>
            ))}
          </dl>
        </PageSection>

        <PageSection className="cb-band-mist">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl tracking-tight text-deep md:text-4xl">
              Recovery costs sit in the total
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-deep/85">
              Rehabilitation and the follow-up that has actually been agreed belong in the total. Travel
              and accommodation are separate from the clinical fee. A coordination fee, if one is charged,
              is disclosed and is not taken on this site during the pilot. NHS routine follow-up is not
              arranged by this site, and NHS-funded routine aftercare should not be assumed.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-deep/85">
              If travel and recovery costs remove the advantage, or a safe handback cannot be agreed, the
              pathway should stop.
            </p>
          </div>
        </PageSection>
      </article>
    </PageShell>
  );
}
