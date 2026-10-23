import { formatIsoDate, formatMinor } from "@/lib/format";
import {
  COST_CATEGORY_LABELS,
  COST_GROUPS,
  RESPONSIBILITY_KINDS,
  RESPONSIBILITY_LABELS,
  type ComparisonResult,
  type CostCategory,
  type CostLineInput,
  type ResponsibilityKind,
  type TimingResult,
} from "@/lib/comparison";

export type ComparisonModel = {
  version: number;
  publishedLabel: string | null;
  procedureExact: string;
  laterality: string;
  packageSpec: string;
  providerName: string;
  clinicianName: string;
  registrationBody: string | null;
  registrationNumber: string | null;
  approvedForLiveCases: boolean;
  currency: string;
  exchangeRateOn: string | null;
  exchangeRateLabel: string | null;
  gbpPerUnit: string | null;
  expiresOn: string | null;
  cancellationTerms: string;
  paymentRecipient: string;
  exclusions: string;
  unpricedItems: string;
  contingency: string;
  ukSource: "patient_quote" | "published_benchmark" | null;
  ukAmountMinor: number | null;
  ukBenchmarkLabel: string | null;
  ukBenchmarkDate: string | null;
  lines: CostLineInput[];
  result: ComparisonResult;
  timing: TimingResult;
  responsibilities: {
    kind: ResponsibilityKind;
    partyName: string;
    contact: string;
    description: string;
  }[];
};

function supplied(value: string | null | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "Not supplied";
}

