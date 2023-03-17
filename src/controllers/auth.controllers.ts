import { Request, Response } from "express";
import authService from "../services/authServices";

export async function signin(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const result = await authService.signinService(email, password);
    res.send(result);
  } catch (err: any) {
    res.status(401).send(err.message);
  }
}
