import IHashProvider from "../models/IHashProvider";

export default class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const hashed = `hashed-${payload}`;
    return hashed;
  }
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return `hashed-${payload}` === hashed;
  }
}
