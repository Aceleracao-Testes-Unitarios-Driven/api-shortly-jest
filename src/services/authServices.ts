import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import authRepository from "../repositories/authRepository";
import usersRepository from "../repositories/usersRepository";

async function signinService(email: string, password: string) {
  const users = await usersRepository.getUserByEmailRepository(email);
  const [user] = users;
  if (!user) {
    throw new Error("Wrong password or username");
  }

  const resultComparePasswords = await bcrypt.compare(password, user.password);

  if (resultComparePasswords) {
    const token = uuid();
    await authRepository.createNewSessionRepository(token, user.id);
    return { token };
  } else {
    throw new Error("Wrong password or username");
  }
}

export default {
  signinService,
};
