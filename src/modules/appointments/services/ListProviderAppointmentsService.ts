import IAppointmentRepository from "../repositories/IAppointmentRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { inject, injectable } from "tsyringe";
import Appointment from "../infra/typeorm/entities/Appointment";
import { classToClass } from "class-transformer";

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProvidersAppointmentsService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentRepository: IAppointmentRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appointment[]> {
    const cacheKey = `providers-appointments:${provider_id}:${year}-${month}-${day}`;
    let appointments = await this.cacheProvider.get<Appointment[]>(cacheKey);

    const date = new Date(`${year}, ${month}, ${day}`);
    const isChacheEmpty = !appointments || appointments.length < 1;

    if (!appointments) {
      console.log("Running query on DB");
      appointments = await this.appointmentRepository.findByDay(
        provider_id,
        date
      );
      await this.cacheProvider.save(cacheKey, classToClass(appointments));
    }
    return appointments;
  }
}

export default ListProvidersAppointmentsService;
