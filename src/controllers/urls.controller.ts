import { Request, Response } from "express";
import { nanoid } from "nanoid";
import {
  deleteUrlService,
  getUrlByIdService,
  openShortUrlService,
  shortenUrlService,
} from "../services/urls.services";

export async function shortenUrl(req: Request, res: Response) {
  const { id } = res.locals.user;
  const { url } = req.body;

  try {
    const shortUrl = nanoid(8);
    await shortenUrlService(url, shortUrl, id);
    res.status(201).send({ shortUrl });
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function getUrlById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const url = await getUrlByIdService(id);
    res.send(url);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function openShortUrl(req: Request, res: Response) {
  const { shortUrl } = req.params;
  try {
    const url = await openShortUrlService(shortUrl);
    res.redirect(url.url);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function deleteUrl(req: Request, res: Response) {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    await deleteUrlService(id, user);
    res.sendStatus(204);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}
