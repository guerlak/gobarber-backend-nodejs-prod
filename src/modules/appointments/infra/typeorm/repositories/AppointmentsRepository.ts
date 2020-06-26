import { Repository, getRepository, Raw, Between } from "typeorm";
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";
import Appointment from "../entities/Appointment";
import ICreateAppointmentDTO from "@modules/appointments/dtos/ICreateAppointmentDTO";
import IFindDaysDTO from "@modules/appointments/dtos/IFindDaysDTO";
import { startOfHour, endOfHour, addDays } from "date-fns";

class AppointmentsRepository implements IAppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async listAll() {
    return this.ormRepository.find();
  }

  public async findAllInMonthfromProvider(
    provider_id: string,
    month: number,
    year: number
  ): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, "0");
    const appointments = this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        ),
      },
    });

    return appointments;
  }

  public async findHoursDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindDaysDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, "0");
    const parsedDay = String(day).padStart(2, "0");
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (dateFieldName) =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY')='${parsedDay}-${parsedMonth}-${year}'`
        ),
      },
    });

    return appointments;
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(data);
    await this.ormRepository.save(appointment);
    return appointment;
  }

  public async findByDay(
    provider_id: string,
    date: Date
  ): Promise<Appointment[]> {
    console.log("test");
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Between(date, addDays(date, 1)),
      },
      relations: ["user"],
    });

    return appointments;
  }

  public async findOneByDate(
    provider_id: string,
    date: Date
  ): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({
      where: {
        provider_id,
        date: date,
      },
    });
    return appointment;
  }
}
export default AppointmentsRepository;
