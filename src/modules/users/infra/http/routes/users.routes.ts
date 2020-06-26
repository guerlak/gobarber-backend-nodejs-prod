import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import checkAuthentication from "../middlewares/checkAuthentication";
import UsersController from "../controllers/UsersController";
import AvatarController from "../controllers/AvatarController";
import { celebrate, Segments, Joi } from "celebrate";

const usersRouter = Router();
const usersController = new UsersController();
const avatarController = new AvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.createUser
);

usersRouter.patch(
  "/avatar",
  checkAuthentication, // auth middleware
  upload.single("avatar"), // file middleware
  avatarController.update
);

export default usersRouter;
