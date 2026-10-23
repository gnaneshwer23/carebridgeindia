export const CONCERN_OPTIONS = [
  { value: "time", label: "My wait is too long" },
  { value: "cost", label: "My quote is too expensive" },
  { value: "both", label: "Both the wait and the cost" },
] as const;

export const PROCEDURE_OPTIONS = [
  { value: "hip", label: "Hip replacement" },
  { value: "knee", label: "Knee replacement" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const DISCUSSED_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not_sure", label: "Not sure" },
] as const;

export const NATION_OPTIONS = [
  { value: "england", label: "England" },
  { value: "scotland", label: "Scotland" },
  { value: "wales", label: "Wales" },
  { value: "northern_ireland", label: "Northern Ireland" },
] as const;

export const WAIT_KIND_OPTIONS = [
  { value: "appointment_date", label: "I have a treatment date" },
  { value: "estimate", label: "I was given an estimate" },
  { value: "assumption", label: "This is my own assumption" },
  { value: "unknown", label: "I don't know" },
] as const;

export const TIMEFRAME_OPTIONS = [
  "As soon as a suitable date is confirmed",
  "Within 3 months",
  "Within 6 months",
  "I am still researching",
  "Not sure",
] as const;

export const STATUS_LABELS: Record<string, string> = {
  enquiry_received: "Enquiry received",
  coordinator_review: "Coordinator review",
  awaiting_provider: "Waiting for a provider proposal",
  clinical_assessment: "Clinical assessment",
  comparing: "Comparing proposals",
  decision: "Your decision",
  preparing: "Preparing",
  treatment: "Treatment",
  follow_up: "Follow-up",
  paused: "Paused",
  declined: "Closed — you decided not to continue",
  closed: "Closed",
};

export const ACTION_OWNER_LABELS: Record<string, string> = {
  patient: "You",
  coordinator: "Coordinator",
  provider: "Provider",
};

export const LATER_STATUSES = ["preparing", "treatment", "follow_up"] as const;

export function labelFor(
  options: readonly { value: string; label: string }[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? value;
}

export const CONSENT_STATEMENT =
  "I understand this enquiry will be stored so a coordinator can review it. Procedure, wait and quote details can reveal information about my health. This is not a live clinical service. I will not include a medical history, NHS number or documents. An acknowledgement is not clinical acceptance and does not reserve a treatment date.";

export const CONSENT_VERSION = "2026-10-23";
