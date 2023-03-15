import {
  deleteUrlRepository,
  getShotenByShortUrlRepository,
  getUrlByIdRepository,
  openShortUrlByIdRepository,
  shortenUrlRepository,
} from "../repositories/urls.repository.js";

export async function shortenUrlService(url, shortUrl, id) {
  const result = await shortenUrlRepository(url, shortUrl, id);
  if (result.rowCount < 0) throw new Error("Error shortening url ");
}

export async function getUrlByIdService(id) {
  const result = await getUrlByIdRepository(id);

  if (result.rowCount === 0) throw new Error("Url not found");

  const [url] = result.rows;

  delete url.views;
  delete url.userId;
  delete url.createdAt;

  return url;
}

export async function openShortUrlService(shortUrl) {
  const result = await getShotenByShortUrlRepository(shortUrl);
  if (result.rowCount === 0) throw new Error("Url not found");
  const [url] = result.rows;
  await openShortUrlByIdRepository(url.id);
  return url;
}

export async function deleteUrlService(id, user) {
  const result = await getUrlByIdRepository(id);
  if (result.rowCount === 0) throw new Error("Url not found");
  const [url] = result.rows;
  if (url.userId !== user.id) throw new Error("You cannot delete this url");
  await deleteUrlRepository(id);
}
