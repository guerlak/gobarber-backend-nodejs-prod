import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import CreateSessionService from "./CreateSessionService";
import CreateUserService from "./CreateUserService";
import AppError from "@shared/error/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";

describe("CreateSession", () => {
  let fakeRepo: FakeUsersRepository;
  let fakeHash: FakeHashProvider;
  let createSessionService: CreateSessionService;
  let createUserService: CreateUserService;

  beforeEach(() => {
    fakeRepo = new FakeUsersRepository();
    fakeHash = new FakeHashProvider();
    createUserService = new CreateUserService(fakeRepo, fakeHash);
    createSessionService = new CreateSessionService(fakeRepo, fakeHash);
  });

  it("should be able to authenticate", async () => {
    await createUserService.execute({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });

    const resp = await createSessionService.execute({
      email: "guerlak@hotmail.com",
      password: "aloha",
    });
    expect(resp).toHaveProperty("token");
  });
  it("should not be able to authenticate", async () => {
    await createUserService.execute({
      name: "rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });

    expect(
      createSessionService.execute({
        email: "guerlak2@hotmail.com",
        password: "1233",
      })
    ).rejects.toBeInstanceOf(AppError);
    expect(
      createSessionService.execute({
        email: "guerlak@hotmail.com",
        password: "1233",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
