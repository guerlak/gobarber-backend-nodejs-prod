import IHashProvider from "../models/IHashProvider";
import { hash, compare } from "bcryptjs";

export default class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hashed = await hash(payload, 8);
    return hashed;
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const passwordMatch = await compare(payload, hashed);
    return passwordMatch;
  }
}
