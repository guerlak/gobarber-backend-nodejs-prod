import { Router } from "express";
import ProvidersControllers from "../controllers/ProvidersControllers";
import { celebrate, Segments, Joi } from "celebrate";

const providersRouter = Router();
const providersController = new ProvidersControllers();

providersRouter.get("/", providersController.listAll);

providersRouter.get(
  "/:provider_id/available-month",
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required(),
    },
  }),
  providersController.showMonthAvailable
);

providersRouter.get(
  "/:provider_id/available-day",
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().required(),
    },
  }),
  providersController.showHoursDayAvailable
);

export default providersRouter;
