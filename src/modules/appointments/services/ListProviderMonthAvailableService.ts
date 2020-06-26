import { inject, injectable } from "tsyringe";
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";
import { getDaysInMonth, getDate, isAfter, get } from "date-fns";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

@injectable()
class ListProvidersMonthAvailableService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentRepository: IAppointmentRepository,
    @inject("CacheProvider")
    private cacheRepository: ICacheProvider
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthfromProvider(
      provider_id,
      month,
      year
    );

    const numberDaysMonth = getDaysInMonth(new Date(year, month - 1));
    // const cacheData = await this.cacheRepository.get("apps");

    const monthDays = [];

    for (let i = 1; i <= numberDaysMonth; i++) {
      monthDays.push(i);
    }

    const available = monthDays.map((day) => {
      const appointmentsInDay = appointments?.filter(
        (app) => getDate(app.date) === day
      );

      if (appointmentsInDay === undefined) {
        throw new Error("No appointments");
      }

      const compareDate = isAfter(
        new Date(year, month - 1, day, 23, 59, 59),
        Date.now()
      );

      return {
        day,
        available: compareDate && appointmentsInDay.length < 10,
      };
    });

    // await this.cacheRepository.save("apps", "appointas");

    return available;
  }
}

export default ListProvidersMonthAvailableService;
