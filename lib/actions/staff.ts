"use server";

import { and, desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import {
  clearStaffSession,
  getStaffSession,
  startStaffSession,
} from "../auth";
import { recordAudit } from "../case-data";
import {
  COST_CATEGORY_LABELS,
  REQUIRED_COST_CATEGORIES,
  RESPONSIBILITY_KINDS,
  responsibilitiesComplete,
  type CostCertainty,
} from "../comparison";
import { getDb } from "../db";
import { poundsToMinor } from "../format";
import { field, oneOf, type ActionState, type KeyState } from "../form";
import { LATER_STATUSES, STATUS_LABELS } from "../labels";
import { hashSecret, newSecret, verifyPassword } from "../password";
import {
  availabilityConfirmations,
  cases,
  clinicians,
  communications,
  proposalCostItems,
  proposals,
  providers,
  responsibilities,
  sessions,
  tasks,
  users,
} from "../schema";

const currencies = ["GBP", "INR", "USD", "EUR"] as const;
const certainties = ["confirmed", "estimated", "unknown"] as const;
const lateralities = ["left", "right", "bilateral", "not_supplied"] as const;
const statuses = Object.keys(STATUS_LABELS);
const owners = ["patient", "coordinator", "provider"] as const;
const parties = ["patient", "coordinator", "provider"] as const;

function londonToday() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });
}

async function staff() {
  const session = await getStaffSession();
  if (!session) redirect("/coordinator/login");
  return session;
}

export async function login(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = field(formData, "email", 200).toLowerCase();
  const password = field(formData, "password", 200);
  const [user] = await getDb()
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { error: "The email or password is not recognised." };
  }
  await startStaffSession(user.id);
  await recordAudit({
    actorUserId: user.id,
    action: "staff_login",
    entityType: "user",
    entityId: user.id,
  });
  redirect("/coordinator");
}

export async function logout() {
  await clearStaffSession();
  redirect("/coordinator/login");
}

export async function updateCase(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await staff();
  const caseId = field(formData, "caseId", 40);
  const status = oneOf(field(formData, "status", 40), statuses);
  const nextAction = field(formData, "nextAction", 300);
  const nextActionOwner = oneOf(field(formData, "nextActionOwner", 20), owners);
  const responseDueOn = field(formData, "responseDueOn", 10);
  const pauseReason = field(formData, "pauseReason", 500);
  const declineReason = field(formData, "declineReason", 500);
  const assign = formData.get("assign") === "on";
  if (!status || !nextActionOwner || nextAction.length < 2) {
    return { error: "Choose a status, who acts next, and the next action." };
  }
  if (status === "paused" && !pauseReason) {
    return { error: "Record why the case is paused." };
  }
  if ((status === "declined" || status === "closed") && !declineReason) {
    return { error: "Record why the case is closed." };
  }
  if (
    responseDueOn &&
    !/^\d{4}-\d{2}-\d{2}$/.test(responseDueOn)
  ) {
    return { error: "Enter a valid response date." };
  }

  if ((LATER_STATUSES as readonly string[]).includes(status)) {
    const [published] = await getDb()
      .select()
      .from(proposals)
      .where(and(eq(proposals.caseId, caseId), eq(proposals.status, "published")))
      .orderBy(desc(proposals.version))
      .limit(1);
    if (!published) {
      return {
        error: "Publish a proposal before moving the case into preparation.",
      };
    }
    const duties = await getDb()
      .select()
      .from(responsibilities)
      .where(eq(responsibilities.proposalId, published.id));
    if (!responsibilitiesComplete(duties)) {
      return {
        error:
          "Record named contacts for clinical assessment, complications, follow-up and escalation on the published proposal before this stage.",
      };
    }
  }

  await getDb()
    .update(cases)
    .set({
      status: status as (typeof cases.$inferInsert)["status"],
      nextAction,
      nextActionOwner,
      responseDueOn: responseDueOn || null,
      pauseReason: pauseReason || null,
      declineReason: declineReason || null,
      ...(assign ? { ownerId: actor.userId } : {}),
      updatedAt: new Date(),
    })
    .where(eq(cases.id, caseId));
  await recordAudit({
    actorUserId: actor.userId,
    caseId,
    action: "case_updated",
    entityType: "case",
    entityId: caseId,
  });
  redirect(`/coordinator/cases/${caseId}`);
}

