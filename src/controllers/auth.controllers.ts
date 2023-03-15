import { Request, Response } from "express";
import { signinService } from "../services/auth.services";

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const result = await signinService({ email, password });
    res.send(result);
  } catch (err: any) {
    res.status(401).send(err.message);
  }
}
