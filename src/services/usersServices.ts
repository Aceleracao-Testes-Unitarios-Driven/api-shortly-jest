import usersRepository from "../repositories/usersRepository";
import bcrypt from "bcrypt";

interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
}

async function createUserService({ name, email, password }: IUser) {
  const existingUsers = await usersRepository.getUserByEmailRepository(email);

  if (existingUsers.length > 0) throw new Error("User already exist");

  const passwordHash = bcrypt.hashSync(password, 10);

  await usersRepository.createUserRepository(name, email, passwordHash);

  const user = await usersRepository.getUserByEmailRepository(email);

  return user;
}

async function getByIdUserService(user: IUser) {
  const visitResult = await usersRepository.getViewsUrlByUserIdRepository(
    user.id!
  );
  const [visitCount] = visitResult.rows;
  const urlsResult = await usersRepository.getUrlsByUserIdRepository(user.id!);
  const userUrls = urlsResult.rows;
  const userResult = {
    id: user.id,
    name: user.name,
    visitCount: visitCount.sum || 0,
    shortenedUrls: userUrls,
  };
  return userResult;
}

async function getRankingByUserService() {
  const { rows } = await usersRepository.getRankingByUserRepository();
  return rows;
}

async function getAllUsersService() {
  const result = await usersRepository.getAllUsersRepository();
  return result;
}

export default {
  createUserService,
  getByIdUserService,
  getRankingByUserService,
  getAllUsersService,
};
