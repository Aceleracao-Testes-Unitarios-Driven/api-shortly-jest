import { db } from "../database/db";

async function getUserByEmailRepository(email: string) {
  const { rows: users } = await db.query(
    `SELECT * FROM users WHERE email = $1 `,
    [email]
  );

  return users;
}

async function createUserRepository(
  name: string,
  email: string,
  passwordHash: string
) {
  await db.query(
    `
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3)`,
    [name, email, passwordHash]
  );
}

async function getViewsUrlByUserIdRepository(id: string) {
  return await db.query(
    `SELECT SUM(s."views") 
      FROM shortens s 
      WHERE s."userId" = $1`,
    [id]
  );
}

async function getUrlsByUserIdRepository(id: string) {
  return await db.query(`SELECT * FROM shortens s WHERE s."userId" = $1`, [id]);
}

async function getRankingByUserRepository() {
  return await db.query(`
    SELECT 
      u.id, 
      u.name, 
      COUNT(s.id) as "linksCount", 
      COALESCE(SUM(s."views"), 0) as "visitCount"
    FROM users u
    LEFT JOIN shortens s ON s."userId" = u.id
    GROUP BY u.id
    ORDER BY "visitCount" DESC
    LIMIT 10
  `);
}

export default {
  getUserByEmailRepository,
  createUserRepository,
  getViewsUrlByUserIdRepository,
  getUrlsByUserIdRepository,
  getRankingByUserRepository,
};
