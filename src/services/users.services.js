import {
  createUserRepository,
  getRankingByUserRepository,
  getUrlsByUserIdRepository,
  getUserByEmailRepository,
  getViewsUrlByUserIdRepository,
} from "../repositories/users.repository.js";
import bcrypt from "bcrypt";

export async function createUserService({ name, email, password }) {
  const existingUsers = await getUserByEmailRepository(email);
  if (existingUsers.length > 0) throw new Error("User already exist");
  const passwordHash = bcrypt.hashSync(password, 10);
  await createUserRepository(name, email, passwordHash);
}

export async function getByIdUserService(user) {
  const visitResult = await getViewsUrlByUserIdRepository(user.id);
  const [visitCount] = visitResult.rows;
  const urlsResult = await getUrlsByUserIdRepository(user.id);
  const userUrls = urlsResult.rows;
  const userResult = {
    id: user.id,
    name: user.name,
    visitCount: visitCount.sum || 0,
    shortenedUrls: userUrls,
  };
  return userResult;
}

export async function getRankingByUserService() {
  const { rows } = await getRankingByUserRepository()
  return rows;
}
