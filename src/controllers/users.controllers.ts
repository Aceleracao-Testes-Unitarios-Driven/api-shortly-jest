import { Request, Response } from "express";
import {
  createUserService,
  getByIdUserService,
  getRankingByUserService,
} from "../services/users.services";

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;
  try {
    await createUserService({ name, email, password });
    res.sendStatus(201);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function getUserById(req: Request, res: Response) {
  const { user } = res.locals;
  try {
    const result = await getByIdUserService(user);
    res.send(result);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function getRanking(req: Request, res: Response) {
  try {
    const rows = await getRankingByUserService();
    res.send(rows);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}
