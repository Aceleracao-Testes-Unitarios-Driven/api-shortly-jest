import urlsRepository from "../repositories/urlsRepository";

async function shortenUrlService(
  url: string,
  shortUrl: string,
  id: string
) {
  const result = await urlsRepository.shortenUrlRepository(url, shortUrl, id);
  if (result.rowCount < 0) throw new Error("Error shortening url ");
}

async function getUrlByIdService(id: string) {
  const result = await urlsRepository.getUrlByIdRepository(id);

  if (result.rowCount === 0) throw new Error("Url not found");

  const [url] = result.rows;

  delete url.views;
  delete url.userId;
  delete url.createdAt;

  return url;
}

async function openShortUrlService(shortUrl: string) {
  const result = await urlsRepository.getShotenByShortUrlRepository(shortUrl);
  if (result.rowCount === 0) throw new Error("Url not found");
  const [url] = result.rows;
  await urlsRepository.openShortUrlByIdRepository(url.id);
  return url;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

async function deleteUrlService(id: string, user: IUser) {
  const result = await urlsRepository.getUrlByIdRepository(id);
  if (result.rowCount === 0) throw new Error("Url not found");
  const [url] = result.rows;
  if (url.userId !== user.id) throw new Error("You cannot delete this url");
  await urlsRepository.deleteUrlRepository(id);
}

export default {
  shortenUrlService,
  getUrlByIdService,
  openShortUrlService,
  deleteUrlService
}