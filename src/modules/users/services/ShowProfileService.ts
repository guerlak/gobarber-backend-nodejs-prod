import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new Error("User isn't exists ou not authenticated.");
    }
    return user;
  }
}
export default ShowProfileService;
