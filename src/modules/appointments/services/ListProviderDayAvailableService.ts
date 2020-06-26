import { inject, injectable } from "tsyringe";
import IAppointmentRepository from "@modules/appointments/repositories/IAppointmentRepository";
import { getHours, isAfter, getDate, getDay, getTime } from "date-fns";

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProvidersDayAvailableService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentRepository: IAppointmentRepository
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findHoursDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      }
    );

    let currentHour = getHours(new Date(Date.now()));

    if (currentHour > 17) {
      currentHour = 7;
    }
    const startHour = 8;
    const endHour = 17;
    const hours = [];

    for (let i = startHour; i <= endHour; i++) {
      hours.push(i);
    }

    const available = hours.map((hour) => {
      const hasAppointmentInHour = appointments.find(
        (a) => getHours(a.date) === hour
      );

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(hour, currentHour),
      };
    });

    console.log(available);

    return available;
  }
}

export default ListProvidersDayAvailableService;
