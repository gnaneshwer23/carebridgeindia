import {
  COST_CATEGORY_LABELS,
  compareCosts,
  compareTiming,
  type AvailabilityInput,
  type CostCategory,
  type CostCertainty,
  type UkSource,
} from "@/lib/comparison";

export const TELEPHONY_ENABLED = false;

export const RESPONSIBLE_CLINICIAN = "Reviewing clinician (demonstration)";
export const RESPONSIBLE_COORDINATOR = "Care coordinator (demonstration)";
export const ACK_DUE_ON = "2026-10-01";
/** Fixed demonstration clock so overdue examples stay stable during prerender. */
export const DEMO_TODAY = "2026-10-23";

export const TIMING_NOTE =
  "The UK timing and the treatment window are shown side by side. A consultation is listed separately and is not a treatment date. No weeks-saved figure is calculated.";

export const AGENT_BOUNDARY =
  "Simulated fixtures only. These agents do not diagnose, prescribe, change medicines, judge fitness to travel, approve discharge, or close a clinical concern. Documents and messages are untrusted data and cannot change permissions or authorise a call, a payment, or any external action.";

export type CaseId = "A" | "B" | "C" | "D";

export type Presentation =
  | "quoted"
  | "included"
  | "estimated"
  | "unknown"
  | "not_applicable";

export type DemoLine = {
  category: CostCategory;
  amountMinor: number | null;
  certainty: CostCertainty;
  presentation: Presentation;
};

export type DemoProposal = {
  id: string;
  version: number;
  changeNote: string;
  currency: "GBP";
  gbpPerUnit: number | null;
  exchangeSource: string;
  exchangeTimestamp: string | null;
  ukAmountMinor: number | null;
  ukSource: UkSource | null;
  ukLabel: string;
  lines: DemoLine[];
  ukWaitKind: "appointment_date" | "estimate" | "assumption" | "unknown";
  ukWaitDetail: string | null;
  availabilities: AvailabilityInput[];
  expiresOn: string;
  conditions: string;
};

export type Verification =
  | "patient_reported"
  | "imported"
  | "ai_draft"
  | "clinician_verified"
  | "not_supplied";

export const VERIFICATION_LABELS: Record<Verification, string> = {
  patient_reported: "Patient reported",
  imported: "Imported",
  ai_draft: "AI draft",
  clinician_verified: "Clinician verified",
  not_supplied: "Not supplied",
};

export type RecordSection =
  | "summary"
  | "history"
  | "medicines"
  | "allergies"
  | "documents"
  | "encounters"
  | "plan"
  | "tasks"
  | "follow_up"
  | "notes";

export type RecordEntry = {
  id: string;
  section: RecordSection;
  title: string;
  body: string;
  source: string;
  eventDate: string;
  author: string;
  verification: Verification;
  reviewer: string | null;
};

export type AgentCard = {
  name: "Intake" | "Record" | "Summary" | "Coordination" | "Follow-up" | "Escalation";
  status: string;
  source: string;
  output: string;
  humanAction: string;
};

export type DemoCase = {
  id: CaseId;
  reference: string;
  title: string;
  person: string;
  procedure: string;
  concern: string;
  stage: string;
  summary: string;
  nextAction: string;
  owner: string;
  proposals: DemoProposal[];
  appointments: {
    status: "requested" | "confirmed";
    title: string;
    when: string;
    note: string;
  }[];
  tasks: { title: string; owner: string; status: string }[];
  team: { role: string; name: string }[];
  documents: { title: string; source: string; date: string; verification: Verification }[];
  preferences: string;
  record: RecordEntry[];
  agents: AgentCard[];
};

export type FollowUpStatus =
  | "due"
  | "submitted"
  | "awaiting_review"
  | "concern_flagged"
  | "acknowledged"
  | "action_recorded";

export type VoiceStatus =
  | "scheduled"
  | "permission_checked"
  | "connected"
  | "identity_checked"
  | "approved_questions"
  | "draft_summary"
  | "human_review"
  | "no_answer"
  | "wrong_person"
  | "disconnected"
  | "requests_person"
  | "permission_withdrawn"
  | "escalation_awaiting";

