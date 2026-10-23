import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { getDb } from "./db";
import { hashPassword } from "./password";
import { users } from "./schema";

config({ path: ".env.local" });

async function main() {
  const email = process.env.COORDINATOR_EMAIL?.trim().toLowerCase();
  const password = process.env.COORDINATOR_PASSWORD;
  if (!email || !password) {
    throw new Error("COORDINATOR_EMAIL and COORDINATOR_PASSWORD must be set");
  }
  const db = getDb();
  const [existing] = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existing) {
    console.log("Coordinator account already exists");
    return;
  }
  await db.insert(users).values({
    email,
    name: "Care coordinator",
    role: "coordinator",
    passwordHash: await hashPassword(password),
  });
  console.log("Coordinator account created");
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.name : "seed_failed");
  process.exit(1);
});
