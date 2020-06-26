import User from "../../infra/typeorm/entities/User";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import Except_UserID from "../../dtos/ExceptUserDTO";
import { uuid } from "uuidv4";

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: Except_UserID): Promise<User[] | undefined> {
    let { users } = this;
    if (except_user_id) {
      users = this.users.filter((u) => u.id !== except_user_id);
    }
    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find((u) => u.email === email);
    return user;
  }
  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find((u) => u.id === id);
    return user;
  }
  public async createUser({
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, { name }, { email }, { password });
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users[index] = user;
  }
}
export default FakeUsersRepository;
