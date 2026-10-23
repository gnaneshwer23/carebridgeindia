"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import {
  clearPatientSession,
  clearReveal,
  getPatientSession,
  startPatientSession,
} from "../auth";
import { findCaseByReference, recordAudit } from "../case-data";
import { getDb } from "../db";
import { field, type ActionState } from "../form";
import { secretsMatch } from "../password";
import { cases, communications } from "../schema";

async function requirePatientCase() {
  const session = await getPatientSession();
  if (!session) return null;
  const [row] = await getDb()
    .select()
    .from(cases)
    .where(eq(cases.id, session.caseId))
    .limit(1);
  return row ?? null;
}

export async function openWithKey(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const reference = field(formData, "reference", 20).toUpperCase();
  const key = field(formData, "key", 200);
  const row = await findCaseByReference(reference);
  if (!row || !key || !secretsMatch(key, row.accessKeyHash)) {
    return { error: "That reference and access key do not match." };
  }
  await startPatientSession(row.id);
  redirect("/my-case");
}

export async function dismissAccessKey(): Promise<void> {
  const session = await getPatientSession();
  if (!session) redirect("/access");
  await clearReveal();
  redirect("/my-case");
}

export async function askQuestion(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const row = await requirePatientCase();
  if (!row) redirect("/access");
  const body = field(formData, "question", 2000);
  if (body.length < 2) return { error: "Write the question first." };
  await getDb().insert(communications).values({
    caseId: row.id,
    authorLabel: row.contactName,
    kind: "question",
    body,
  });
  await getDb()
    .update(cases)
    .set({
      nextAction: "Answer the person's question.",
      nextActionOwner: "coordinator",
      updatedAt: new Date(),
    })
    .where(eq(cases.id, row.id));
  await recordAudit({
    caseId: row.id,
    action: "question_added",
    entityType: "case",
    entityId: row.id,
  });
  redirect("/my-case");
}

export async function pauseCase(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const row = await requirePatientCase();
  if (!row) redirect("/access");
  const reason = field(formData, "reason", 500);
  await getDb()
    .update(cases)
    .set({
      status: "paused",
      pauseReason: reason || "Paused by the person. No reason given.",
      nextAction: "Nothing further is required unless you choose to restart.",
      nextActionOwner: "patient",
      updatedAt: new Date(),
    })
    .where(eq(cases.id, row.id));
  await recordAudit({
    caseId: row.id,
    action: "case_paused",
    entityType: "case",
    entityId: row.id,
  });
  redirect("/my-case");
}

export async function declineCase(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const row = await requirePatientCase();
  if (!row) redirect("/access");
  const reason = field(formData, "reason", 500);
  await getDb()
    .update(cases)
    .set({
      status: "declined",
      declineReason: reason || "Decided not to continue. No reason given.",
      nextAction: "No further action. The enquiry is closed.",
      nextActionOwner: "coordinator",
      updatedAt: new Date(),
    })
    .where(eq(cases.id, row.id));
  await recordAudit({
    caseId: row.id,
    action: "case_declined",
    entityType: "case",
    entityId: row.id,
  });
  redirect("/my-case");
}

export async function discussProceeding(): Promise<void> {
  const row = await requirePatientCase();
  if (!row) redirect("/access");
  await getDb().insert(communications).values({
    caseId: row.id,
    authorLabel: row.contactName,
    kind: "question",
    body: "I want to discuss proceeding. This is not a booking and no payment is being made.",
  });
  await getDb()
    .update(cases)
    .set({
      status: "decision",
      nextAction: "Discuss next steps. Nothing is booked.",
      nextActionOwner: "coordinator",
      updatedAt: new Date(),
    })
    .where(eq(cases.id, row.id));
  await recordAudit({
    caseId: row.id,
    action: "proceeding_discussion_requested",
    entityType: "case",
    entityId: row.id,
  });
  redirect("/my-case");
}

export async function deleteEnquiry(): Promise<void> {
  const row = await requirePatientCase();
  if (!row) redirect("/access");
  await recordAudit({
    caseId: row.id,
    action: "case_deleted",
    entityType: "case",
    entityId: row.id,
  });
  await getDb().delete(cases).where(eq(cases.id, row.id));
  await clearPatientSession();
  redirect("/enquiry-deleted");
}
