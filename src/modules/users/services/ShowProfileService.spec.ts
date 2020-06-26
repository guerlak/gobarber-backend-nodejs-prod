import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import ShowProfileService from "./ShowProfileService";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";

describe("User Profile", () => {
  it("should be able to show the user profile", async () => {
    const fakeUsersRepo = new FakeUsersRepository();
    const updateAvatar = new ShowProfileService(fakeUsersRepo);

    const user = await fakeUsersRepo.createUser({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });

    await updateAvatar.execute({
      user_id: user.id,
    });

    expect(user.name).toBe("Rafa");
    expect(user.email).toBe("guerlak@hotmail.com");
  });
});