export async function addMessage(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await staff();
  const caseId = field(formData, "caseId", 40);
  const body = field(formData, "body", 2000);
  const kind = oneOf(field(formData, "kind", 20), ["note", "answer"] as const);
  if (!kind || body.length < 2) return { error: "Write the message first." };
  await getDb().insert(communications).values({
    caseId,
    authorUserId: actor.userId,
    authorLabel: actor.name,
    kind,
    body,
  });
  await recordAudit({
    actorUserId: actor.userId,
    caseId,
    action: kind === "note" ? "note_added" : "answer_added",
    entityType: "case",
    entityId: caseId,
  });
  redirect(`/coordinator/cases/${caseId}`);
}

export async function addTask(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await staff();
  const caseId = field(formData, "caseId", 40);
  const title = field(formData, "title", 160);
  const detail = field(formData, "detail", 500);
  const party = oneOf(field(formData, "party", 20), parties);
  const dueOn = field(formData, "dueOn", 10);
  if (!party || title.length < 2) return { error: "Name the task and who owns it." };
  await getDb().insert(tasks).values({
    caseId,
    title,
    detail,
    party,
    dueOn: dueOn || null,
  });
  await recordAudit({
    actorUserId: actor.userId,
    caseId,
    action: "task_added",
    entityType: "case",
    entityId: caseId,
  });
  redirect(`/coordinator/cases/${caseId}`);
}

export async function setTaskStatus(formData: FormData) {
  const actor = await staff();
  const taskId = field(formData, "taskId", 40);
  const caseId = field(formData, "caseId", 40);
  const status = oneOf(field(formData, "status", 20), [
    "open",
    "done",
    "blocked",
  ] as const);
  if (!status) return;
  await getDb().update(tasks).set({ status }).where(eq(tasks.id, taskId));
  await recordAudit({
    actorUserId: actor.userId,
    caseId,
    action: "task_updated",
    entityType: "task",
    entityId: taskId,
  });
  redirect(`/coordinator/cases/${caseId}`);
}

