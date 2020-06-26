import { container } from "tsyringe";
import { Request, Response } from "express";
import CreateAppointmentServices from "@modules/appointments/services/CreateAppointmentServices";
class AppointmentsController {
  public async create(req: Request, res: Response) {
    const user_id = req.user.id;
    const { provider_id, date } = req.body;

    console.log("provider_id");
    console.log(provider_id);

    const createAppointment = container.resolve(CreateAppointmentServices);
    const appointment = await createAppointment.execute({
      provider_id,
      date,
      user_id,
    });
    return res.json(appointment);
  }
}

export default AppointmentsController;
