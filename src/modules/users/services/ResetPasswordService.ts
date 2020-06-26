// import User from "../infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import ITokensRepo from "@modules/users/repositories/ITokenRepository";
import IToken from "../infra/typeorm/entities/UserToken";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import { differenceInHours } from "date-fns";
interface IRequest {
  password: string;
  token: IToken;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
    @inject("MailProvider")
    private mailProvider: IMailProvider,
    @inject("TokensRepository")
    private tokensRepository: ITokensRepo,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.tokensRepository.find(token);

    if (!userToken) {
      throw new Error("Token is not found");
    }

    const tokenCreatedAT = userToken.created_at;

    if (differenceInHours(Date.now(), tokenCreatedAT) > 2) {
      throw new Error("Token is expired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw Error("User w/ this token was not found");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    Object.assign(user, { password: hashedPassword });
    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
