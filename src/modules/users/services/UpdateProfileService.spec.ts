import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UpdateProfileService from "./UpdateProfileService";
import CreateUserService from "./CreateUserService";

describe("Update Profile", () => {
  let fakeUsersRepo: FakeUsersRepository;
  let fakeHash: FakeHashProvider;
  let createUserService: CreateUserService;
  let updateProfileService: UpdateProfileService;

  beforeEach(() => {
    fakeUsersRepo = new FakeUsersRepository();
    fakeHash = new FakeHashProvider();
    createUserService = new CreateUserService(fakeUsersRepo, fakeHash);
    updateProfileService = new UpdateProfileService(fakeUsersRepo, fakeHash);
  });

  it("should be able to update the use profile", async () => {
    const user = await createUserService.execute({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });

    await updateProfileService.execute({
      user_id: user.id,
      name: "Rafael",
      email: "guerlak@hotmail.com",
    });

    expect(user.name).toBe("Rafael");
  });

  it("should NOT be able to update profile with an exist email", async () => {
    const user = await createUserService.execute({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });

    await fakeUsersRepo.createUser({
      name: "Rafa",
      email: "guerlak1@hotmail.com",
      password: "aloha",
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: "Rafael",
        email: "guerlak1@hotmail.com",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should be able to update password", async () => {
    const user = await createUserService.execute({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });

    await updateProfileService.execute({
      user_id: user.id,
      name: "Rafael",
      email: "guerlak@hotmail.com",
      old_password: "aloha",
      password: "aloha99",
    });

    expect(user.password).toBe("hashed-aloha99");
  });

  it("should not be able to update password with wrong or empty old password", async () => {
    const user = await createUserService.execute({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: "Rafael",
        email: "guerlak@hotmail.com",
        old_password: "aloha1",
        password: "aloha99",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
