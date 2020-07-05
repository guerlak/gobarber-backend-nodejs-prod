import ResetPassordService from "@modules/users/services/ResetPasswordService";
import { container } from "tsyringe";
import { Request, Response } from "express";

class ResetPasswordController {
  public async create(req: Request, res: Response) {
    const { password } = req.body;
    const { token } = req.query;
    console.log(req.query);

    console.log("token");
    console.log(token);
    const resetService = container.resolve(ResetPassordService);
    // const auth = await resetService.execute({ token, password });

    return res.status(401).json("auth");
  }
}

export default ResetPasswordController;
