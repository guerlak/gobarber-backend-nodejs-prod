import { inject, injectable } from "tsyringe";
import path from "path";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import ITokensRepository from "@modules/users/repositories/ITokenRepository";

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPassService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("TokensRepository")
    private tokensRepository: ITokensRepository
  ) {}

  public async execute(data: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("No user found");
    }

    const { token } = await this.tokensRepository.generate(user.id);

    const forgotPassTemplate = path.resolve(
      __dirname,
      "..",
      "views",
      "forgot_password.hbs"
    );

    this.mailProvider.sendEmail({
      subject: "Recuperação de senha | GoBarber",
      to: {
        name: user.name,
        email: user.email,
      },
      template: {
        file: forgotPassTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPassService;
