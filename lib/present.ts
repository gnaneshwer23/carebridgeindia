import { compareCosts, compareTiming, type CostCertainty } from "./comparison";
import type { ComparisonModel } from "@/components/comparison-view";
import { minorToPounds } from "./format";

type Line = {
  category: string;
  label: string;
  amountMinor: number | null;
  certainty: CostCertainty;
};

type Availability = {
  kind: "consultation" | "treatment_window";
  source: string;
  confirmedOn: string;
  windowStart: string | null;
  windowEnd: string | null;
  conditions: string;
  dependencies: string;
};

type Duty = {
  kind: "clinical_assessment" | "complications" | "follow_up" | "escalation";
  partyName: string;
  contact: string;
  description: string;
};

export type PresentableProposal = {
  proposal: {
    version: number;
    publishedAt: Date | null;
    procedureExact: string;
    laterality: string;
    packageSpec: string;
    currency: string;
    gbpPerUnit: string | null;
    exchangeRateOn: string | null;
    exchangeRateLabel: string | null;
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
    id: string;
    status: string;
  };
  providerName: string;
  registrationNotes: string | null;
  approvedForLiveCases: boolean;
  clinicianName: string | null;
  registrationBody: string | null;
  registrationNumber: string | null;
  lines: Line[];
  availability: Availability[];
  responsibilities: Duty[];
};

export function presentProposal(
  row: PresentableProposal,
  wait: {
    ukWaitKind: "appointment_date" | "estimate" | "assumption" | "unknown";
    ukWaitDetail: string | null;
  },
): ComparisonModel {
  const rate =
    row.proposal.currency === "GBP"
      ? 1
      : row.proposal.gbpPerUnit
        ? Number(row.proposal.gbpPerUnit)
        : null;
  return {
    version: row.proposal.version,
    publishedLabel: row.proposal.publishedAt
      ? row.proposal.publishedAt.toLocaleString("en-GB", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Europe/London",
        })
      : null,
    procedureExact: row.proposal.procedureExact,
    laterality: row.proposal.laterality,
    packageSpec: row.proposal.packageSpec,
    providerName: row.providerName,
    clinicianName: row.clinicianName ?? "",
    registrationBody: row.registrationBody,
    registrationNumber: row.registrationNumber,
    approvedForLiveCases: row.approvedForLiveCases,
    currency: row.proposal.currency,
    exchangeRateOn: row.proposal.exchangeRateOn,
    exchangeRateLabel: row.proposal.exchangeRateLabel,
    gbpPerUnit: row.proposal.gbpPerUnit,
    expiresOn: row.proposal.expiresOn,
    cancellationTerms: row.proposal.cancellationTerms,
    paymentRecipient: row.proposal.paymentRecipient,
    exclusions: row.proposal.exclusions,
    unpricedItems: row.proposal.unpricedItems,
    contingency: row.proposal.contingency,
    ukSource: row.proposal.ukSource,
    ukAmountMinor: row.proposal.ukAmountMinor,
    ukBenchmarkLabel: row.proposal.ukBenchmarkLabel,
    ukBenchmarkDate: row.proposal.ukBenchmarkDate,
    lines: row.lines,
    responsibilities: row.responsibilities,
    result: compareCosts({
      lines: row.lines,
      currency: row.proposal.currency,
      gbpPerUnit: rate,
      ukAmountMinor: row.proposal.ukAmountMinor,
      ukSource: row.proposal.ukSource,
    }),
    timing: compareTiming({
      ukWaitKind: wait.ukWaitKind,
      ukWaitDetail: wait.ukWaitDetail,
      availabilities: row.availability,
    }),
  };
}

export type ProposalDraft = {
  id: string;
  version: number;
  procedureExact: string;
  laterality: string;
  packageSpec: string;
  currency: string;
  gbpPerUnit: string;
  exchangeRateOn: string;
  exchangeRateLabel: string;
  ukSource: string;
  ukAmount: string;
  ukBenchmarkLabel: string;
  ukBenchmarkDate: string;
  cancellationTerms: string;
  paymentRecipient: string;
  exclusions: string;
  unpricedItems: string;
  contingency: string;
  expiresOn: string;
  providerName: string;
  registrationNotes: string;
  clinicianName: string;
  registrationBody: string;
  registrationNumber: string;
  lines: { category: string; label: string; amount: string; certainty: string }[];
  consultation: Availability | null;
  treatment: Availability | null;
  responsibilities: Record<string, { party: string; contact: string; description: string }>;
};

export function toDraft(row: PresentableProposal): ProposalDraft {
  return {
    id: row.proposal.id,
    version: row.proposal.version,
    procedureExact: row.proposal.procedureExact,
    laterality: row.proposal.laterality,
    packageSpec: row.proposal.packageSpec,
    currency: row.proposal.currency,
    gbpPerUnit: row.proposal.currency === "GBP" ? "" : row.proposal.gbpPerUnit ?? "",
    exchangeRateOn: row.proposal.exchangeRateOn ?? "",
    exchangeRateLabel: row.proposal.exchangeRateLabel ?? "",
    ukSource: row.proposal.ukSource ?? "",
    ukAmount: minorToPounds(row.proposal.ukAmountMinor),
    ukBenchmarkLabel: row.proposal.ukBenchmarkLabel ?? "",
    ukBenchmarkDate: row.proposal.ukBenchmarkDate ?? "",
    cancellationTerms: row.proposal.cancellationTerms,
    paymentRecipient: row.proposal.paymentRecipient,
    exclusions: row.proposal.exclusions,
    unpricedItems: row.proposal.unpricedItems,
    contingency: row.proposal.contingency,
    expiresOn: row.proposal.expiresOn ?? "",
    providerName: row.providerName,
    registrationNotes: row.registrationNotes ?? "",
    clinicianName: row.clinicianName ?? "",
    registrationBody: row.registrationBody ?? "",
    registrationNumber: row.registrationNumber ?? "",
    lines: row.lines.map((line) => ({
      category: line.category,
      label: line.label,
      amount: minorToPounds(line.amountMinor),
      certainty: line.certainty,
    })),
    consultation: row.availability.find((item) => item.kind === "consultation") ?? null,
    treatment: row.availability.find((item) => item.kind === "treatment_window") ?? null,
    responsibilities: Object.fromEntries(
      row.responsibilities.map((duty) => [
        duty.kind,
        {
          party: duty.partyName,
          contact: duty.contact,
          description: duty.description,
        },
      ]),
    ),
  };
}
