import { getRepository, Repository } from "typeorm";
import UserToken from "../entities/UserToken";
import ITokenRepository from "@modules/users/repositories/ITokenRepository";

class TokensRepository implements ITokenRepository {
  private typeOrmRepo: Repository<UserToken>;
  constructor() {
    this.typeOrmRepo = getRepository(UserToken);
  }

  public async find(token: UserToken): Promise<UserToken | undefined> {
    console.log(token);
    const userToken = await this.typeOrmRepo.findOne({
      where: { token },
    });

    console.log(userToken);
    return userToken;
  }

  public async generate(userId: string): Promise<UserToken> {
    const userToken = this.typeOrmRepo.create({
      user_id: userId,
    });

    await this.typeOrmRepo.save(userToken);

    return userToken;
  }
}
export default TokensRepository;
