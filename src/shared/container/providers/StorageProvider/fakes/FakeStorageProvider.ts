import IStorageProvider from "../models/IStorageProvider";

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex((f) => f === file);
    delete this.storage[findIndex];
  }
}
export default FakeStorageProvider;
