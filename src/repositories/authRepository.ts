import { db } from "../database/db";

async function createNewSessionRepository(token: string, userId: string) {
  await db.query(
    `
         INSERT INTO sessions (token, "userId") VALUES ($1, $2)`,
    [token, userId]
  );
}

export default {
  createNewSessionRepository
}
