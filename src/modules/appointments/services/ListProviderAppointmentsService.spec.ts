import FakeAppointmentsRepo from "../repositories/fakes/FakeAppointmentsRepository";
import FakeUsersRepo from "@modules/users/repositories/fakes/FakeUserRepository";
import ListAppointments from "./ListProviderAppointmentsService";
describe("Appointments", () => {
  it("should be able to list providers appointments", async () => {
    const fakeAppointmentsRepo = new FakeAppointmentsRepo();
    const listAppointments = new ListAppointments(fakeAppointmentsRepo);

    const a1 = await fakeAppointmentsRepo.create({
      date: new Date(2020, 1, 10, 10),
      provider_id: "123",
      user_id: "111",
    });
    const a2 = await fakeAppointmentsRepo.create({
      date: new Date(2020, 1, 10, 11),
      provider_id: "123",
      user_id: "111",
    });
    const a3 = await fakeAppointmentsRepo.create({
      date: new Date(2020, 1, 10, 12),
      provider_id: "123",
      user_id: "111",
    });
    const apps = await listAppointments.execute({
      provider_id: "123",
      day: 10,
      month: 2,
      year: 2020,
    });

    expect(apps).toEqual([a1, a2, a3]);
  });
});