export async function saveProposal(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await staff();
  const caseId = field(formData, "caseId", 40);
  const intent = field(formData, "intent", 20);
  const currency = oneOf(field(formData, "currency", 8), currencies) ?? "GBP";
  const laterality = oneOf(field(formData, "laterality", 20), lateralities) ?? "not_supplied";
  const procedureExact = field(formData, "procedureExact", 240);
  const providerName = field(formData, "providerName", 180);
  const clinicianName = field(formData, "clinicianName", 180);
  const expiresOn = field(formData, "expiresOn", 10);
  const gbpPerUnitRaw = field(formData, "gbpPerUnit", 40);
  const exchangeRateOn = field(formData, "exchangeRateOn", 10);
  const ukSourceRaw = field(formData, "ukSource", 40);
  const ukAmountRaw = field(formData, "ukAmount", 20);
  const ukSource =
    ukSourceRaw === "patient_quote" || ukSourceRaw === "published_benchmark"
      ? ukSourceRaw
      : null;
  const ukAmountMinor = ukAmountRaw ? poundsToMinor(ukAmountRaw) : null;
  if (ukAmountRaw && ukAmountMinor === null) {
    return { error: "Enter the UK comparison amount in pounds." };
  }

  let gbpPerUnit: string | null = currency === "GBP" ? "1" : null;
  if (currency !== "GBP") {
    const rate = Number(gbpPerUnitRaw);
    if (!Number.isFinite(rate) || rate <= 0) {
      return {
        error: "Enter how many pounds one unit of the proposal currency buys.",
      };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(exchangeRateOn)) {
      return { error: "Enter the date of the exchange rate." };
    }
    gbpPerUnit = String(rate);
  }

  const lines = REQUIRED_COST_CATEGORIES.map((category, index) => {
    const certainty =
      oneOf(field(formData, `${category}_certainty`, 20), certainties) ??
      "unknown";
    const amountRaw = field(formData, `${category}_amount`, 20);
    const amountMinor =
      certainty === "unknown" ? null : poundsToMinor(amountRaw);
    return {
      category,
      label:
        field(formData, `${category}_label`, 120) ||
        COST_CATEGORY_LABELS[category],
      certainty,
      amountMinor,
      sortOrder: index,
      amountRaw,
    };
  });

  for (const line of lines) {
    if (line.certainty !== "unknown" && line.amountMinor === null) {
      return {
        error: `Enter an amount for ${line.label}, or mark it not supplied.`,
      };
    }
  }

  if (intent === "publish") {
    if (!procedureExact || !providerName || !clinicianName) {
      return {
        error: "A published proposal needs the procedure, hospital and clinician.",
      };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(expiresOn) || expiresOn < londonToday()) {
      return { error: "Enter an expiry date that is today or later." };
    }
    if (ukSource === "published_benchmark" && !field(formData, "ukBenchmarkLabel", 180)) {
      return { error: "Name the benchmark source." };
    }
  }

  const db = getDb();
  const proposalId = field(formData, "proposalId", 40);
  let providerId = "";
  let clinicianId: string | null = null;
  let id = proposalId;

  if (id) {
    const [existing] = await db
      .select()
      .from(proposals)
      .where(and(eq(proposals.id, id), eq(proposals.caseId, caseId)))
      .limit(1);
    if (!existing || existing.status !== "draft") {
      return { error: "Only a draft proposal can be edited." };
    }
    providerId = existing.providerId;
    clinicianId = existing.clinicianId;
    await db
      .update(providers)
      .set({
        name: providerName || "Unnamed hospital",
        registrationNotes: field(formData, "registrationNotes", 500),
      })
      .where(eq(providers.id, providerId));
    if (clinicianId) {
      await db
        .update(clinicians)
        .set({
          name: clinicianName || "Unnamed clinician",
          registrationBody: field(formData, "registrationBody", 120) || null,
          registrationNumber: field(formData, "registrationNumber", 80) || null,
        })
        .where(eq(clinicians.id, clinicianId));
    }
  } else {
    const [provider] = await db
      .insert(providers)
      .values({
        name: providerName || "Unnamed hospital",
        registrationNotes: field(formData, "registrationNotes", 500),
        approvedForLiveCases: false,
      })
      .returning();
    if (!provider) return { error: "The proposal could not be saved." };
    providerId = provider.id;
    const [clinician] = await db
      .insert(clinicians)
      .values({
        providerId,
        name: clinicianName || "Unnamed clinician",
        registrationBody: field(formData, "registrationBody", 120) || null,
        registrationNumber: field(formData, "registrationNumber", 80) || null,
      })
      .returning();
    clinicianId = clinician?.id ?? null;
    const [latest] = await db
      .select({ version: proposals.version })
      .from(proposals)
      .where(eq(proposals.caseId, caseId))
      .orderBy(desc(proposals.version))
      .limit(1);
    const [created] = await db
      .insert(proposals)
      .values({
        caseId,
        providerId,
        clinicianId,
        version: (latest?.version ?? 0) + 1,
        status: "draft",
      })
      .returning();
    if (!created) return { error: "The proposal could not be saved." };
    id = created.id;
  }

  await db
    .update(proposals)
    .set({
      procedureExact,
      laterality,
      packageSpec: field(formData, "packageSpec", 1000),
      currency,
      gbpPerUnit,
      exchangeRateOn: currency === "GBP" ? null : exchangeRateOn,
      exchangeRateLabel: field(formData, "exchangeRateLabel", 180),
      ukSource,
      ukAmountMinor,
      ukBenchmarkLabel: field(formData, "ukBenchmarkLabel", 180),
      ukBenchmarkDate: field(formData, "ukBenchmarkDate", 10) || null,
      cancellationTerms: field(formData, "cancellationTerms", 1000),
      paymentRecipient: field(formData, "paymentRecipient", 240),
      exclusions: field(formData, "exclusions", 1000),
      unpricedItems: field(formData, "unpricedItems", 1000),
      contingency: field(formData, "contingency", 1000),
      expiresOn: expiresOn || null,
    })
    .where(eq(proposals.id, id));

  await db.delete(proposalCostItems).where(eq(proposalCostItems.proposalId, id));
  await db.insert(proposalCostItems).values(
    lines.map((line) => ({
      proposalId: id,
      category: line.category,
      label: line.label,
      amountMinor: line.amountMinor,
      certainty: line.certainty as CostCertainty,
      sortOrder: line.sortOrder,
    })),
  );

  await db
    .delete(availabilityConfirmations)
    .where(eq(availabilityConfirmations.proposalId, id));
  const windows = [
    availabilityFrom(formData, id, "consultation", "consult"),
    availabilityFrom(formData, id, "treatment_window", "treat"),
  ].filter((item) => item !== null);
  if (windows.length) await db.insert(availabilityConfirmations).values(windows);

  await db.delete(responsibilities).where(eq(responsibilities.proposalId, id));
  await db.insert(responsibilities).values(
    RESPONSIBILITY_KINDS.map((kind) => ({
      proposalId: id,
      kind,
      partyName: field(formData, `${kind}_party`, 160),
      contact: field(formData, `${kind}_contact`, 160),
      description: field(formData, `${kind}_description`, 500),
    })),
  );

  if (intent === "publish") {
    await db
      .update(proposals)
      .set({ status: "superseded" })
      .where(and(eq(proposals.caseId, caseId), eq(proposals.status, "published")));
    await db
      .update(proposals)
      .set({ status: "published", publishedAt: new Date() })
      .where(eq(proposals.id, id));
    await getDb()
      .update(cases)
      .set({
        status: "comparing",
        nextAction: "Review the published comparison and ask any questions.",
        nextActionOwner: "patient",
        updatedAt: new Date(),
      })
      .where(eq(cases.id, caseId));
  }

  await recordAudit({
    actorUserId: actor.userId,
    caseId,
    action: intent === "publish" ? "proposal_published" : "proposal_saved",
    entityType: "proposal",
    entityId: id,
  });
  redirect(`/coordinator/cases/${caseId}`);
}

