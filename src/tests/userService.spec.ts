import { jest } from "@jest/globals";
import usersRepository from "repositories/usersRepository";
import usersServices from "services/usersServices";

describe("Create User Service", () => {
  it("should be able to create a user", async () => {
    const user = {
      name: "Name Test",
      email: "email@test.com",
      password: "testpass",
    };

    const createdUser = {
      id: "1",
      name: user.name,
      email: user.email,
      password: `${user.password}-hashed`,
    };

    jest
      .spyOn(usersRepository, "getUserByEmailRepository")
      .mockImplementationOnce((): any => {
        return [];
      });

    jest
      .spyOn(usersRepository, "createUserRepository")
      .mockImplementationOnce((): any => {
        return createdUser;
      });

    jest
      .spyOn(usersRepository, "getUserByEmailRepository")
      .mockImplementationOnce((): any => {
        return createdUser;
      });

    const result = await usersServices.createUserService(user);

    expect(result).toBeDefined(); // verifica se o valor esperado NÃO é undefined
    expect(createdUser.id).toBeDefined;
    expect(createdUser.name).toBe(user.name);
    expect(createdUser.email).toBe(user.email);
    expect(createdUser.password).not.toBe(user.password);
  });

  it("should be able to not create a user that already exists", () => {
    const user = {
      name: "Name Test",
      email: "email@test.com",
      password: "testpass",
    };

    jest
      .spyOn(usersRepository, "getUserByEmailRepository")
      .mockImplementationOnce((): any => {
        return [user];
      });

    const promise = usersServices.createUserService(user);

    expect(promise).rejects.toBeInstanceOf(Error);
  });
});
