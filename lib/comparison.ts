export const REQUIRED_COST_CATEGORIES = [
  "surgeon",
  "hospital",
  "anaesthesia",
  "investigations",
  "implants",
  "travel",
  "accommodation",
  "transfers",
  "companion",
  "rehabilitation",
  "follow_up",
  "platform_fee",
] as const;

export type CostCategory = (typeof REQUIRED_COST_CATEGORIES)[number];

export const COST_CATEGORY_LABELS: Record<CostCategory, string> = {
  surgeon: "Surgeon",
  hospital: "Hospital",
  anaesthesia: "Anaesthesia",
  investigations: "Investigations",
  implants: "Implants",
  travel: "Travel",
  accommodation: "Accommodation",
  transfers: "Transfers",
  companion: "Companion",
  rehabilitation: "Rehabilitation",
  follow_up: "Agreed follow-up",
  platform_fee: "Coordination fee",
};

export const COST_GROUPS: { title: string; categories: CostCategory[] }[] = [
  {
    title: "Clinical costs",
    categories: [
      "surgeon",
      "hospital",
      "anaesthesia",
      "investigations",
      "implants",
    ],
  },
  {
    title: "Journey costs",
    categories: ["travel", "accommodation", "transfers", "companion"],
  },
  {
    title: "Recovery costs",
    categories: ["rehabilitation", "follow_up"],
  },
  {
    title: "Coordination fee",
    categories: ["platform_fee"],
  },
];

export const RESPONSIBILITY_KINDS = [
  "clinical_assessment",
  "complications",
  "follow_up",
  "escalation",
] as const;

export type ResponsibilityKind = (typeof RESPONSIBILITY_KINDS)[number];

export const RESPONSIBILITY_LABELS: Record<ResponsibilityKind, string> = {
  clinical_assessment: "Clinical assessment",
  complications: "Complications",
  follow_up: "Follow-up",
  escalation: "Escalation contact",
};

export type CostCertainty = "confirmed" | "estimated" | "unknown";

export type CostLineInput = {
  category: string;
  label: string;
  amountMinor: number | null;
  certainty: CostCertainty;
};

export type UkSource = "patient_quote" | "published_benchmark";

export type ComparisonResult = {
  confirmedMinor: number;
  estimatedMinor: number;
  missingCategories: string[];
  unknownLabels: string[];
  complete: boolean;
  expectedMinor: number | null;
  expectedGbpMinor: number | null;
  savings: {
    differenceGbpMinor: number;
    ukSource: UkSource;
    ukAmountMinor: number;
  } | null;
  blockedReason: string | null;
};

const SAVINGS_INCOMPLETE =
  "A savings figure is withheld because some costs are missing or marked not supplied. Unknown amounts are not treated as zero.";
const SAVINGS_RATE =
  "A savings figure is withheld because the exchange rate is missing.";
const SAVINGS_UK =
  "A savings figure is withheld because there is no comparable UK quote or published benchmark.";

