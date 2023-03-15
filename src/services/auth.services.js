import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { createNewSessionRepository } from "../repositories/auth.repository.js";
import { getUserByEmailRepository } from "../repositories/users.repository.js";

export async function signinService({ email, password }) {
  const users = await getUserByEmailRepository(email);
  const [user] = users;
  if (!user) {
    throw new Error("Wrong password or username");
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = uuid();
    await createNewSessionRepository(token, user.id);
    return { token };
  } else {
    throw new Error("Wrong password or username");
  }
}