export type ScreenState = "ready" | "loading" | "empty" | "error" | "completed";

export type ClinicianStatus =
  | "none"
  | "submitted"
  | "under_review"
  | "more_information"
  | "approved"
  | "declined"
  | "suspended"
  | "expired";

export const CLINICIAN_STATUS_LABELS: Record<ClinicianStatus, string> = {
  none: "Not submitted",
  submitted: "Submitted",
  under_review: "Under review",
  more_information: "More information needed",
  approved: "Approved",
  declined: "Declined",
  suspended: "Suspended",
  expired: "Expired",
};

export type NoteVersion = {
  version: number;
  body: string;
  author: string;
  action: string;
  at: string;
};

export type NoteRecord = {
  status: "awaiting_review" | "signed" | "rejected" | "amended";
  body: string;
  reviewer: string | null;
  versions: NoteVersion[];
};

export type DemoProfile = {
  name: string;
  email: string;
  nation: string;
  location: string;
  concern: "time" | "cost" | "both";
  procedure: "hip" | "knee" | "not_sure";
  preference: "email" | "phone";
  language: string;
};

export type DemoPersisted = {
  profile: DemoProfile | null;
  clinician: {
    name: string;
    organisation: string;
    specialty: string;
    jurisdiction: string;
    registrationBody: string;
    registrationNumber: string;
    intendedRole: string;
    status: ClinicianStatus;
  };
  exploreRole: "pending" | "verified";
  activeCase: CaseId;
  screen: ScreenState;
  notes: Record<string, NoteRecord>;
  followUpStatus: FollowUpStatus;
  followUpAnswers: { wound: string; pain: string; person: string };
  followUpResponse: string;
  voiceStatus: VoiceStatus;
  voiceAcknowledged: boolean;
};

const DRAFT_BODY =
  "The patient-reported list says ramipril 5 mg once daily. The imported letter says ramipril 10 mg once daily. This draft does not choose a dose, change the medicine, or give a diagnosis.";

export const MEDICINE_NOTE_ID = "c-medicine-draft";

export const DEFAULT_DEMO: DemoPersisted = {
  profile: null,
  clinician: {
    name: "",
    organisation: "",
    specialty: "",
    jurisdiction: "",
    registrationBody: "",
    registrationNumber: "",
    intendedRole: "",
    status: "none",
  },
  exploreRole: "pending",
  activeCase: "A",
  screen: "ready",
  notes: {
    [MEDICINE_NOTE_ID]: {
      status: "awaiting_review",
      body: DRAFT_BODY,
      reviewer: null,
      versions: [
        {
          version: 1,
          body: DRAFT_BODY,
          author: "Record agent",
          action: "Draft created from the two sources",
          at: "2026-10-20",
        },
      ],
    },
  },
  followUpStatus: "due",
  followUpAnswers: { wound: "", pain: "", person: "" },
  followUpResponse: "",
  voiceStatus: "scheduled",
  voiceAcknowledged: false,
};

function line(
  category: CostCategory,
  amountMinor: number | null,
  certainty: CostCertainty,
  presentation: Presentation,
): DemoLine {
  return { category, amountMinor, certainty, presentation };
}

function quoted(category: CostCategory, amountMinor: number): DemoLine {
  return line(category, amountMinor, "confirmed", "quoted");
}

const windowA: AvailabilityInput = {
  kind: "treatment_window",
  source: "Demonstration confirmation. No hospital is named.",
  confirmedOn: "2026-10-01",
  windowStart: "2026-11-16",
  windowEnd: "2026-11-27",
  conditions:
    "Conditional on clinical assessment. This does not reserve an operation.",
  dependencies: "Assessment outcome",
};

const consultA: AvailabilityInput = {
  kind: "consultation",
  source: "Requested assessment conversation",
  confirmedOn: "2026-10-12",
  windowStart: "2026-10-28",
  windowEnd: "2026-10-28",
  conditions: "A consultation only. Not a treatment date.",
  dependencies: "Not supplied",
};

