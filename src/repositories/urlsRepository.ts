import { db } from "../database/db";

async function shortenUrlRepository(url: string, shortUrl: string, id: string) {
  return await db.query(
    `
          INSERT INTO shortens(url, "shortUrl", "userId")
          VALUES ($1, $2, $3)
        `,
    [url, shortUrl, id]
  );
}

async function getUrlByIdRepository(id: string) {
  return await db.query(`SELECT * FROM shortens WHERE id = $1`, [id]);
}

async function getShotenByShortUrlRepository(shortUrl: string) {
  return await db.query(
    `
      SELECT * 
      FROM shortens 
      WHERE "shortUrl" = $1`,
    [shortUrl]
  );
}

async function openShortUrlByIdRepository(id: string) {
  return await db.query(
    `
          UPDATE shortens
          SET "views" = "views" + 1
          WHERE id = $1`,
    [id]
  );
}

async function deleteUrlRepository(id: string) {
  await db.query("DELETE FROM shortens WHERE id=$1", [id]);
}

export default {
  shortenUrlRepository,
  getUrlByIdRepository,
  getShotenByShortUrlRepository,
  openShortUrlByIdRepository,
  deleteUrlRepository,
};
