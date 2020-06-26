import FakeUsersRepository from "../repositories/fakes/FakeUserRepository";
import UpdateAvatarService from "./UpdateAvatarService";
import FakeStorageProvider from "@shared/container/providers/StorageProvider/fakes/FakeStorageProvider";

describe("CreateUser", () => {
  it("should be able to update the user avatar", async () => {
    const fakeUsersRepo = new FakeUsersRepository();
    const fakeStorage = new FakeStorageProvider();
    const updateAvatar = new UpdateAvatarService(fakeUsersRepo, fakeStorage);

    const user = await fakeUsersRepo.createUser({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });

    await updateAvatar.execute({
      avatarFileName: "guerlak.png",
      user_id: user.id,
    });

    expect(user.avatar).toBe("guerlak.png");
  });

  it("should not be able to update avatar on no exist user", async () => {
    const fakeUsersRepo = new FakeUsersRepository();
    const fakeStorage = new FakeStorageProvider();
    const updateAvatar = new UpdateAvatarService(fakeUsersRepo, fakeStorage);

    expect(
      updateAvatar.execute({
        avatarFileName: "guerlak.png",
        user_id: "122312",
      })
    ).rejects.toBeInstanceOf(Error);
  });
  it("should be able to delete avatar file while creating new one", async () => {
    const fakeUsersRepo = new FakeUsersRepository();
    const fakeStorage = new FakeStorageProvider();
    const updateAvatar = new UpdateAvatarService(fakeUsersRepo, fakeStorage);

    const deleteFn = jest.spyOn(fakeStorage, "deleteFile");

    const user = await fakeUsersRepo.createUser({
      name: "Rafa",
      email: "guerlak@hotmail.com",
      password: "aloha",
    });

    await updateAvatar.execute({
      avatarFileName: "guerlak.png",
      user_id: user.id,
    });

    await updateAvatar.execute({
      avatarFileName: "guerlak_updated.png",
      user_id: user.id,
    });

    expect(deleteFn).toHaveBeenCalledWith("guerlak.png");
    expect(user.avatar).toBe("guerlak_updated.png");
  });
});
