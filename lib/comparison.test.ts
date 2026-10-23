import assert from "node:assert/strict";
import test from "node:test";
import {
  REQUIRED_COST_CATEGORIES,
  compareCosts,
  compareTiming,
  responsibilitiesComplete,
  type CostLineInput,
} from "./comparison";

function lines(
  overrides: Partial<Record<string, Partial<CostLineInput>>> = {},
): CostLineInput[] {
  return REQUIRED_COST_CATEGORIES.map((category) => {
    const override = overrides[category] ?? {};
    return {
      category,
      label: category,
      amountMinor: 1000,
      certainty: "confirmed" as const,
      ...override,
    };
  });
}

test("unknown costs are excluded and block a savings headline", () => {
  const result = compareCosts({
    lines: lines({ travel: { certainty: "unknown", amountMinor: 0 } }),
    currency: "GBP",
    gbpPerUnit: null,
    ukAmountMinor: 1_500_000,
    ukSource: "patient_quote",
  });
  assert.equal(result.complete, false);
  assert.equal(result.expectedMinor, null);
  assert.equal(result.savings, null);
  assert.match(result.blockedReason ?? "", /not treated as zero/);
  assert.equal(result.confirmedMinor, (REQUIRED_COST_CATEGORIES.length - 1) * 1000);
});

test("a missing category blocks the total", () => {
  const result = compareCosts({
    lines: lines().filter((line) => line.category !== "implants"),
    currency: "GBP",
    gbpPerUnit: null,
    ukAmountMinor: 5000,
    ukSource: "patient_quote",
  });
  assert.deepEqual(result.missingCategories, ["implants"]);
  assert.equal(result.savings, null);
});

test("a confirmed zero is a real amount", () => {
  const result = compareCosts({
    lines: lines({ companion: { amountMinor: 0, certainty: "confirmed" } }),
    currency: "GBP",
    gbpPerUnit: null,
    ukAmountMinor: 20_000,
    ukSource: "published_benchmark",
  });
  assert.equal(result.complete, true);
  assert.equal(result.expectedMinor, (REQUIRED_COST_CATEGORIES.length - 1) * 1000);
});

test("savings may be negative", () => {
  const result = compareCosts({
    lines: lines(),
    currency: "GBP",
    gbpPerUnit: null,
    ukAmountMinor: 1000,
    ukSource: "patient_quote",
  });
  assert.ok(result.savings);
  assert.equal(result.savings?.differenceGbpMinor, 1000 - REQUIRED_COST_CATEGORIES.length * 1000);
  assert.ok((result.savings?.differenceGbpMinor ?? 0) < 0);
});

test("non-GBP prices need an exchange rate before savings", () => {
  const blocked = compareCosts({
    lines: lines(),
    currency: "INR",
    gbpPerUnit: null,
    ukAmountMinor: 1_000_000,
    ukSource: "patient_quote",
  });
  assert.equal(blocked.savings, null);
  assert.match(blocked.blockedReason ?? "", /exchange rate/);

  const converted = compareCosts({
    lines: lines({ surgeon: { amountMinor: 100_000, certainty: "confirmed" } }).map(
      (line) =>
        line.category === "surgeon"
          ? line
          : { ...line, amountMinor: 0, certainty: "confirmed" as const },
    ),
    currency: "INR",
    gbpPerUnit: 0.0089,
    ukAmountMinor: 2000,
    ukSource: "patient_quote",
  });
  assert.equal(converted.expectedGbpMinor, Math.round(100_000 * 0.0089));
  assert.equal(converted.savings?.differenceGbpMinor, 2000 - Math.round(100_000 * 0.0089));
});

test("consultation dates are not compared with treatment dates", () => {
  const result = compareTiming({
    ukWaitKind: "appointment_date",
    ukWaitDetail: "2026-11-02",
    availabilities: [
      {
        kind: "consultation",
        source: "Hospital coordinator",
        confirmedOn: "2026-10-01",
        windowStart: "2026-11-01",
        windowEnd: null,
        conditions: "Subject to records",
        dependencies: "",
      },
    ],
  });
  assert.equal(result.showComparison, false);
  assert.match(result.reason ?? "", /consultation date/);
  assert.equal("weeksSaved" in result, false);
});

test("a treatment window can sit beside a labelled UK date without a weeks-saved figure", () => {
  const result = compareTiming({
    ukWaitKind: "estimate",
    ukWaitDetail: "About 40 weeks",
    availabilities: [
      {
        kind: "treatment_window",
        source: "International desk, 1 Oct 2026",
        confirmedOn: "2026-10-01",
        windowStart: "2027-01-06",
        windowEnd: "2027-01-20",
        conditions: "Clinical clearance and fitness to travel",
        dependencies: "Records and a deposit",
      },
    ],
  });
  assert.equal(result.showComparison, true);
  assert.match(result.ukLabel ?? "", /estimate/);
  assert.equal(result.ukDetail, "About 40 weeks");
  assert.equal("weeksSaved" in result, false);
});

test("responsibilities need a named party and contact", () => {
  assert.equal(
    responsibilitiesComplete([
      { kind: "clinical_assessment", partyName: "Dr Shah", contact: "desk@example.com" },
      { kind: "complications", partyName: "Hospital", contact: "+91 00" },
      { kind: "follow_up", partyName: "UK physio", contact: "clinic@example.com" },
      { kind: "escalation", partyName: "Coordinator", contact: "coord@example.com" },
    ]),
    true,
  );
  assert.equal(
    responsibilitiesComplete([
      { kind: "clinical_assessment", partyName: "Dr Shah", contact: "" },
    ]),
    false,
  );
});