function agentSet(focus: string): AgentCard[] {
  return [
    {
      name: "Intake",
      status: "Fixture ready",
      source: "The fictional enquiry fields for this case",
      output: `Structured the concern for ${focus}. Did not decide suitability.`,
      humanAction: "A coordinator still has to read the enquiry.",
    },
    {
      name: "Record",
      status: "Fixture ready",
      source: "Patient-reported text and imported documents in this case",
      output: "Listed conflicts and blanks. Did not change a medicine or fill an unknown.",
      humanAction: "A clinician reviews any draft before it can be signed.",
    },
    {
      name: "Summary",
      status: "Fixture ready",
      source: "The signed notes and the proposal text already on the case",
      output: "Prepared a short reading summary. It is not a diagnosis.",
      humanAction: "A clinician accepts or discards the summary.",
    },
    {
      name: "Coordination",
      status: "Fixture ready",
      source: "Open tasks and proposal gaps",
      output: "Listed the next human action and the responsible role.",
      humanAction: "The named role has to complete the action. Nothing is booked.",
    },
    {
      name: "Follow-up",
      status: "Fixture ready",
      source: "The fictional questionnaire and the voice transcript",
      output: "Passed answers through with their wording. Did not close a concern.",
      humanAction: "A clinician reviews flagged answers.",
    },
    {
      name: "Escalation",
      status: "Fixture ready",
      source: "A flagged follow-up or a voice branch that asks for a person",
      output: "Opened a queue item and named the responsible role. Did not contact emergency services.",
      humanAction: "The named clinician acknowledges the item and records a response.",
    },
  ];
}

const team = [
  { role: "Coordinator", name: RESPONSIBLE_COORDINATOR },
  { role: "Clinician", name: RESPONSIBLE_CLINICIAN },
];

const caseALines: DemoLine[] = [
  quoted("surgeon", 320_000),
  quoted("hospital", 410_000),
  quoted("anaesthesia", 45_000),
  quoted("investigations", 18_000),
  quoted("implants", 120_000),
  quoted("travel", 75_000),
  line("accommodation", 62_000, "estimated", "estimated"),
  quoted("transfers", 18_000),
  line("companion", 0, "confirmed", "not_applicable"),
  quoted("rehabilitation", 35_000),
  quoted("follow_up", 22_000),
  quoted("platform_fee", 30_000),
];

const caseBShared: DemoLine[] = [
  quoted("surgeon", 400_000),
  quoted("hospital", 500_000),
  quoted("anaesthesia", 60_000),
  quoted("investigations", 25_000),
  quoted("implants", 150_000),
  quoted("travel", 90_000),
  quoted("accommodation", 140_000),
  quoted("transfers", 20_000),
  quoted("companion", 40_000),
  quoted("follow_up", 30_000),
  quoted("platform_fee", 35_000),
];

