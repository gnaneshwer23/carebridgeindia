import assert from "node:assert/strict";
import test from "node:test";
import {
  REQUIRED_CREDENTIAL_CHECKS,
  canApproveForLiveCases,
  credentialChecksComplete,
  missingCredentialChecks,
  type CredentialCheckType,
} from "./provider-checks";

function notes(value = "Checked against the provider’s written record.") {
  return Object.fromEntries(
    REQUIRED_CREDENTIAL_CHECKS.map((check) => [check.type, value]),
  ) as Record<CredentialCheckType, string>;
}

test("live approval needs every credential check and an explicit confirmation", () => {
  const complete = notes();
  assert.equal(credentialChecksComplete(complete), true);
  assert.equal(canApproveForLiveCases(complete, false), false);
  assert.equal(canApproveForLiveCases(complete, true), true);

  const incomplete = notes();
  incomplete.insurance_contract = " ";
  assert.equal(credentialChecksComplete(incomplete), false);
  assert.equal(canApproveForLiveCases(incomplete, true), false);
  assert.deepEqual(
    missingCredentialChecks(incomplete).map((check) => check.type),
    ["insurance_contract"],
  );
});
