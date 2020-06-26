import Token from "../infra/typeorm/entities/UserToken";

export default interface IUserRepository {
  generate(userId: string): Promise<Token>;
  find(token: Token): Promise<Token | undefined>;
}
