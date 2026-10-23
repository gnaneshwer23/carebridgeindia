import { desc, eq, inArray } from "drizzle-orm";
import { getDb } from "./db";
import {
  auditEvents,
  availabilityConfirmations,
  cases,
  clinicians,
  communications,
  proposalCostItems,
  proposals,
  providers,
  responsibilities,
  tasks,
  users,
} from "./schema";

export async function listCases() {
  return getDb()
    .select({
      id: cases.id,
      reference: cases.reference,
      concern: cases.concern,
      procedure: cases.procedure,
      status: cases.status,
      nextAction: cases.nextAction,
      nextActionOwner: cases.nextActionOwner,
      responseDueOn: cases.responseDueOn,
      createdAt: cases.createdAt,
      ownerName: users.name,
    })
    .from(cases)
    .leftJoin(users, eq(users.id, cases.ownerId))
    .orderBy(desc(cases.createdAt));
}

export async function getCaseBundle(caseId: string) {
  const db = getDb();
  const [caseRow] = await db
    .select()
    .from(cases)
    .where(eq(cases.id, caseId))
    .limit(1);
  if (!caseRow) return null;

  let ownerName: string | null = null;
  if (caseRow.ownerId) {
    const [owner] = await db
      .select({ name: users.name })
      .from(users)
      .where(eq(users.id, caseRow.ownerId))
      .limit(1);
    ownerName = owner?.name ?? null;
  }

  const proposalRows = await db
    .select({
      proposal: proposals,
      providerName: providers.name,
      registrationNotes: providers.registrationNotes,
      approvedForLiveCases: providers.approvedForLiveCases,
      clinicianName: clinicians.name,
      registrationBody: clinicians.registrationBody,
      registrationNumber: clinicians.registrationNumber,
    })
    .from(proposals)
    .innerJoin(providers, eq(providers.id, proposals.providerId))
    .leftJoin(clinicians, eq(clinicians.id, proposals.clinicianId))
    .where(eq(proposals.caseId, caseId))
    .orderBy(desc(proposals.version));

  const ids = proposalRows.map((row) => row.proposal.id);
  const [costItems, availability, duties, messageRows, taskRows, auditRows] =
    ids.length
      ? await Promise.all([
          db
            .select()
            .from(proposalCostItems)
            .where(inArray(proposalCostItems.proposalId, ids)),
          db
            .select()
            .from(availabilityConfirmations)
            .where(inArray(availabilityConfirmations.proposalId, ids)),
          db
            .select()
            .from(responsibilities)
            .where(inArray(responsibilities.proposalId, ids)),
          db
            .select()
            .from(communications)
            .where(eq(communications.caseId, caseId))
            .orderBy(communications.createdAt),
          db.select().from(tasks).where(eq(tasks.caseId, caseId)),
          db
            .select()
            .from(auditEvents)
            .where(eq(auditEvents.caseId, caseId))
            .orderBy(desc(auditEvents.createdAt)),
        ])
      : await Promise.all([
          Promise.resolve([]),
          Promise.resolve([]),
          Promise.resolve([]),
          db
            .select()
            .from(communications)
            .where(eq(communications.caseId, caseId))
            .orderBy(communications.createdAt),
          db.select().from(tasks).where(eq(tasks.caseId, caseId)),
          db
            .select()
            .from(auditEvents)
            .where(eq(auditEvents.caseId, caseId))
            .orderBy(desc(auditEvents.createdAt)),
        ]);

  const detailed = proposalRows.map((row) => ({
    ...row,
    lines: costItems.filter((item) => item.proposalId === row.proposal.id),
    availability: availability.filter(
      (item) => item.proposalId === row.proposal.id,
    ),
    responsibilities: duties.filter(
      (item) => item.proposalId === row.proposal.id,
    ),
  }));

  return {
    caseRow,
    ownerName,
    proposals: detailed,
    messages: messageRows,
    tasks: taskRows,
    audits: auditRows,
  };
}

export async function findCaseByReference(reference: string) {
  const [row] = await getDb()
    .select()
    .from(cases)
    .where(eq(cases.reference, reference))
    .limit(1);
  return row ?? null;
}

export async function recordAudit(input: {
  actorUserId?: string | null;
  caseId?: string | null;
  action: string;
  entityType: string;
  entityId?: string | null;
}) {
  await getDb()
    .insert(auditEvents)
    .values({
      actorUserId: input.actorUserId ?? null,
      caseId: input.caseId ?? null,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId ?? null,
    });
}
