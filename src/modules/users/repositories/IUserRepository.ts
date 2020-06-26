import User from "../infra/typeorm/entities/User";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IUpdateUserDTO from "../dtos/IUpdateUserDTO";
import Except_UserID from "../dtos/ExceptUserDTO";

export default interface IUserRepository {
  findAllProviders(user_id?: Except_UserID): Promise<User[] | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  createUser(data: ICreateUserDTO): Promise<User>;
  save(user: ICreateUserDTO): Promise<User>;
}
