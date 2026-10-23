"use server";

import { asc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getStaffSession } from "../auth";
import { recordAudit } from "../case-data";
import { getDb } from "../db";
import { field, type ActionState } from "../form";
import {
  canApproveForLiveCases,
  recordedCredentialNote,
  REQUIRED_CREDENTIAL_CHECKS,
  type CredentialCheckType,
} from "../provider-checks";
import { clinicians, credentialChecks, providers } from "../schema";

async function staff() {
  const session = await getStaffSession();
  if (!session) redirect("/coordinator/login");
  return session;
}

export async function saveProvider(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const actor = await staff();
  const name = field(formData, "name", 180);
  const country = field(formData, "country", 80) || "India";
  const clinicianName = field(formData, "clinicianName", 180);
  const registrationBody = field(formData, "registrationBody", 120);
  const registrationNumber = field(formData, "registrationNumber", 80);
  if (name.length < 2) return { error: "Enter the provider name." };
  if (clinicianName.length < 2) return { error: "Enter the clinician’s name." };

  const notes = Object.fromEntries(
    REQUIRED_CREDENTIAL_CHECKS.map((check) => [
      check.type,
      recordedCredentialNote(field(formData, check.type, 2000)),
    ]),
  ) as Record<CredentialCheckType, string>;
  const confirmed = formData.get("confirmLive") === "on";
  const approvalBlocked = confirmed && !canApproveForLiveCases(notes, true);
  const approved = canApproveForLiveCases(notes, confirmed);

  const db = getDb();
  const requestedId = field(formData, "providerId", 40);
  const [existing] = requestedId
    ? await db
        .select()
        .from(providers)
        .where(eq(providers.id, requestedId))
        .limit(1)
    : [];
  if (requestedId && !existing) return { error: "That provider was not found." };

  const registrationNotes = notes.hospital_registration || null;
  let providerId = existing?.id ?? "";
  if (existing) {
    await db
      .update(providers)
      .set({
        name,
        country,
        registrationNotes,
        ...(approved ? {} : { approvedForLiveCases: false }),
      })
      .where(eq(providers.id, existing.id));
    providerId = existing.id;
  } else {
    const [created] = await db
      .insert(providers)
      .values({
        name,
        country,
        registrationNotes,
        approvedForLiveCases: false,
      })
      .returning();
    if (!created) return { error: "The provider could not be saved." };
    providerId = created.id;
  }

  const [clinician] = await db
    .select()
    .from(clinicians)
    .where(eq(clinicians.providerId, providerId))
    .orderBy(asc(clinicians.createdAt))
    .limit(1);
  let clinicianId = clinician?.id ?? "";
  if (clinician) {
    await db
      .update(clinicians)
      .set({
        name: clinicianName,
        registrationBody: registrationBody || null,
        registrationNumber: registrationNumber || null,
      })
      .where(eq(clinicians.id, clinician.id));
  } else {
    const [createdClinician] = await db
      .insert(clinicians)
      .values({
        providerId,
        name: clinicianName,
        registrationBody: registrationBody || null,
        registrationNumber: registrationNumber || null,
      })
      .returning();
    if (!createdClinician) return { error: "The clinician could not be saved." };
    clinicianId = createdClinician.id;
  }

  const currentChecks = await db
    .select()
    .from(credentialChecks)
    .where(eq(credentialChecks.providerId, providerId));
  for (const check of REQUIRED_CREDENTIAL_CHECKS) {
    const note = notes[check.type];
    const current = currentChecks.find((row) => row.checkType === check.type);
    if (note.length >= 2) {
      const values = {
        clinicianId: check.clinician ? clinicianId : null,
        outcome: "recorded",
        notes: note,
        checkedAt: new Date(),
      };
      if (current) {
        await db
          .update(credentialChecks)
          .set(values)
          .where(eq(credentialChecks.id, current.id));
      } else {
        await db.insert(credentialChecks).values({
          providerId,
          checkType: check.type,
          ...values,
        });
      }
    } else if (current) {
      await db.delete(credentialChecks).where(eq(credentialChecks.id, current.id));
    }
  }

  if (approved) {
    await db
      .update(providers)
      .set({ approvedForLiveCases: true })
      .where(eq(providers.id, providerId));
  }

  await recordAudit({
    actorUserId: actor.userId,
    action: existing ? "provider_updated" : "provider_created",
    entityType: "provider",
    entityId: providerId,
  });
  const previous = existing?.approvedForLiveCases ?? false;
  if (previous !== approved) {
    await recordAudit({
      actorUserId: actor.userId,
      action: approved
        ? "provider_approved_for_live_cases"
        : "provider_live_approval_withdrawn",
      entityType: "provider",
      entityId: providerId,
    });
  }

  redirect(
    approvalBlocked
      ? `/coordinator/providers/${providerId}?needsChecks=1`
      : `/coordinator/providers/${providerId}`,
  );
}
