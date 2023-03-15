import {Router} from "express";
import urlsRouter from "./urls.routes";
import usersRouter from "./users.routes";
import authRouter from "./auth.routes";

const router = Router();

router.use(authRouter);
router.use(usersRouter);
router.use(urlsRouter);

export default router;