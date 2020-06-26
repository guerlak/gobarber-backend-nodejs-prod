import FakeAppointmentsRepo from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderMonthAvalableService from "./ListProviderMonthAvailableService";

describe("Providers", () => {
  it("should be able to list the MONTH avalability from provider", async () => {
    const fakeRepo = new FakeAppointmentsRepo();
    const availableListProvider = new ListProviderMonthAvalableService(
      fakeRepo
    );

    for (let i = 8; i < 18; i++) {
      await fakeRepo.create({
        provider_id: "123",
        date: new Date(2020, 4, 21, i, 0, 0),
        user_id: "111",
      });
    }

    const availableDays = await availableListProvider.execute({
      provider_id: "123",
      month: 5,
      year: 2020,
    });

    expect(availableDays).toEqual(
      expect.arrayContaining([{ day: 22, available: false }])
    );
  });
});