export const DEMO_CASES: DemoCase[] = [
  {
    id: "A",
    reference: "DEMO-A",
    title: "Long wait",
    person: "Fictional patient A",
    procedure: "Hip replacement",
    concern: "The wait is too long",
    stage: "Assessment",
    summary:
      "The UK wait is an estimate of about 18 months. The India proposal includes a conditional treatment window and a separate consultation. Assessment tasks are still open.",
    nextAction: "Answer the assessment questions",
    owner: "Fictional patient A",
    proposals: [
      {
        id: "A-v1",
        version: 1,
        changeNote: "First demonstration proposal. Assessment is still required.",
        currency: "GBP",
        gbpPerUnit: null,
        exchangeSource: "Not used. Amounts are already in GBP.",
        exchangeTimestamp: null,
        ukAmountMinor: 1_600_000,
        ukSource: "published_benchmark",
        ukLabel:
          "Demonstration benchmark of £16,000, dated 1 March 2026. Not this person’s quote.",
        lines: caseALines,
        ukWaitKind: "estimate",
        ukWaitDetail:
          "About 18 months, given as an estimate by the booking office in March 2026. Not a treatment date.",
        availabilities: [windowA, consultA],
        expiresOn: "2026-12-01",
        conditions:
          "Conditional on assessment. Expires 1 December 2026. Complications are not included.",
      },
    ],
    appointments: [
      {
        status: "requested",
        title: "Assessment consultation",
        when: "Requested for the week of 28 October 2026",
        note: "Requested only. A consultation is not a treatment date and nothing is reserved.",
      },
    ],
    tasks: [
      {
        title: "Answer the assessment questions",
        owner: "Fictional patient A",
        status: "Open",
      },
      {
        title: "Check the treatment window still stands after assessment",
        owner: RESPONSIBLE_COORDINATOR,
        status: "Waiting on assessment",
      },
    ],
    team,
    documents: [
      {
        title: "Referral letter",
        source: "Not supplied",
        date: "Not supplied",
        verification: "not_supplied",
      },
    ],
    preferences: "Email. Europe/London. Demonstration only.",
    record: [
      {
        id: "a-summary",
        section: "summary",
        title: "Case summary",
        body: "Exploring a hip replacement because the UK date is an estimate, not a booked operation.",
        source: "Intake agent, from the fictional enquiry",
        eventDate: "2026-10-18",
        author: "Intake agent",
        verification: "ai_draft",
        reviewer: null,
      },
      {
        id: "a-history",
        section: "history",
        title: "History",
        body: "Not supplied. The demonstration does not invent a medical history.",
        source: "Not supplied",
        eventDate: "Not supplied",
        author: "Not supplied",
        verification: "not_supplied",
        reviewer: null,
      },
      {
        id: "a-meds",
        section: "medicines",
        title: "Medicines",
        body: "Not supplied.",
        source: "Not supplied",
        eventDate: "Not supplied",
        author: "Not supplied",
        verification: "not_supplied",
        reviewer: null,
      },
      {
        id: "a-allergy",
        section: "allergies",
        title: "Allergies",
        body: "Not supplied. This is not a statement that there are no allergies.",
        source: "Not supplied",
        eventDate: "Not supplied",
        author: "Not supplied",
        verification: "not_supplied",
        reviewer: null,
      },
    ],
    agents: agentSet("the long-wait enquiry"),
  },
  {
    id: "B",
    reference: "DEMO-B",
    title: "Expensive quote",
    person: "Fictional patient B",
    procedure: "Knee replacement",
    concern: "The private quote is too expensive",
    stage: "Comparing proposals",
    summary:
      "A UK private quote is set beside two India versions. Version 1 is missing rehabilitation, so no savings line is shown. Version 2 prices every line and the India total is higher.",
    nextAction: "Read both proposal versions before asking for another price",
    owner: "Fictional patient B",
    proposals: [
      {
        id: "B-v1",
        version: 1,
        changeNote:
          "Rehabilitation is not supplied. The expected total and any difference stay withheld.",
        currency: "GBP",
        gbpPerUnit: null,
        exchangeSource: "Not used. Amounts are already in GBP.",
        exchangeTimestamp: null,
        ukAmountMinor: 1_240_000,
        ukSource: "patient_quote",
        ukLabel: "Fictional UK private quote of £12,400, dated 12 September 2026.",
        lines: [
          ...caseBShared,
          line("rehabilitation", null, "unknown", "unknown"),
        ],
        ukWaitKind: "unknown",
        ukWaitDetail: null,
        availabilities: [
          {
            kind: "consultation",
            source: "Quote discussion",
            confirmedOn: "2026-10-08",
            windowStart: "2026-10-30",
            windowEnd: "2026-10-30",
            conditions: "Discussion only. Not a treatment date.",
            dependencies: "Not supplied",
          },
        ],
        expiresOn: "2026-11-30",
        conditions: "Incomplete price. Not a quote you can accept.",
      },
      {
        id: "B-v2",
        version: 2,
        changeNote:
          "Version 2 adds a confirmed rehabilitation amount and keeps the longer stay. Every required cost is supplied. The India total is higher than the UK quote. Version 1 is unchanged.",
        currency: "GBP",
        gbpPerUnit: null,
        exchangeSource: "Not used. Amounts are already in GBP.",
        exchangeTimestamp: null,
        ukAmountMinor: 1_240_000,
        ukSource: "patient_quote",
        ukLabel: "Same fictional UK private quote of £12,400, dated 12 September 2026.",
        lines: [...caseBShared, quoted("rehabilitation", 80_000)],
        ukWaitKind: "unknown",
        ukWaitDetail: null,
        availabilities: [],
        expiresOn: "2026-11-30",
        conditions:
          "Complete demonstration price. A higher India total is allowed. Extras and complications are not included.",
      },
    ],
    appointments: [
      {
        status: "requested",
        title: "Quote discussion",
        when: "Requested for 30 October 2026",
        note: "A requested conversation. It does not reserve treatment.",
      },
    ],
    tasks: [
      {
        title: "Do not treat the missing rehabilitation line as zero",
        owner: RESPONSIBLE_COORDINATOR,
        status: "Open",
      },
    ],
    team,
    documents: [
      {
        title: "UK quote the patient typed",
        source: "Patient reported",
        date: "2026-09-12",
        verification: "patient_reported",
      },
    ],
    preferences: "Email. Europe/London. Demonstration only.",
    record: [
      {
        id: "b-summary",
        section: "summary",
        title: "Case summary",
        body: "Comparing a fictional UK quote with an India journey cost. One version is incomplete.",
        source: "Coordination agent",
        eventDate: "2026-10-19",
        author: "Coordination agent",
        verification: "ai_draft",
        reviewer: null,
      },
      {
        id: "b-meds",
        section: "medicines",
        title: "Medicines",
        body: "Not supplied.",
        source: "Not supplied",
        eventDate: "Not supplied",
        author: "Not supplied",
        verification: "not_supplied",
        reviewer: null,
      },
    ],
    agents: agentSet("the quote comparison"),
  },
  {
    id: "C",
    reference: "DEMO-C",
    title: "Record conflict",
    person: "Fictional patient C",
    procedure: "Hip replacement",
    concern: "Both the wait and the cost",
    stage: "Record review",
    summary:
      "Two sources disagree about a ramipril dose. The record agent flags the conflict and leaves both entries in place. A clinician can reject the draft, sign it, or add an amendment.",
    nextAction: "Review the medicine conflict",
    owner: RESPONSIBLE_CLINICIAN,
    proposals: [],
    appointments: [
      {
        status: "confirmed",
        title: "Record review",
        when: "4 November 2026, 10:00 Europe/London",
        note: "A confirmed review conversation. It is not a treatment date.",
      },
    ],
    tasks: [
      {
        title: "Resolve the ramipril dose with a signed note or amendment",
        owner: RESPONSIBLE_CLINICIAN,
        status: "Open",
      },
    ],
    team,
    documents: [
      {
        title: "Fictional discharge letter",
        source: "Imported file in this demonstration",
        date: "2026-02-28",
        verification: "imported",
      },
      {
        title: "Patient medicine list",
        source: "Typed by the fictional patient",
        date: "2026-03-02",
        verification: "patient_reported",
      },
    ],
    preferences: "Phone only if the patient asks. Demonstration only.",
    record: [
      {
        id: "c-summary",
        section: "summary",
        title: "Case summary",
        body: "Medicine lists disagree. No dose has been chosen.",
        source: "Record agent",
        eventDate: "2026-10-20",
        author: "Record agent",
        verification: "ai_draft",
        reviewer: null,
      },
      {
        id: "c-history",
        section: "history",
        title: "History the patient wrote",
        body: "The patient wrote that a hip replacement has been discussed. No further history was supplied.",
        source: "Patient form",
        eventDate: "2026-10-18",
        author: "Fictional patient C",
        verification: "patient_reported",
        reviewer: null,
      },
      {
        id: "c-med-patient",
        section: "medicines",
        title: "Ramipril 5 mg once daily",
        body: "Patient-reported dose. It is not verified and it has not been changed.",
        source: "Patient medicine list, 2 March 2026",
        eventDate: "2026-03-02",
        author: "Fictional patient C",
        verification: "patient_reported",
        reviewer: null,
      },
      {
        id: "c-med-import",
        section: "medicines",
        title: "Ramipril 10 mg once daily",
        body: "Imported from a fictional discharge letter. It disagrees with the patient-reported dose. The import is untrusted and does not update the medicine.",
        source: "Fictional discharge letter, 28 February 2026",
        eventDate: "2026-02-28",
        author: "Imported document",
        verification: "imported",
        reviewer: null,
      },
      {
        id: "c-allergy",
        section: "allergies",
        title: "Allergies",
        body: "Not supplied. This is not a statement that there are no allergies.",
        source: "Not supplied",
        eventDate: "Not supplied",
        author: "Not supplied",
        verification: "not_supplied",
        reviewer: null,
      },
    ],
    agents: agentSet("the conflicting medicine entries"),
  },
  {
    id: "D",
    reference: "DEMO-D",
    title: "Recovery concern",
    person: "Fictional patient D",
    procedure: "Knee replacement",
    concern: "Follow-up after a fictional procedure story",
    stage: "Follow-up",
    summary:
      "A follow-up report describes a wound and pain that worry the patient. The escalation service places it in the clinician queue until the named clinician acknowledges it and records a response.",
    nextAction: "Acknowledge the recovery concern",
    owner: RESPONSIBLE_CLINICIAN,
    proposals: [],
    appointments: [
      {
        status: "confirmed",
        title: "Follow-up review",
        when: "6 November 2026, 15:00 Europe/London · 20:30 Asia/Kolkata",
        note: "A planned review. Not continuous monitoring and not an emergency service.",
      },
    ],
    tasks: [
      {
        title: "Submit the follow-up questionnaire",
        owner: "Fictional patient D",
        status: "Open until submitted",
      },
      {
        title: "Acknowledge a flagged concern",
        owner: RESPONSIBLE_CLINICIAN,
        status: "Waiting on the questionnaire",
      },
    ],
    team,
    documents: [
      {
        title: "Follow-up questionnaire",
        source: "Patient reported when submitted",
        date: "Not supplied until submitted",
        verification: "not_supplied",
      },
    ],
    preferences: "Email first. A simulated call only, with permission. No live telephony.",
    record: [
      {
        id: "d-summary",
        section: "summary",
        title: "Case summary",
        body: "Recovery follow-up for a fictional knee replacement story. No live operation took place.",
        source: "Coordination agent",
        eventDate: "2026-10-21",
        author: "Coordination agent",
        verification: "ai_draft",
        reviewer: null,
      },
      {
        id: "d-follow",
        section: "follow_up",
        title: "Follow-up report",
        body: "The patient is asked about the wound and about pain compared with the written plan. Answers are not a diagnosis.",
        source: "Follow-up questionnaire",
        eventDate: "2026-10-22",
        author: "Follow-up agent",
        verification: "ai_draft",
        reviewer: null,
      },
      {
        id: "d-meds",
        section: "medicines",
        title: "Medicines",
        body: "Not supplied.",
        source: "Not supplied",
        eventDate: "Not supplied",
        author: "Not supplied",
        verification: "not_supplied",
        reviewer: null,
      },
    ],
    agents: agentSet("the recovery follow-up"),
  },
];

