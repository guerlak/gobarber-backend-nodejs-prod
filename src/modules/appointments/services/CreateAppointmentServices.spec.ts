import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationRepository";
import CreateAppointmentService from "./CreateAppointmentServices";

describe("Create Appointments", () => {
  let fakeAppointmentsRepo: FakeAppointmentsRepository;
  let fakeNotificationsRepo: FakeNotificationsRepository;
  let createAppointmentService: CreateAppointmentService;

  beforeEach(() => {
    fakeAppointmentsRepo = new FakeAppointmentsRepository();
    fakeNotificationsRepo = new FakeNotificationsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepo,
      fakeNotificationsRepo
    );
  });

  it("should be able to create a new appointment", async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 14, 14),
      provider_id: "12322323",
      user_id: "1232",
    });
    expect(appointment).toHaveProperty("id");
  });
  it("should not be able to create a new appointment at same time", async () => {
    const appointmentDate = new Date(2020, 4, 15, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: "12322323",
      user_id: "1232",
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: "12322323",
        user_id: "1232",
      })
    ).rejects.toBeInstanceOf(Error);
  });
  it("should not be able to create a new appointment in a past date", async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: "12322323",
        user_id: "1232",
      })
    ).rejects.toBeInstanceOf(Error);
  });
  it("should not be able to create a new appointment with same provider and user id", async () => {
    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: "12322323",
        user_id: "12322323",
      })
    ).rejects.toBeInstanceOf(Error);
  });
  it("should not be able to create a new appointment out of available hours", async () => {
    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 4, 16, 2),
        provider_id: "12322323",
        user_id: "user",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
