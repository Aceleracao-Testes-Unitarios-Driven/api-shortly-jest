import { jest } from "@jest/globals";
import usersRepository from "repositories/usersRepository";
import bcrypt from "bcrypt";
import authRepository from "repositories/authRepository";
import authServices from "services/authServices";

jest.mock("uuid", () => ({ v4: () => "RandomString" }));

describe("Auth user", () => {
  it("should be able to auth an user", async () => {
    const user = {
      id: 1,
      name: "Name Test",
      email: "email@test.com",
      password: "testpass",
    };

    jest
      .spyOn(usersRepository, "getUserByEmailRepository")
      .mockImplementationOnce((): any => {
        return [user];
      });

    const bcryptCompare = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve(true));

    (bcrypt.compare as jest.Mock) = bcryptCompare;

    jest
      .spyOn(authRepository, "createNewSessionRepository")
      .mockImplementationOnce((): any => {});

    const result = await authServices.signinService(user.email, user.password);

    expect(result).toHaveProperty("token");
    expect(result).toEqual({ token: "RandomString" });
  });

  it("should not be able to auth an nonexistent user", () => {
    expect(async () => {
      const user = {
        id: 1,
        name: "Name Test",
        email: "email@test.com",
        password: "testpass",
      };

      jest
        .spyOn(usersRepository, "getUserByEmailRepository")
        .mockImplementationOnce((): any => {
          return undefined;
        });

      await authServices.signinService(user.email, user.password);
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to auth an wrong password", () => {
    expect(async () => {
      const user = {
        id: 1,
        name: "Name Test",
        email: "email@test.com",
        password: "testpass",
      };

      jest
        .spyOn(usersRepository, "getUserByEmailRepository")
        .mockImplementationOnce((): any => {
          return [user];
        });

      const bcryptCompare = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(false));

      (bcrypt.compare as jest.Mock) = bcryptCompare;

      await authServices.signinService(user.email, user.password);
    }).rejects.toBeInstanceOf(Error);
  });
});
