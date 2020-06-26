import CreateUserService from "../../../services/CreateUserService";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { classToClass } from "class-transformer";

class UsersControllers {
  public async createUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const service = container.resolve(CreateUserService);
    const user = await service.execute({ name, email, password });
    return res.json(classToClass(user));
  }
}

export default UsersControllers;