export function getDemoCase(id: CaseId) {
  return DEMO_CASES.find((item) => item.id === id) ?? DEMO_CASES[0];
}

export function evaluateProposal(proposal: DemoProposal) {
  const result = compareCosts({
    lines: proposal.lines.map((item) => ({
      category: item.category,
      label: COST_CATEGORY_LABELS[item.category],
      amountMinor: item.amountMinor,
      certainty: item.certainty,
    })),
    currency: proposal.currency,
    gbpPerUnit: proposal.gbpPerUnit,
    ukAmountMinor: proposal.ukAmountMinor,
    ukSource: proposal.ukSource,
  });
  const timing = compareTiming({
    ukWaitKind: proposal.ukWaitKind,
    ukWaitDetail: proposal.ukWaitDetail,
    availabilities: proposal.availabilities,
  });
  return { result, timing };
}

export function followUpFromAnswers(answers: {
  wound: string;
  pain: string;
  person: string;
}): FollowUpStatus {
  if (
    answers.wound === "more_red" ||
    answers.pain === "worse" ||
    answers.person === "yes"
  ) {
    return "concern_flagged";
  }
  return "submitted";
}

export function needsAcknowledgement(state: Pick<DemoPersisted, "followUpStatus" | "voiceStatus" | "voiceAcknowledged">) {
  return (
    state.followUpStatus === "concern_flagged" ||
    (state.voiceStatus === "escalation_awaiting" && !state.voiceAcknowledged)
  );
}

