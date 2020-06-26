import { container } from "tsyringe";
import { Request, Response } from "express";
import ListProvidersAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";
import { classToClass } from "class-transformer";

class ProvidersAppointmentsController {
  public async index(req: Request, res: Response) {
    const provider_id = req.user.id;
    const { day, month, year } = req.query;

    const listAppointments = container.resolve(
      ListProvidersAppointmentsService
    );
    const appointments = await listAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return res.json(classToClass(appointments));
  }
}

export default ProvidersAppointmentsController;
