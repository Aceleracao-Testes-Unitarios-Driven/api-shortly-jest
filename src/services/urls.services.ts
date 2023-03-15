import {
  deleteUrlRepository,
  getShotenByShortUrlRepository,
  getUrlByIdRepository,
  openShortUrlByIdRepository,
  shortenUrlRepository,
} from "../repositories/urls.repository";

export async function shortenUrlService(
  url: string,
  shortUrl: string,
  id: string
) {
  const result = await shortenUrlRepository(url, shortUrl, id);
  if (result.rowCount < 0) throw new Error("Error shortening url ");
}

export async function getUrlByIdService(id: string) {
  const result = await getUrlByIdRepository(id);

  if (result.rowCount === 0) throw new Error("Url not found");

  const [url] = result.rows;

  delete url.views;
  delete url.userId;
  delete url.createdAt;

  return url;
}

export async function openShortUrlService(shortUrl: string) {
  const result = await getShotenByShortUrlRepository(shortUrl);
  if (result.rowCount === 0) throw new Error("Url not found");
  const [url] = result.rows;
  await openShortUrlByIdRepository(url.id);
  return url;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export async function deleteUrlService(id: string, user: IUser) {
  const result = await getUrlByIdRepository(id);
  if (result.rowCount === 0) throw new Error("Url not found");
  const [url] = result.rows;
  if (url.userId !== user.id) throw new Error("You cannot delete this url");
  await deleteUrlRepository(id);
}
