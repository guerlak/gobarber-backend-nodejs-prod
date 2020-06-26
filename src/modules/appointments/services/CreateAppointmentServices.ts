import { inject, injectable } from "tsyringe";
import { startOfHour, isBefore, getHours, format } from "date-fns";
import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentRepository from "../repositories/IAppointmentRepository";
import INotificationsRepository from "@modules/notifications/repositories/INotificationsRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
interface IRequestDTO {
  user_id: string;
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentServices {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentRepository: IAppointmentRepository,
    @inject("NotificationsRepository")
    private notificationsRepository: INotificationsRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    date,
    user_id,
  }: IRequestDTO): Promise<Appointment> {
    if (isBefore(date, Date.now())) {
      throw Error("Appointments in the past are not allowed");
    }
    if (getHours(date) < 8 || getHours(date) > 17) {
      throw Error("Appointments can be created between 08h and 17h");
    }
    if (user_id === provider_id) {
      throw Error("Error: same provider and user ids");
    }

    const parsedDate = startOfHour(date);
    const cacheKey = `providers-appointments:${provider_id}:${format(
      date,
      "yyyy-M-d"
    )}`;

    this.cacheProvider.invalidate(cacheKey);

    const findAppointmentInSameDate = await this.appointmentRepository.findOneByDate(
      provider_id,
      parsedDate
    );

    if (findAppointmentInSameDate) {
      throw Error("This date is already booked");
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: parsedDate,
      user_id,
    });

    const dateFormat = format(date, "dd/MM/yyyy 'às' HH:mm");

    await this.notificationsRepository.create({
      content: "Voce tem um novo agendamento - " + dateFormat,
      user_id,
    });
    return appointment;
  }
}

export default CreateAppointmentServices;
