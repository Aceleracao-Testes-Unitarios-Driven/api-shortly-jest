import { db } from "../database/db.js";

export async function shortenUrlRepository(url, shortUrl, id) {
  return await db.query(
    `
          INSERT INTO shortens(url, "shortUrl", "userId")
          VALUES ($1, $2, $3)
        `,
    [url, shortUrl, id]
  );
}

export async function getUrlByIdRepository(id) {
  return await db.query(`SELECT * FROM shortens WHERE id = $1`, [id]);
}

export async function getShotenByShortUrlRepository(shortUrl) {
  return await db.query(
    `
      SELECT * 
      FROM shortens 
      WHERE "shortUrl" = $1`,
    [shortUrl]
  );
}

export async function openShortUrlByIdRepository(id) {
  return await db.query(
    `
          UPDATE shortens
          SET "views" = "views" + 1
          WHERE id = $1`,
    [id]
  );
}

export async function deleteUrlRepository(id) {
  await db.query("DELETE FROM shortens WHERE id=$1", [id]);
}
