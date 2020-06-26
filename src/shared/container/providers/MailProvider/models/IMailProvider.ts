import ISendEmailDTO from "../dtos/ISendMailDTO";

export default interface IMailProvider {
  sendEmail(data: ISendEmailDTO): void;
}
