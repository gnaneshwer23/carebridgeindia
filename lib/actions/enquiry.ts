"use server";

import { redirect } from "next/navigation";
import {
  rememberAccessKey,
  startPatientSession,
} from "../auth";
import { recordAudit } from "../case-data";
import { getDb } from "../db";
import { poundsToMinor } from "../format";
import { field, oneOf, type ActionState } from "../form";
import {
  CONSENT_STATEMENT,
  CONSENT_VERSION,
  DISCUSSED_OPTIONS,
  NATION_OPTIONS,
  PROCEDURE_OPTIONS,
  TIMEFRAME_OPTIONS,
  WAIT_KIND_OPTIONS,
} from "../labels";
import { hashSecret, newReference, newSecret } from "../password";
import { caseMembers, cases, consentRecords } from "../schema";

const concerns = ["time", "cost", "both"] as const;

export async function submitEnquiry(
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const concern = oneOf(field(formData, "concern", 20), concerns);
  const procedure = oneOf(
    field(formData, "procedure", 20),
    PROCEDURE_OPTIONS.map((option) => option.value),
  );
  const discussed = oneOf(
    field(formData, "discussed", 20),
    DISCUSSED_OPTIONS.map((option) => option.value),
  );
  const nation = oneOf(
    field(formData, "nation", 30),
    NATION_OPTIONS.map((option) => option.value),
  );
  const waitKind = oneOf(
    field(formData, "waitKind", 30),
    WAIT_KIND_OPTIONS.map((option) => option.value),
  );
  const timeframe = oneOf(field(formData, "timeframe", 80), TIMEFRAME_OPTIONS);
  const location = field(formData, "location", 80);
  const waitDetail = field(formData, "waitDetail", 200);
  const name = field(formData, "name", 120);
  const email = field(formData, "email", 200).toLowerCase();
  const phone = field(formData, "phone", 40);
  const preference = oneOf(field(formData, "preference", 20), [
    "email",
    "phone",
  ] as const);
  const quoteRaw = field(formData, "quoteAmount", 20);
  const quoteDate = field(formData, "quoteDate", 10);

  if (!concern) return { error: "Choose the main concern." };
  if (!procedure) return { error: "Choose the procedure being considered." };
  if (!discussed) return { error: "Say whether a clinician has discussed it." };
  if (!nation) return { error: "Choose where you are in the UK." };
  if (location.length < 2) return { error: "Enter a city or county." };
  if (!waitKind) return { error: "Say what you know about the wait." };
  if (waitKind !== "unknown" && !waitDetail) {
    return { error: "Describe the wait, or choose “I don't know”." };
  }
  if (!timeframe) return { error: "Choose a preferred timeframe." };
  if (name.length < 2) return { error: "Enter your name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter an email address." };
  }
  if (!preference) return { error: "Choose how we should contact you." };
  if (preference === "phone" && phone.length < 6) {
    return { error: "Enter a phone number, or choose email instead." };
  }
  const quoteAmountMinor = quoteRaw ? poundsToMinor(quoteRaw) : null;
  if (quoteRaw && quoteAmountMinor === null) {
    return {
      error: "Enter the UK quote in pounds, such as 15000 or 15000.50.",
    };
  }
  if (quoteDate && !/^\d{4}-\d{2}-\d{2}$/.test(quoteDate)) {
    return { error: "Enter a valid quote date." };
  }
  if (formData.get("consent") !== "on") {
    return { error: "Confirm that the enquiry can be stored." };
  }

  const accessKey = newSecret();
  const reference = newReference();
  try {
    const db = getDb();
    const [created] = await db
      .insert(cases)
      .values({
        reference,
        concern,
        procedure,
        clinicianDiscussed: discussed,
        ukNation: nation,
        location,
        waitKind,
        waitDetail: waitKind === "unknown" ? null : waitDetail,
        quoteAmountMinor,
        quoteDate: quoteDate || null,
        timeframe,
        contactName: name,
        contactEmail: email,
        contactPhone: phone || null,
        contactPreference: preference,
        accessKeyHash: hashSecret(accessKey),
      })
      .returning();
    if (!created) return { error: "The enquiry could not be saved. Try again." };
    await db.insert(caseMembers).values({
      caseId: created.id,
      name,
      email,
      relationship: "enquirer",
    });
    await db.insert(consentRecords).values({
      caseId: created.id,
      version: CONSENT_VERSION,
      statement: CONSENT_STATEMENT,
    });
    await recordAudit({
      caseId: created.id,
      action: "enquiry_created",
      entityType: "case",
      entityId: created.id,
    });
    await startPatientSession(created.id);
    await rememberAccessKey(accessKey);
  } catch (error) {
    console.error("enquiry_failed", error instanceof Error ? error.name : "");
    return { error: "The enquiry could not be saved. Try again." };
  }
  redirect("/my-case");
}
