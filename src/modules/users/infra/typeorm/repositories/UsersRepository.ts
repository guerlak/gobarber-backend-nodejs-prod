import { getRepository, Repository, Not } from "typeorm";
import User from "../entities/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import ExceptUserDTO from "@modules/users/dtos/ExceptUserDTO";

class UsersRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  public async findAllProviders({
    except_user_id: user_id,
  }: ExceptUserDTO): Promise<User[]> {
    return this.userRepository.find({
      where: {
        id: Not(user_id),
      },
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  public async findById(id: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }
  public async createUser(user: ICreateUserDTO): Promise<User> {
    const response = this.userRepository.create(user);
    await this.userRepository.save(response);
    return response;
  }
  public async save(user: ICreateUserDTO): Promise<User> {
    const res = await this.userRepository.save(user);
    return res;
  }
}
export default UsersRepository;
