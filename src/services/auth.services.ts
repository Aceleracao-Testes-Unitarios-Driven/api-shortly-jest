import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { createNewSessionRepository } from "../repositories/auth.repository";
import { getUserByEmailRepository } from "../repositories/users.repository";

interface ISign {
  email: string;
  password: string;
}

export async function signinService({ email, password }: ISign) {
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
