import { db } from "../database/db.js";
import { getRankingByUserRepository } from "../repositories/users.repository.js";
import {
  createUserService,
  getByIdUserService,
  getRankingByUserService,
} from "../services/users.services.js";

export async function createUser(req, res) {
  const { name, email, password } = req.body;
  try {
    await createUserService({ name, email, password });
    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getUserById(req, res) {
  const { user } = res.locals;
  try {
    const result = await getByIdUserService(user);
    res.send(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getRanking(req, res) {
  try {
    const rows = await getRankingByUserService();
    res.send(rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}
