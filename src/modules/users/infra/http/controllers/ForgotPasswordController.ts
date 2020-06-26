import { container } from "tsyringe";
import { Request, Response } from "express";
import SendForgotPassService from "@modules/users/services/SendForgotPassService";

class ForgotController {
  public async create(req: Request, res: Response) {
    const sendForgotPass = container.resolve(SendForgotPassService);
    const { email } = req.body;

    await sendForgotPass.execute({ email: email });

    return res.status(204).json();
  }
}

export default ForgotController;
