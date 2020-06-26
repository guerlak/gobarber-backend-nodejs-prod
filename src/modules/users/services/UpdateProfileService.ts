import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    email,
    password,
    name,
    old_password,
    user_id,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User isn't exists ou not authenticated");
    }

    if (!old_password) {
      throw new Error("Current password needed");
    }

    const checkOldPassword = await this.hashProvider.compareHash(
      old_password,
      user.password
    );

    if (!checkOldPassword) {
      throw new Error("Old password wrong");
    }

    const userEmailExist = await this.usersRepository.findByEmail(email);

    if (userEmailExist && userEmailExist.id !== user_id) {
      throw new Error("This email already exist");
    }

    if (password && !old_password) {
      throw new Error("Old password needed");
    }

    if (password && old_password) {
      console.log("entrou");

      user.password = await this.hashProvider.generateHash(password);
    }

    if (email) {
      user.email = email;
    }

    if (name) {
      user.name = name;
    }
    return await this.usersRepository.save(user);
  }
}
export default UpdateProfileService;