export function ComparisonView({ model }: { model: ComparisonModel }) {
  const lineFor = (category: string) =>
    model.lines.find((line) => line.category === category);

  return (
    <article className="grid gap-6 rounded-xl border border-border bg-card p-5">
      <header className="grid gap-2">
        <p className="text-sm text-muted-foreground">
          Version {model.version}
          {model.publishedLabel ? ` · Published ${model.publishedLabel}` : " · Draft"}
        </p>
        <h3 className="text-2xl">{supplied(model.procedureExact)}</h3>
        <p>
          {model.laterality === "not_supplied"
            ? "Laterality not supplied"
            : `Laterality: ${model.laterality}`}
        </p>
        <p>{supplied(model.packageSpec)}</p>
      </header>

      <p className="rounded-lg bg-secondary px-4 py-3 text-sm">
        {model.approvedForLiveCases
          ? "This provider is marked approved for live cases."
          : "This provider is not approved for live cases. The proposal is for comparison only and does not reserve treatment."}
      </p>

      <dl className="grid gap-3 text-sm">
        <div>
          <dt className="font-medium">Hospital</dt>
          <dd>{supplied(model.providerName)}</dd>
        </div>
        <div>
          <dt className="font-medium">Clinician</dt>
          <dd>
            {supplied(model.clinicianName)}
            {model.registrationBody || model.registrationNumber
              ? ` · ${[model.registrationBody, model.registrationNumber].filter(Boolean).join(" ")}`
              : " · Registration not supplied"}
          </dd>
        </div>
        <div>
          <dt className="font-medium">Quote expires</dt>
          <dd>{formatIsoDate(model.expiresOn)}</dd>
        </div>
        <div>
          <dt className="font-medium">Payment recipient</dt>
          <dd>{supplied(model.paymentRecipient)}</dd>
        </div>
        <div>
          <dt className="font-medium">Cancellation</dt>
          <dd>{supplied(model.cancellationTerms)}</dd>
        </div>
      </dl>

      {COST_GROUPS.map((group) => (
        <section key={group.title} className="grid gap-2">
          <h4 className="text-lg">{group.title}</h4>
          <ul className="divide-y divide-border border-y border-border">
            {group.categories.map((category) => {
              const line = lineFor(category);
              const known =
                line &&
                line.certainty !== "unknown" &&
                line.amountMinor !== null;
              return (
                <li key={category} className="flex items-start justify-between gap-4 py-3 text-sm">
                  <span>
                    {line?.label || COST_CATEGORY_LABELS[category as CostCategory]}
                    {known ? (
                      <span className="mt-1 block text-muted-foreground">
                        {line.certainty === "confirmed" ? "Confirmed quote" : "Estimate"}
                      </span>
                    ) : null}
                  </span>
                  <span className="text-right">
                    {known
                      ? formatMinor(line.amountMinor!, model.currency)
                      : "Not supplied"}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      ))}

      <div className="grid gap-2 text-sm">
        <p>
          {`Confirmed amounts supplied: ${formatMinor(model.result.confirmedMinor, model.currency)}. Estimated amounts supplied: ${formatMinor(model.result.estimatedMinor, model.currency)}. These figures are not a total.`}
        </p>
        {model.result.complete && model.result.expectedMinor !== null ? (
          <p className="text-base font-medium">
            Expected total: {formatMinor(model.result.expectedMinor, model.currency)}
            {model.currency !== "GBP" && model.result.expectedGbpMinor !== null
              ? ` (${formatMinor(model.result.expectedGbpMinor, "GBP")} at the recorded rate)`
              : ""}
            .
          </p>
        ) : (
          <p>Expected total withheld until every required cost is supplied.</p>
        )}
        <p>
          {model.currency === "GBP"
            ? "Prices are in pounds. No currency conversion was applied."
            : `Exchange rate: ${model.gbpPerUnit ?? "not supplied"} pounds per 1 ${model.currency}${model.exchangeRateOn ? `, dated ${formatIsoDate(model.exchangeRateOn)}` : ""}. ${supplied(model.exchangeRateLabel)}`}
        </p>
      </div>

      <section className="grid gap-2 rounded-lg bg-secondary px-4 py-4">
        <h4 className="text-lg">Compared with the UK</h4>
        {model.ukSource && model.ukAmountMinor !== null ? (
          <p>
            {model.ukSource === "patient_quote"
              ? `Your UK quote: ${formatMinor(model.ukAmountMinor, "GBP")}${model.ukBenchmarkDate ? `, dated ${formatIsoDate(model.ukBenchmarkDate)}` : ""}.`
              : `Published benchmark${model.ukBenchmarkLabel ? `: ${model.ukBenchmarkLabel}` : ""}: ${formatMinor(model.ukAmountMinor, "GBP")}${model.ukBenchmarkDate ? `, dated ${formatIsoDate(model.ukBenchmarkDate)}` : ""}.`}
          </p>
        ) : (
          <p>No UK quote or published benchmark has been attached.</p>
        )}
        {model.result.savings ? (
          <p className="text-base font-medium">
            {model.result.savings.differenceGbpMinor === 0
              ? "The expected India journey matches the UK figure."
              : model.result.savings.differenceGbpMinor > 0
                ? `${formatMinor(model.result.savings.differenceGbpMinor)} lower than the UK figure.`
                : `${formatMinor(Math.abs(model.result.savings.differenceGbpMinor))} higher than the UK figure.`}
          </p>
        ) : (
          <p>{model.result.blockedReason}</p>
        )}
        <p className="text-sm text-muted-foreground">
          This estimate does not cap the cost of complications, and it is not a promise that treatment will cost less.
        </p>
      </section>

      <section className="grid gap-2">
        <h4 className="text-lg">What is uncertain</h4>
        <p>Exclusions: {supplied(model.exclusions)}</p>
        <p>Unpriced items: {supplied(model.unpricedItems)}</p>
        <p>Contingency scenario: {supplied(model.contingency)}</p>
      </section>

      <section className="grid gap-2">
        <h4 className="text-lg">When treatment could happen</h4>
        {model.timing.consultations.length ? (
          <ul className="grid gap-2 text-sm">
            {model.timing.consultations.map((item) => (
              <li key={`${item.confirmedOn}-${item.source}`}>
                Consultation confirmed {formatIsoDate(item.confirmedOn)} by {item.source}.
                {item.windowStart ? ` Window ${formatIsoDate(item.windowStart)}${item.windowEnd ? ` to ${formatIsoDate(item.windowEnd)}` : ""}.` : ""}
                {item.conditions ? ` Conditions: ${item.conditions}` : ""}
              </li>
            ))}
          </ul>
        ) : (
          <p>Consultation availability: not supplied.</p>
        )}
        {model.timing.treatmentWindows.length ? (
          <ul className="grid gap-2 text-sm">
            {model.timing.treatmentWindows.map((item) => (
              <li key={`${item.confirmedOn}-${item.source}`}>
                {`Treatment window confirmed ${formatIsoDate(item.confirmedOn)} by ${item.source}. ${item.windowStart ? formatIsoDate(item.windowStart) : "Start not supplied"}${item.windowEnd ? ` to ${formatIsoDate(item.windowEnd)}` : ""}. Conditions: ${supplied(item.conditions)}. Dependencies: ${supplied(item.dependencies)}.`}
              </li>
            ))}
          </ul>
        ) : (
          <p>Treatment window: not supplied.</p>
        )}
        {model.timing.showComparison ? (
          <p>
            {model.timing.ukLabel}: {model.timing.ukDetail}. This is not a count of weeks saved. Suitability and fitness to travel are separate questions.
          </p>
        ) : (
          <p>{model.timing.reason}</p>
        )}
      </section>

      <section className="grid gap-3">
        <h4 className="text-lg">Who is responsible</h4>
        <ul className="grid gap-3">
          {RESPONSIBILITY_KINDS.map((kind) => {
            const row = model.responsibilities.find((item) => item.kind === kind);
            const named = row?.partyName.trim() && row.contact.trim();
            return (
              <li key={kind}>
                <p className="font-medium">{RESPONSIBILITY_LABELS[kind]}</p>
                {named ? (
                  <p className="text-sm">
                    {row?.partyName} · {row?.contact}
                    {row?.description ? ` · ${row.description}` : ""}
                  </p>
                ) : (
                  <p className="text-sm">Not supplied</p>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </article>
  );
}
