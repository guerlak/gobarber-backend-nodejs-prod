import { Router } from "express";
import ProfileController from "../controllers/ProfileController";
import { celebrate, Segments, Joi } from "celebrate";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get("/", profileController.index);
profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      old_password: Joi.any(),
      password: Joi.any(),
    },
  }),
  profileController.updateProfile
);

export default profileRouter;
