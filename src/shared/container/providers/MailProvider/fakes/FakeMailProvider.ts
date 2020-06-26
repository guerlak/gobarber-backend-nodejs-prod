import IMailProvider from "../models/IMailProvider";
import IsendEmailDTO from "../dtos/ISendMailDTO";
import ISendMailDTO from "../dtos/ISendMailDTO";

export default class FakeMailProvider implements IMailProvider {
  private messages: IsendEmailDTO[] = [];

  public async sendEmail(msg: ISendMailDTO): Promise<void> {
    this.messages.push(msg);
  }
}
