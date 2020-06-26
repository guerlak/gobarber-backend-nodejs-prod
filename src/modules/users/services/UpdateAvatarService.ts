import { inject, injectable } from "tsyringe";
import User from "../infra/typeorm/entities/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/models/IStorageProvider";

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User isn't exists or not authenticated");
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }
    await this.storageProvider.saveFile(avatarFileName);

    user.avatar = avatarFileName;
    const savedUser = await this.usersRepository.save(user);
    console.log(savedUser);

    return savedUser;
  }
}
export default UpdateAvatarService;
