import User from "../infra/typeorm/entities/User";
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUserRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const checkUserExist = await this.userRepository.findByEmail(email);

    if (checkUserExist) {
      throw new Error("Users email already exists");
    }

    const hashedpass = await this.hashProvider.generateHash(password);

    const user = this.userRepository.createUser({
      name,
      email,
      password: hashedpass,
    });

    await this.cacheProvider.invalidatePrefix(`providers-list`);

    return user;
  }
}

export default CreateUserService;
