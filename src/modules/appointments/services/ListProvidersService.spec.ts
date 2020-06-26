import FakeUsersRepo from "@modules/users/repositories/fakes/FakeUserRepository";
import ListProviderService from "../services/ListProvidersService";

describe("Providers", () => {
  it("should be able to list providers excepting logged user", async () => {
    const userRepo = new FakeUsersRepo();
    const listProvidersService = new ListProviderService(userRepo);

    const user1 = await userRepo.createUser({
      email: "guerlak@hotmail.com",
      password: "aloha",
      name: "Rafael",
    });
    const user2 = await userRepo.createUser({
      email: "guerlak@hotmail.com",
      password: "aloha",
      name: "Martina",
    });
    const user3 = await userRepo.createUser({
      email: "guerlak@hotmail.com",
      password: "aloha",
      name: "Mari",
    });

    const providers = await listProvidersService.execute(user1.id);

    expect(providers).toEqual([user2, user3]);
  });
});
