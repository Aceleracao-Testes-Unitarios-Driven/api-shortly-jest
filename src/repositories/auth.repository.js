import { db } from "../database/db.js";

export async function createNewSessionRepository(token, userId) {
  await db.query(
    `
         INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
    [token, userId]
  );
}