export function compareCosts(input: {
  lines: CostLineInput[];
  currency: string;
  gbpPerUnit: number | null;
  ukAmountMinor: number | null;
  ukSource: UkSource | null;
}): ComparisonResult {
  const byCategory = new Map<string, CostLineInput[]>();
  for (const line of input.lines) {
    const list = byCategory.get(line.category) ?? [];
    list.push(line);
    byCategory.set(line.category, list);
  }

  const missingCategories = REQUIRED_COST_CATEGORIES.filter(
    (category) => !byCategory.has(category),
  );
  const unknownLabels: string[] = [];
  let confirmedMinor = 0;
  let estimatedMinor = 0;

  for (const line of input.lines) {
    const known =
      line.certainty !== "unknown" &&
      line.amountMinor !== null &&
      Number.isInteger(line.amountMinor) &&
      line.amountMinor >= 0;
    if (!known) {
      unknownLabels.push(line.label || line.category);
      continue;
    }
    if (line.certainty === "confirmed") confirmedMinor += line.amountMinor!;
    if (line.certainty === "estimated") estimatedMinor += line.amountMinor!;
  }

  const complete = missingCategories.length === 0 && unknownLabels.length === 0;
  const expectedMinor = complete ? confirmedMinor + estimatedMinor : null;
  const rate = input.currency === "GBP" ? 1 : input.gbpPerUnit;
  const conversionReady =
    rate !== null && Number.isFinite(rate) && rate > 0 && expectedMinor !== null;
  const expectedGbpMinor = conversionReady
    ? Math.round(expectedMinor! * rate!)
    : null;

  let blockedReason: string | null = null;
  let savings: ComparisonResult["savings"] = null;
  if (!complete) blockedReason = SAVINGS_INCOMPLETE;
  else if (!conversionReady) blockedReason = SAVINGS_RATE;
  else if (input.ukAmountMinor === null || input.ukSource === null)
    blockedReason = SAVINGS_UK;
  else
    savings = {
      differenceGbpMinor: input.ukAmountMinor - expectedGbpMinor!,
      ukSource: input.ukSource,
      ukAmountMinor: input.ukAmountMinor,
    };

  return {
    confirmedMinor,
    estimatedMinor,
    missingCategories: [...missingCategories],
    unknownLabels,
    complete,
    expectedMinor,
    expectedGbpMinor,
    savings,
    blockedReason,
  };
}

export type AvailabilityInput = {
  kind: "consultation" | "treatment_window";
  source: string;
  confirmedOn: string;
  windowStart: string | null;
  windowEnd: string | null;
  conditions: string;
  dependencies: string;
};

export type TimingResult = {
  showComparison: boolean;
  reason: string | null;
  ukLabel: string | null;
  ukDetail: string | null;
  treatmentWindows: AvailabilityInput[];
  consultations: AvailabilityInput[];
};

export function compareTiming(input: {
  ukWaitKind: "appointment_date" | "estimate" | "assumption" | "unknown";
  ukWaitDetail: string | null;
  availabilities: AvailabilityInput[];
}): TimingResult {
  const treatmentWindows = input.availabilities.filter(
    (item) => item.kind === "treatment_window" && item.source && item.confirmedOn,
  );
  const consultations = input.availabilities.filter(
    (item) => item.kind === "consultation" && item.source && item.confirmedOn,
  );
  const ukDetail = input.ukWaitDetail?.trim() || null;
  const ukKnown =
    input.ukWaitKind !== "unknown" && ukDetail !== null && ukDetail.length > 0;

  if (treatmentWindows.length === 0) {
    return {
      showComparison: false,
      reason:
        consultations.length > 0
          ? "A consultation date is not compared with a treatment date."
          : "No provider-confirmed treatment window has been supplied.",
      ukLabel: null,
      ukDetail: null,
      treatmentWindows,
      consultations,
    };
  }

  if (!ukKnown) {
    return {
      showComparison: false,
      reason:
        "No UK treatment date or estimate was supplied, so no time comparison is shown.",
      ukLabel: null,
      ukDetail: null,
      treatmentWindows,
      consultations,
    };
  }

  const ukLabel =
    input.ukWaitKind === "appointment_date"
      ? "UK treatment date you supplied"
      : input.ukWaitKind === "estimate"
        ? "UK wait you were given, as an estimate"
        : "UK timing you supplied as your own assumption";

  return {
    showComparison: true,
    reason: null,
    ukLabel,
    ukDetail,
    treatmentWindows,
    consultations,
  };
}

export function responsibilitiesComplete(
  rows: { kind: string; partyName: string; contact: string }[],
) {
  return RESPONSIBILITY_KINDS.every((kind) =>
    rows.some(
      (row) =>
        row.kind === kind && row.partyName.trim() && row.contact.trim(),
    ),
  );
}
