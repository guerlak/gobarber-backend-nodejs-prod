import FakeAppointmentsRepo from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderDayAvalableService from "./ListProviderDayAvailableService";

describe("Providers", () => {
  it("should be able to list the DAY avalability from provider", async () => {
    const fakeRepo = new FakeAppointmentsRepo();
    const availableListProvider = new ListProviderDayAvalableService(fakeRepo);

    for (let i = 8; i < 10; i++) {
      await fakeRepo.create({
        date: new Date(2020, 4, 21, i, 0, 0),
        provider_id: "12345",
        user_id: "user",
      });
    }

    const availableDays = await availableListProvider.execute({
      provider_id: "123",
      day: 21,
      month: 5,
      year: 2020,
    });

    expect(availableDays).toEqual(
      expect.arrayContaining([{ hour: 9, available: false }])
    );
  });
  it("should be able to list unavailable hour in day that the current time is after", async () => {
    const fakeRepo = new FakeAppointmentsRepo();
    const availableListProvider = new ListProviderDayAvalableService(fakeRepo);

    for (let i = 12; i < 15; i++) {
      await fakeRepo.create({
        date: new Date(2020, 4, 21, i, 0, 0),
        provider_id: "12345",
        user_id: "user",
      });
    }

    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 21, 15).getTime();
    });

    const availableDays = await availableListProvider.execute({
      provider_id: "123",
      day: 21,
      month: 5,
      year: 2020,
    });

    expect(availableDays).toEqual(
      expect.arrayContaining([
        { hour: 9, available: false },
        { hour: 13, available: false },
        { hour: 17, available: true },
      ])
    );
  });
});
