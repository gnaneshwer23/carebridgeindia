export const REQUIRED_CREDENTIAL_CHECKS = [
  {
    type: "hospital_registration",
    label: "Hospital registration",
    hint: "Registration body, number, and the accreditation actually held.",
    clinician: false,
  },
  {
    type: "clinician_registration_identity",
    label: "Clinician registration and identity",
    hint: "How the named clinician’s registration and identity were checked.",
    clinician: true,
  },
  {
    type: "treatment_pathway",
    label: "Agreed treatment pathway",
    hint: "The procedure this provider may be asked to price, and any acceptance limits.",
    clinician: false,
  },
  {
    type: "proposal_template",
    label: "Proposal template",
    hint: "The written template used for an itemised proposal.",
    clinician: false,
  },
  {
    type: "response_expectations",
    label: "Response expectations",
    hint: "How quickly the provider is expected to answer, and what happens if they do not.",
    clinician: false,
  },
  {
    type: "deposits_cancellations_extra_costs",
    label: "Deposits, cancellations and extra costs",
    hint: "What can be charged, refunded, or left unpriced.",
    clinician: false,
  },
  {
    type: "recovery_complication_complaint",
    label: "Recovery, complication and complaint responsibilities",
    hint: "Who is responsible for recovery, a complication, and a complaint.",
    clinician: false,
  },
  {
    type: "insurance_contract",
    label: "Insurance and contract note",
    hint: "The insurance or contract position agreed before a live case.",
    clinician: false,
  },
  {
    type: "patient_information_sharing",
    label: "How patient information will be shared",
    hint: "What would be shared, with whom, and that it is reviewed before any records move.",
    clinician: false,
  },
] as const;

export type CredentialCheckType = (typeof REQUIRED_CREDENTIAL_CHECKS)[number]["type"];

export function recordedCredentialNote(value: string | null | undefined) {
  return (value ?? "").trim();
}

export function credentialChecksComplete(
  notes: Partial<Record<CredentialCheckType, string>>,
) {
  return REQUIRED_CREDENTIAL_CHECKS.every(
    (check) => recordedCredentialNote(notes[check.type]).length >= 2,
  );
}

export function missingCredentialChecks(
  notes: Partial<Record<CredentialCheckType, string>>,
) {
  return REQUIRED_CREDENTIAL_CHECKS.filter(
    (check) => recordedCredentialNote(notes[check.type]).length < 2,
  );
}

export function canApproveForLiveCases(
  notes: Partial<Record<CredentialCheckType, string>>,
  confirmed: boolean,
) {
  return confirmed && credentialChecksComplete(notes);
}
