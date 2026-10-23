import { asc, desc, eq, inArray } from "drizzle-orm";
import { getDb } from "./db";
import {
  recordedCredentialNote,
  type CredentialCheckType,
} from "./provider-checks";
import { clinicians, credentialChecks, providers } from "./schema";

export async function listProviders() {
  const db = getDb();
  const providerRows = await db
    .select()
    .from(providers)
    .orderBy(desc(providers.createdAt));
  if (providerRows.length === 0) return [];

  const ids = providerRows.map((provider) => provider.id);
  const [clinicianRows, checkRows] = await Promise.all([
    db
      .select()
      .from(clinicians)
      .where(inArray(clinicians.providerId, ids))
      .orderBy(asc(clinicians.createdAt)),
    db
      .select({
        providerId: credentialChecks.providerId,
        checkType: credentialChecks.checkType,
        notes: credentialChecks.notes,
      })
      .from(credentialChecks)
      .where(inArray(credentialChecks.providerId, ids)),
  ]);

  return providerRows.map((provider) => {
    const clinician =
      clinicianRows.find((row) => row.providerId === provider.id) ?? null;
    const recorded = new Set(
      checkRows
        .filter(
          (row) =>
            row.providerId === provider.id &&
            recordedCredentialNote(row.notes).length >= 2,
        )
        .map((row) => row.checkType),
    );
    return { provider, clinician, recordedCount: recorded.size };
  });
}

export async function getProviderRecord(providerId: string) {
  const db = getDb();
  const [provider] = await db
    .select()
    .from(providers)
    .where(eq(providers.id, providerId))
    .limit(1);
  if (!provider) return null;

  const [clinicianRows, checkRows] = await Promise.all([
    db
      .select()
      .from(clinicians)
      .where(eq(clinicians.providerId, provider.id))
      .orderBy(asc(clinicians.createdAt)),
    db
      .select()
      .from(credentialChecks)
      .where(eq(credentialChecks.providerId, provider.id)),
  ]);

  const notes = Object.fromEntries(
    checkRows.map((row) => [row.checkType, row.notes ?? ""]),
  ) as Partial<Record<CredentialCheckType, string>>;

  return {
    provider,
    clinician: clinicianRows[0] ?? null,
    notes,
  };
}
