import ITokenRepository from "../ITokenRepository";
import UserToken from "../../infra/typeorm/entities/UserToken";
import Token from "../../infra/typeorm/entities/UserToken";
import { uuid } from "uuidv4";

class FakeTokensRepository implements ITokenRepository {
  private tokens: UserToken[] = [];

  public async generate(userId: string): Promise<UserToken> {
    const token = new UserToken();
    Object.assign(token, {
      id: uuid(),
      token: uuid(),
      user_id: userId,
      created_at: new Date(),
      updated_at: new Date(),
    });
    this.tokens.push(token);
    return token;
  }

  public async find(token: Token): Promise<UserToken | undefined> {
    const foundToken = this.tokens.find((t) => t.token === token.token);

    return foundToken;
  }
}
export default FakeTokensRepository;
