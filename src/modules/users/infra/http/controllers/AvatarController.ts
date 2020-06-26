import UpdateAvatarService from "../../../services/UpdateAvatarService";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { classToClass } from "class-transformer";

class AvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const avatarService = container.resolve(UpdateAvatarService);
    const user = await avatarService.execute({
      user_id: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.json(classToClass(user));
  }
}

export default AvatarController;
