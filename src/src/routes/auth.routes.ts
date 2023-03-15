import { Router } from "express";
import { signin } from "../controllers/auth.controllers";
import { createUser } from "../controllers/users.controllers";
import { validateSchema } from "../middlewares/schemaValidator";
import loginSchema from "../models/loginSchema";
import userSchema from "../models/userSchema";

const router = Router();

router.post("/signup", validateSchema(userSchema), createUser);
router.post("/signin", validateSchema(loginSchema), signin);

export default router;
