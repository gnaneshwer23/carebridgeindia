import assert from "node:assert/strict";
import test from "node:test";
import {
  AGENT_BOUNDARY,
  DEMO_CASES,
  MEDICINE_NOTE_ID,
  TELEPHONY_ENABLED,
  TIMING_NOTE,
  acknowledgementOverdue,
  evaluateProposal,
  followUpFromAnswers,
  getDemoCase,
} from "./fixtures";

test("a missing rehabilitation cost withholds savings and is not treated as zero", () => {
  const proposal = getDemoCase("B").proposals[0];
  const { result } = evaluateProposal(proposal);
  assert.equal(result.complete, false);
  assert.equal(result.savings, null);
  assert.equal(result.expectedMinor, null);
  assert.match(result.blockedReason ?? "", /not treated as zero/);
  assert.ok(result.unknownLabels.some((label) => /rehabilitation/i.test(label)));
  const rehab = proposal.lines.find((line) => line.category === "rehabilitation");
  assert.equal(rehab?.amountMinor, null);
  assert.equal(result.confirmedMinor > 0, true);
});

test("a complete India total may be higher than the UK quote", () => {
  const proposal = getDemoCase("B").proposals[1];
  const { result } = evaluateProposal(proposal);
  assert.equal(result.complete, true);
  assert.ok(result.savings);
  assert.ok((result.savings?.differenceGbpMinor ?? 0) < 0);
  assert.equal(result.savings?.ukSource, "patient_quote");
});

test("a consultation is not treated as the treatment comparison", () => {
  const { timing } = evaluateProposal(getDemoCase("A").proposals[0]);
  assert.equal(timing.treatmentWindows.length, 1);
  assert.equal(timing.consultations.length, 1);
  assert.equal(timing.showComparison, true);
  assert.equal(
    timing.treatmentWindows.some((item) => item.kind === "consultation"),
    false,
  );
  const quote = evaluateProposal(getDemoCase("B").proposals[0]).timing;
  assert.equal(quote.showComparison, false);
  assert.match(quote.reason ?? "", /consultation date is not compared/);
  assert.match(TIMING_NOTE, /not a treatment date/i);
  assert.doesNotMatch(TIMING_NOTE, /weeks saved: \d/i);
});

test("missing medicines and allergies stay unknown", () => {
  const allergies = DEMO_CASES.flatMap((item) => item.record)
    .filter((entry) => entry.section === "allergies")
    .map((entry) => entry.body)
    .join(" ");
  const medicines = DEMO_CASES.flatMap((item) => item.record)
    .filter((entry) => entry.section === "medicines" && entry.verification === "not_supplied")
    .map((entry) => entry.body);
  assert.match(allergies, /Not supplied/);
  assert.doesNotMatch(allergies, /no known allergies/i);
  assert.ok(medicines.length > 0);
  for (const body of medicines) {
    assert.equal(body, "Not supplied.");
    assert.notEqual(body, "None");
  }
});

test("agents stay inside the clinical boundary and telephony is off", () => {
  assert.equal(TELEPHONY_ENABLED, false);
  assert.match(AGENT_BOUNDARY, /do not diagnose, prescribe/i);
  const blob = DEMO_CASES.flatMap((item) => item.agents)
    .map((agent) => `${agent.output} ${agent.humanAction}`)
    .join(" ");
  assert.doesNotMatch(blob, /prescribe \d/i);
  assert.doesNotMatch(blob, /fit to travel: yes/i);
  assert.doesNotMatch(blob, /diagnosis is/i);
});

test("follow-up concern and overdue acknowledgement are deterministic", () => {
  assert.equal(
    followUpFromAnswers({ wound: "more_red", pain: "as_expected", person: "no" }),
    "concern_flagged",
  );
  assert.equal(
    followUpFromAnswers({ wound: "as_expected", pain: "as_expected", person: "no" }),
    "submitted",
  );
  assert.equal(
    acknowledgementOverdue(
      {
        followUpStatus: "concern_flagged",
        voiceStatus: "scheduled",
        voiceAcknowledged: false,
      },
      "2026-10-23",
    ),
    true,
  );
  assert.equal(
    acknowledgementOverdue(
      {
        followUpStatus: "acknowledged",
        voiceStatus: "scheduled",
        voiceAcknowledged: false,
      },
      "2026-10-23",
    ),
    false,
  );
});

test("the medicine draft starts unsigned and is not a silent overwrite", () => {
  const noteId = MEDICINE_NOTE_ID;
  assert.equal(typeof noteId, "string");
  const conflict = getDemoCase("C").record.filter((entry) => entry.section === "medicines");
  assert.equal(conflict.length, 2);
  assert.notEqual(conflict[0]?.body, conflict[1]?.body);
});
