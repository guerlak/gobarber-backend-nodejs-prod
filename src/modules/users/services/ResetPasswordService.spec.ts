import FakeUserRepo from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
//must place after to avoid import metadata
import ResetPasswordService from "./ResetPasswordService";
import FakeUsersTokenRepo from "../repositories/fakes/FakeTokensRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import Token from "@modules/users/infra/typeorm/entities/UserToken";

let usersRepo: FakeUserRepo;
let fakeMail: FakeMailProvider;
let tokensRepo: FakeUsersTokenRepo;
let hashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe("Reset Password Service", () => {
  beforeEach(() => {
    usersRepo = new FakeUserRepo();
    fakeMail = new FakeMailProvider();
    tokensRepo = new FakeUsersTokenRepo();
    hashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      usersRepo,
      fakeMail,
      tokensRepo,
      hashProvider
    );
  });

  it("should be able to reset password", async () => {
    let user = await usersRepo.createUser({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });
    const token = await tokensRepo.generate(user.id);
    const isHashRuns = jest.spyOn(hashProvider, "generateHash");

    await resetPasswordService.execute({ password: "aloha99", token });

    const updatedUser = await usersRepo.findById(user.id);

    expect(updatedUser?.password).toBe("hashed-aloha99");
    expect(isHashRuns).toHaveBeenCalled();
  });

  it("should not be able to reset password with not existing token", async () => {
    let user = await usersRepo.createUser({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });

    await tokensRepo.generate(user.id);
    const tokenTo = new Token();
    await expect(
      resetPasswordService.execute({
        token: tokenTo,
        password: "alo",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to reset password with not existing user", async () => {
    await tokensRepo.generate("no");
    const tokenTo = new Token();
    await expect(
      resetPasswordService.execute({
        token: tokenTo,
        password: "alo",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to reset password after 2 hours", async () => {
    let user = await usersRepo.createUser({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });
    const token = await tokensRepo.generate(user.id);

    // Get fn now() from JS Date
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        token: token,
        password: "aloha99",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
