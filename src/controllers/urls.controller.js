import { nanoid } from "nanoid";
import { db } from "../database/db.js";
import {
  deleteUrlService,
  getUrlByIdService,
  openShortUrlService,
  shortenUrlService,
} from "../services/urls.services.js";

export async function shortenUrl(req, res) {
  const { id } = res.locals.user;
  const { url } = req.body;

  try {
    const shortUrl = nanoid(8);
    await shortenUrlService(url, shortUrl, id);
    res.status(201).send({ shortUrl });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params;

  try {
    const url = await getUrlByIdService(id);
    res.send(url);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function openShortUrl(req, res) {
  const { shortUrl } = req.params;
  try {
    const url = await openShortUrlService(shortUrl);
    res.redirect(url.url);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function deleteUrl(req, res) {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    await deleteUrlService(id, user);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}
