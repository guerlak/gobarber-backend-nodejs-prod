import Appointment from "../infra/typeorm/entities/Appointment";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import IFindDaysDTO from "../dtos/IFindDaysDTO";

export default interface IAppointmentRepository {
  findByDay(provider_id: string, date: Date): Promise<Appointment[]>;
  findOneByDate(
    provider_id: string,
    date: Date
  ): Promise<Appointment | undefined>;
  findAllInMonthfromProvider(
    providerId: string,
    month: number,
    year: number
  ): Promise<Appointment[]>;
  findHoursDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindDaysDTO): Promise<Appointment[]>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  listAll(): Promise<Appointment[]>;
}