export function acknowledgementOverdue(
  state: Pick<DemoPersisted, "followUpStatus" | "voiceStatus" | "voiceAcknowledged">,
  todayIso: string,
) {
  return needsAcknowledgement(state) && todayIso > ACK_DUE_ON;
}

export const VOICE_TRANSCRIPTS: Record<VoiceStatus, string> = {
  scheduled: "A simulated call is on the list for 6 November 2026. No telephone network is used.",
  permission_checked: "Script: the patient is asked if this simulated call may continue. Nothing is dialled.",
  connected: "Script: the simulation marks the line as connected. This is text, not a call.",
  identity_checked: "Script: the patient confirms they are fictional patient D, using the demonstration reference.",
  approved_questions: "Script: only the wound, pain and ‘do you want a person’ questions are read out.",
  draft_summary: "Fictional draft summary: the patient said the wound looked more red and the pain was worse. This is not a clinical conclusion.",
  human_review: "The draft summary is waiting for the reviewing clinician. The simulation stops here.",
  no_answer: "No answer. The next action is a further attempt by the coordinator, not another automated dial.",
  wrong_person: "The person who answered was not the patient. The script stops. No health information is read out.",
  disconnected: "The line dropped. A person decides whether to try again.",
  requests_person: "The patient asked for a person. The simulation stops and names the coordinator.",
  permission_withdrawn: "Permission was withdrawn. Do not continue the questions.",
  escalation_awaiting: "The script raised an escalation. It waits for the reviewing clinician to acknowledge it.",
};

