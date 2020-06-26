import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import CreateUserService from "./CreateUserService";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

describe("CreateUser", () => {
  it("should be able to create a new user", async () => {
    const fakeRepo = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeRepo, fakeHash);

    const user = await createUserService.execute({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "1234",
    });
    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with same email from an exist user", async () => {
    const fakeRepo = new FakeUsersRepository();
    const fakeHash = new FakeHashProvider();
    const createUserService = new CreateUserService(fakeRepo, fakeHash);

    await createUserService.execute({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "1234",
    });

    expect(
      createUserService.execute({
        name: "Rafa",
        email: "guerlak@hotmail.com",
        password: "1234",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
