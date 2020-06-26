import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../infra/typeorm/entities/User";
import config from "@config/auth";
import AppError from "@shared/error/AppError";
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequestDTO {
  email: string;
  password: string;
}
interface IResponseDTO {
  user: User;
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject("UsersRepository") private userRepository: IUserRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination");
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password
    );
    if (!passwordMatch) {
      throw new AppError("Incorrect credencials");
    }

    const token = sign({}, config.jwt.secret, {
      subject: user.id,
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