export const VOICE_FLOW: VoiceStatus[] = [
  "scheduled",
  "permission_checked",
  "connected",
  "identity_checked",
  "approved_questions",
  "draft_summary",
  "human_review",
];

export const FOLLOW_UP_FLOW: FollowUpStatus[] = [
  "due",
  "submitted",
  "awaiting_review",
  "concern_flagged",
  "acknowledged",
  "action_recorded",
];

export const FOLLOW_UP_LABELS: Record<FollowUpStatus, string> = {
  due: "Follow-up due",
  submitted: "Submitted",
  awaiting_review: "Awaiting review",
  concern_flagged: "Concern flagged",
  acknowledged: "Clinician acknowledged",
  action_recorded: "Follow-up action recorded",
};

export function liveNext(id: CaseId, state: DemoPersisted) {
  if (id === "C") {
    const note = state.notes[MEDICINE_NOTE_ID];
    if (note?.status === "signed" || note?.status === "amended") {
      return {
        action: "Read the signed note. The two source entries stay visible.",
        owner: "Fictional patient C",
      };
    }
    if (note?.status === "rejected") {
      return {
        action: "The draft was rejected. Decide whether a new draft is needed.",
        owner: RESPONSIBLE_CLINICIAN,
      };
    }
    return { action: "Review the medicine conflict", owner: RESPONSIBLE_CLINICIAN };
  }
  if (id === "D") {
    if (state.followUpStatus === "due") {
      return { action: "Submit the follow-up questionnaire", owner: "Fictional patient D" };
    }
    if (state.followUpStatus === "concern_flagged") {
      return { action: "Acknowledge the recovery concern", owner: RESPONSIBLE_CLINICIAN };
    }
    if (state.followUpStatus === "acknowledged") {
      return { action: "Record the follow-up response", owner: RESPONSIBLE_CLINICIAN };
    }
    if (state.followUpStatus === "action_recorded") {
      return { action: "Read the recorded response. The concern is not closed by the agent.", owner: "Fictional patient D" };
    }
    return { action: "Wait for clinician review of the questionnaire", owner: RESPONSIBLE_CLINICIAN };
  }
  const item = getDemoCase(id);
  return { action: item.nextAction, owner: item.owner };
}
