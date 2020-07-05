import { Router } from "express";
import SendForgotPassword from "../controllers/ForgotPasswordController";
import ResetForgotPassword from "../controllers/ResetPasswordController";
import { celebrate, Segments, Joi } from "celebrate";

const passwordRouter = Router();
const sendForgotPassword = new SendForgotPassword();
const resetForgotPassword = new ResetForgotPassword();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  sendForgotPassword.create
);

passwordRouter.post(
  "/reset-password",
  // celebrate({
  //   [Segments.BODY]: {
  //     password: Joi.string().required(),
  //     password_confirmation: Joi.string().required().valid(Joi.ref("password")),
  //   },
  //   [Segments.QUERY]: {
  //     token: Joi.string().required(),
  //   },
  // }),
  resetForgotPassword.create
);

export default passwordRouter;
