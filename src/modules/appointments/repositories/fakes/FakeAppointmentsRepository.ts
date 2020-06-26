import IAppointmentRepository from "../IAppointmentRepository";
import Appointment from "../../infra/typeorm/entities/Appointment";
import IFindDaysDTO from "../../dtos/IFindDaysDTO";
import ICreateAppointmentDTO from "../../dtos/ICreateAppointmentDTO";
import { isEqual, getDate, getMonth, getYear } from "date-fns";
import { uuid } from "uuidv4";

class FakeAppointmentsRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async create({
    date,
    provider_id,
    user_id,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id, user_id });

    this.appointments.push(appointment);
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(appointment.date, date)
    );
    return findAppointment;
  }

  public async findAllInMonthfromProvider(
    provider_id: string,
    month: number,
    year: number
  ): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (app) =>
        app.provider_id === provider_id &&
        getMonth(app.date) === month - 1 &&
        getYear(app.date) === year
    );

    return appointments;
  }

  public async findHoursDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindDaysDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      (app) =>
        app.provider_id === provider_id &&
        getDate(app.date) === day &&
        getMonth(app.date) === month - 1 &&
        getYear(app.date) === year
    );
    return appointments;
  }

  public async listAll(): Promise<Appointment[] | undefined> {
    return this.appointments;
  }
}

export default FakeAppointmentsRepository;
