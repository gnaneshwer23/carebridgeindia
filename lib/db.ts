import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

function connectionString() {
  const raw = process.env.DATABASE_URL;
  if (!raw) throw new Error("DATABASE_URL is not set");
  const url = new URL(raw);
  url.searchParams.delete("channel_binding");
  return url.toString();
}

function createDb() {
  const sql = neon(connectionString());
  return drizzle(sql, { schema });
}

let database: ReturnType<typeof createDb> | null = null;

export function getDb() {
  if (!database) database = createDb();
  return database;
}

export type Database = ReturnType<typeof getDb>;
