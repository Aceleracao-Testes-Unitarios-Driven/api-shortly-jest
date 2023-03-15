import { Router } from "express";
import { authValidation } from "../middlewares/authorization.middlewares";
import {
  shortenUrl,
  getUrlById,
  deleteUrl,
  openShortUrl,
} from "../controllers/urls.controller";
import urlSchema from "../models/urlSchema";
import { validateSchema } from "../middlewares/schemaValidator";

const router = Router();

router.post(
  "/urls/shorten",
  validateSchema(urlSchema),
  authValidation,
  shortenUrl
);
router.get("/urls/:id", getUrlById);
router.delete("/urls/:id", authValidation, deleteUrl);
router.get("/urls/open/:shortUrl", openShortUrl);

export default router;
