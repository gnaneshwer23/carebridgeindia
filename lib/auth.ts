import "server-only";
import { cookies } from "next/headers";
import { and, eq, gt } from "drizzle-orm";
import { getDb } from "./db";
import { hashSecret, newSecret } from "./password";
import { sessions, users } from "./schema";

const STAFF_COOKIE = "cb_staff";
const PATIENT_COOKIE = "cb_patient";
const REVEAL_COOKIE = "cb_reveal";

function cookieOptions(maxAge: number, path = "/") {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path,
    maxAge,
  };
}

async function persistSession(input: {
  kind: "staff" | "patient";
  userId?: string;
  caseId?: string;
  maxAge: number;
}) {
  const token = newSecret();
  const expiresAt = new Date(Date.now() + input.maxAge * 1000);
  await getDb().insert(sessions).values({
    tokenHash: hashSecret(token),
    kind: input.kind,
    userId: input.userId ?? null,
    caseId: input.caseId ?? null,
    expiresAt,
  });
  return token;
}

export async function startStaffSession(userId: string) {
  const token = await persistSession({
    kind: "staff",
    userId,
    maxAge: 60 * 60 * 24 * 7,
  });
  const jar = await cookies();
  jar.set(STAFF_COOKIE, token, cookieOptions(60 * 60 * 24 * 7));
}

export async function startPatientSession(caseId: string) {
  const token = await persistSession({
    kind: "patient",
    caseId,
    maxAge: 60 * 60 * 24 * 30,
  });
  const jar = await cookies();
  jar.set(PATIENT_COOKIE, token, cookieOptions(60 * 60 * 24 * 30));
}

export async function rememberAccessKey(accessKey: string) {
  const jar = await cookies();
  jar.set(REVEAL_COOKIE, accessKey, cookieOptions(60 * 60, "/my-case"));
}

export async function clearReveal() {
  const jar = await cookies();
  jar.delete(REVEAL_COOKIE);
}

export async function getRevealKey() {
  const jar = await cookies();
  return jar.get(REVEAL_COOKIE)?.value ?? null;
}

export async function getStaffSession() {
  const jar = await cookies();
  const token = jar.get(STAFF_COOKIE)?.value;
  if (!token) return null;
  const [row] = await getDb()
    .select({
      userId: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
    })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(
      and(
        eq(sessions.tokenHash, hashSecret(token)),
        eq(sessions.kind, "staff"),
        gt(sessions.expiresAt, new Date()),
      ),
    )
    .limit(1);
  return row ?? null;
}

export async function getPatientSession() {
  const jar = await cookies();
  const token = jar.get(PATIENT_COOKIE)?.value;
  if (!token) return null;
  const [row] = await getDb()
    .select({ caseId: sessions.caseId, sessionId: sessions.id })
    .from(sessions)
    .where(
      and(
        eq(sessions.tokenHash, hashSecret(token)),
        eq(sessions.kind, "patient"),
        gt(sessions.expiresAt, new Date()),
      ),
    )
    .limit(1);
  if (!row?.caseId) return null;
  return { caseId: row.caseId, sessionId: row.sessionId };
}

export async function clearStaffSession() {
  const jar = await cookies();
  const token = jar.get(STAFF_COOKIE)?.value;
  if (token) {
    await getDb()
      .delete(sessions)
      .where(eq(sessions.tokenHash, hashSecret(token)));
  }
  jar.delete(STAFF_COOKIE);
}

export async function clearPatientSession() {
  const jar = await cookies();
  const token = jar.get(PATIENT_COOKIE)?.value;
  if (token) {
    await getDb()
      .delete(sessions)
      .where(eq(sessions.tokenHash, hashSecret(token)));
  }
  jar.delete(PATIENT_COOKIE);
  jar.delete(REVEAL_COOKIE);
}
