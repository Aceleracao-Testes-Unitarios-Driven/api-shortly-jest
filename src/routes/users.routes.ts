import { Router } from "express";
import { getRanking, getUserById } from "../controllers/users.controllers";
import { authValidation } from "../middlewares/authorization.middlewares";

const router = Router();

router.get("/users/:id", authValidation, getUserById);
router.get("/ranking", getRanking);

export default router;
