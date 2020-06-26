import { Router } from "express";
import AppointmentsController from "../controllers/AppointmentsController";
import ProviderAppointmentsController from "../controllers/ProvidersAppointmentsController";
import { celebrate, Segments, Joi } from "celebrate";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.get("/me", providerAppointmentsController.index);
appointmentsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().required(),
      date: Joi.date().required(),
    },
  }),

  appointmentsController.create
);

export default appointmentsRouter;
