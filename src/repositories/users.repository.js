import { db } from "../database/db.js";

export async function getUserByEmailRepository(email) {
  const { rows: users } = await db.query(
    `SELECT * FROM users WHERE email = $1 `,
    [email]
  );

  return users;
}

export async function createUserRepository(name, email, passwordHash) {
  await db.query(
    `
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3)`,
    [name, email, passwordHash]
  );
}

export async function getViewsUrlByUserIdRepository(id) {
  return await db.query(
    `SELECT SUM(s."views") 
      FROM shortens s 
      WHERE s."userId" = $1`,
    [id]
  );
}

export async function getUrlsByUserIdRepository(id) {
  return await db.query(`SELECT * FROM shortens s WHERE s."userId" = $1`, [id]);
}

export async function getRankingByUserRepository(){
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