function availabilityFrom(
  formData: FormData,
  proposalId: string,
  kind: "consultation" | "treatment_window",
  prefix: "consult" | "treat",
) {
  const source = field(formData, `${prefix}_source`, 240);
  const confirmedOn = field(formData, `${prefix}_confirmedOn`, 10);
  if (!source || !/^\d{4}-\d{2}-\d{2}$/.test(confirmedOn)) return null;
  return {
    proposalId,
    kind,
    source,
    confirmedOn,
    windowStart: field(formData, `${prefix}_start`, 10) || null,
    windowEnd: field(formData, `${prefix}_end`, 10) || null,
    conditions: field(formData, `${prefix}_conditions`, 500),
    dependencies: field(formData, `${prefix}_dependencies`, 500),
  };
}

export async function issueAccessKey(
  _state: KeyState,
  formData: FormData,
): Promise<KeyState> {
  const actor = await staff();
  const caseId = field(formData, "caseId", 40);
  const key = newSecret();
  await getDb()
    .update(cases)
    .set({ accessKeyHash: hashSecret(key), updatedAt: new Date() })
    .where(eq(cases.id, caseId));
  await getDb()
    .delete(sessions)
    .where(and(eq(sessions.caseId, caseId), eq(sessions.kind, "patient")));
  await recordAudit({
    actorUserId: actor.userId,
    caseId,
    action: "access_key_reissued",
    entityType: "case",
    entityId: caseId,
  });
  return { error: "", issuedKey: key };
}
