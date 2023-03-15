import { Request, Response } from "express";
import userService from "../services/usersServices";

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body;
  try {
    await userService.createUserService({ name, email, password });
    res.sendStatus(201);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function getUserById(req: Request, res: Response) {
  const { user } = res.locals;
  try {
    const result = await userService.getByIdUserService(user);
    res.send(result);
  } catch (error: any) {
    return res.status(500).send(error.message);
  }
}

export async function getRanking(req: Request, res: Response) {
  try {
    const rows = await userService.getRankingByUserService();
    res.send(rows);
  } catch (error: any) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}
