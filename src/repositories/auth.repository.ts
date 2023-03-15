import { db } from "../database/db";

export async function createNewSessionRepository(token: string, userId: string) {
  await db.query(
    `
         INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
    [token, userId]
  );
}
