import { inject, injectable } from "tsyringe";
import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";
import nodemailer, { Transporter } from "nodemailer";
import IMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private clientTransporter: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private templateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.clientTransporter = transporter;
    });
  }

  public async sendEmail({
    to,
    from,
    subject,
    template,
  }: ISendMailDTO): Promise<void> {
    const message = {
      from: {
        name: from?.name || "GoBarber Crew <gobarber@gobarber.com>",
        address: from?.email || "crew@gobarber.com.br",
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.templateProvider.parse(template),
    };
    const send = await this.clientTransporter.sendMail(message);
    console.log(send.messageId);
    console.log(
      `LINK TO SEE THE EMAIL -> ${nodemailer.getTestMessageUrl(send)}`
    );
  }
}

export default EtherealMailProvider;
