import { Router } from "express";
import SessionController from "../controllers/SessionController";
import { celebrate, Segments, Joi } from "celebrate";

const sessionsRouter = Router();
const sessionController = new SessionController();

// sessionsRouter.get("/", async (req, res) => {});

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create
);

export default sessionsRouter;
