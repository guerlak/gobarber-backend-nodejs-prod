import CreateSessionService from "@modules/users/services/CreateSessionService";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { classToClass } from "class-transformer";

class SessionController {
  public async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const sessionService = container.resolve(CreateSessionService);
    const { token, user } = await sessionService.execute({ email, password });

    return res.json({ user: classToClass(user), token });
  }
}

export default SessionController;
