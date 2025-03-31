import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Ensure db is properly initialized
const sql = postgres({ host: 'localhost', user: 'postgres', password: 'password', database: 'solaceassignment'}); // Adjust connection details as needed
const db: PostgresJsDatabase = drizzle(sql);
import { advocates } from "../../../db/schema";
import { advocateData } from "../../../db/seed/advocates";

export async function POST() {
  const records = await db.insert(advocates).values(advocateData).returning();

  return Response.json({ advocates: records });
}
