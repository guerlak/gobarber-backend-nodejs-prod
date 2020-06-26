export default interface IChacheProvider {
  save(key: string, value: any): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  invalidate(key: string): Promise<void>;
  invalidatePrefix(prefix: string): Promise<void>;
}
