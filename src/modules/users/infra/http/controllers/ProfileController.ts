import UpdateProfileService from "../../../services/UpdateProfileService";
import { container } from "tsyringe";
import { Request, Response } from "express";
import ShowProfileService from "@modules/users/services/ShowProfileService";
import { classToClass } from "class-transformer";

class ProfileController {
  public async index(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const showProfileService = container.resolve(ShowProfileService);

    const user = await showProfileService.execute({ user_id });
    return res.json(classToClass(user));
  }

  public async updateProfile(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { name, email, old_password, password } = req.body;
    const service = container.resolve(UpdateProfileService);
    const user = await service.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });
    return res.json(classToClass(user));
  }
}

export default ProfileController;
