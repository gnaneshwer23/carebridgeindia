import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["coordinator", "admin"]);
export const concernEnum = pgEnum("concern", ["time", "cost", "both"]);
export const procedureEnum = pgEnum("procedure_interest", [
  "hip",
  "knee",
  "not_sure",
]);
export const discussedEnum = pgEnum("clinician_discussed", [
  "yes",
  "no",
  "not_sure",
]);
export const nationEnum = pgEnum("uk_nation", [
  "england",
  "scotland",
  "wales",
  "northern_ireland",
]);
export const waitKindEnum = pgEnum("wait_kind", [
  "appointment_date",
  "estimate",
  "assumption",
  "unknown",
]);
export const contactPreferenceEnum = pgEnum("contact_preference", [
  "email",
  "phone",
]);
export const caseStatusEnum = pgEnum("case_status", [
  "enquiry_received",
  "coordinator_review",
  "awaiting_provider",
  "clinical_assessment",
  "comparing",
  "decision",
  "preparing",
  "treatment",
  "follow_up",
  "paused",
  "declined",
  "closed",
]);
export const actionOwnerEnum = pgEnum("action_owner", [
  "patient",
  "coordinator",
  "provider",
]);
export const sessionKindEnum = pgEnum("session_kind", ["staff", "patient"]);
export const certaintyEnum = pgEnum("cost_certainty", [
  "confirmed",
  "estimated",
  "unknown",
]);
export const proposalStatusEnum = pgEnum("proposal_status", [
  "draft",
  "published",
  "superseded",
  "withdrawn",
]);
export const availabilityKindEnum = pgEnum("availability_kind", [
  "consultation",
  "treatment_window",
]);
export const ukSourceEnum = pgEnum("uk_cost_source", [
  "patient_quote",
  "published_benchmark",
]);
export const responsibilityKindEnum = pgEnum("responsibility_kind", [
  "clinical_assessment",
  "complications",
  "follow_up",
  "escalation",
]);
export const taskStatusEnum = pgEnum("task_status", ["open", "done", "blocked"]);
export const taskPartyEnum = pgEnum("task_party", [
  "patient",
  "coordinator",
  "provider",
]);
export const messageKindEnum = pgEnum("message_kind", [
  "note",
  "question",
  "answer",
]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  role: userRole("role").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const cases = pgTable(
  "cases",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    reference: text("reference").notNull().unique(),
    concern: concernEnum("concern").notNull(),
    procedure: procedureEnum("procedure").notNull(),
    clinicianDiscussed: discussedEnum("clinician_discussed").notNull(),
    ukNation: nationEnum("uk_nation").notNull(),
    location: text("location").notNull(),
    waitKind: waitKindEnum("wait_kind").notNull(),
    waitDetail: text("wait_detail"),
    quoteAmountMinor: integer("quote_amount_minor"),
    quoteDate: date("quote_date"),
    timeframe: text("timeframe").notNull(),
    contactName: text("contact_name").notNull(),
    contactEmail: text("contact_email").notNull(),
    contactPhone: text("contact_phone"),
    contactPreference: contactPreferenceEnum("contact_preference").notNull(),
    status: caseStatusEnum("status").notNull().default("enquiry_received"),
    ownerId: uuid("owner_id").references(() => users.id, { onDelete: "set null" }),
    nextAction: text("next_action")
      .notNull()
      .default("Review the enquiry and contact the person."),
    nextActionOwner: actionOwnerEnum("next_action_owner")
      .notNull()
      .default("coordinator"),
    responseDueOn: date("response_due_on"),
    pauseReason: text("pause_reason"),
    declineReason: text("decline_reason"),
    accessKeyHash: text("access_key_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("cases_status_idx").on(table.status)],
);

export const caseMembers = pgTable("case_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  caseId: uuid("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  relationship: text("relationship").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    tokenHash: text("token_hash").notNull(),
    kind: sessionKindEnum("kind").notNull(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    caseId: uuid("case_id").references(() => cases.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [uniqueIndex("sessions_token_hash_idx").on(table.tokenHash)],
);

export const providers = pgTable("providers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  country: text("country").notNull().default("India"),
  registrationNotes: text("registration_notes"),
  approvedForLiveCases: boolean("approved_for_live_cases").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const clinicians = pgTable("clinicians", {
  id: uuid("id").primaryKey().defaultRandom(),
  providerId: uuid("provider_id")
    .notNull()
    .references(() => providers.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  registrationBody: text("registration_body"),
  registrationNumber: text("registration_number"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const credentialChecks = pgTable("credential_checks", {
  id: uuid("id").primaryKey().defaultRandom(),
  providerId: uuid("provider_id")
    .notNull()
    .references(() => providers.id, { onDelete: "cascade" }),
  clinicianId: uuid("clinician_id").references(() => clinicians.id, {
    onDelete: "set null",
  }),
  checkType: text("check_type").notNull(),
  outcome: text("outcome").notNull(),
  notes: text("notes"),
  checkedAt: timestamp("checked_at", { withTimezone: true }).defaultNow().notNull(),
});

export const proposals = pgTable(
  "proposals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    caseId: uuid("case_id")
      .notNull()
      .references(() => cases.id, { onDelete: "cascade" }),
    providerId: uuid("provider_id")
      .notNull()
      .references(() => providers.id),
    clinicianId: uuid("clinician_id").references(() => clinicians.id, {
      onDelete: "set null",
    }),
    version: integer("version").notNull(),
    status: proposalStatusEnum("status").notNull().default("draft"),
    procedureExact: text("procedure_exact").notNull().default(""),
    laterality: text("laterality").notNull().default("not_supplied"),
    packageSpec: text("package_spec").notNull().default(""),
    currency: text("currency").notNull().default("GBP"),
    gbpPerUnit: text("gbp_per_unit"),
    exchangeRateOn: date("exchange_rate_on"),
    exchangeRateLabel: text("exchange_rate_label"),
    ukSource: ukSourceEnum("uk_source"),
    ukAmountMinor: integer("uk_amount_minor"),
    ukBenchmarkLabel: text("uk_benchmark_label"),
    ukBenchmarkDate: date("uk_benchmark_date"),
    cancellationTerms: text("cancellation_terms").notNull().default(""),
    paymentRecipient: text("payment_recipient").notNull().default(""),
    exclusions: text("exclusions").notNull().default(""),
    unpricedItems: text("unpriced_items").notNull().default(""),
    contingency: text("contingency").notNull().default(""),
    expiresOn: date("expires_on"),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("proposals_case_idx").on(table.caseId)],
);

export const proposalCostItems = pgTable("proposal_cost_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  proposalId: uuid("proposal_id")
    .notNull()
    .references(() => proposals.id, { onDelete: "cascade" }),
  category: text("category").notNull(),
  label: text("label").notNull(),
  amountMinor: integer("amount_minor"),
  certainty: certaintyEnum("certainty").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const availabilityConfirmations = pgTable("availability_confirmations", {
  id: uuid("id").primaryKey().defaultRandom(),
  proposalId: uuid("proposal_id")
    .notNull()
    .references(() => proposals.id, { onDelete: "cascade" }),
  kind: availabilityKindEnum("kind").notNull(),
  source: text("source").notNull(),
  confirmedOn: date("confirmed_on").notNull(),
  windowStart: date("window_start"),
  windowEnd: date("window_end"),
  conditions: text("conditions").notNull().default(""),
  dependencies: text("dependencies").notNull().default(""),
});

export const responsibilities = pgTable("responsibilities", {
  id: uuid("id").primaryKey().defaultRandom(),
  proposalId: uuid("proposal_id")
    .notNull()
    .references(() => proposals.id, { onDelete: "cascade" }),
  kind: responsibilityKindEnum("kind").notNull(),
  partyName: text("party_name").notNull().default(""),
  contact: text("contact").notNull().default(""),
  description: text("description").notNull().default(""),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").primaryKey().defaultRandom(),
  caseId: uuid("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  detail: text("detail").notNull().default(""),
  party: taskPartyEnum("party").notNull(),
  status: taskStatusEnum("status").notNull().default("open"),
  dueOn: date("due_on"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const documents = pgTable("documents", {
  id: uuid("id").primaryKey().defaultRandom(),
  caseId: uuid("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  filename: text("filename").notNull(),
  contentType: text("content_type").notNull(),
  byteSize: integer("byte_size").notNull(),
  storageKey: text("storage_key").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const consentRecords = pgTable("consent_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  caseId: uuid("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  version: text("version").notNull(),
  statement: text("statement").notNull(),
  acceptedAt: timestamp("accepted_at", { withTimezone: true }).defaultNow().notNull(),
});

export const communications = pgTable("communications", {
  id: uuid("id").primaryKey().defaultRandom(),
  caseId: uuid("case_id")
    .notNull()
    .references(() => cases.id, { onDelete: "cascade" }),
  authorUserId: uuid("author_user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  authorLabel: text("author_label").notNull(),
  kind: messageKindEnum("kind").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const auditEvents = pgTable("audit_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  actorUserId: uuid("actor_user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  caseId: uuid("case_id").references(() => cases.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
