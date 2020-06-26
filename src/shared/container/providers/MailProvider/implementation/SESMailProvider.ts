import { inject, injectable } from "tsyringe";
import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from "../dtos/ISendMailDTO";
import nodemailer, { Transporter } from "nodemailer";
import IMailTemplateProvider from "@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider";
import aws from "aws-sdk";
import mailConfig from "@config/mail";

@injectable()
class SESMailProvider implements IMailProvider {
  private clientTransporter: Transporter;

  constructor(
    @inject("MailTemplateProvider")
    private templateProvider: IMailTemplateProvider
  ) {
    // create Nodemailer SES transporter
    this.clientTransporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: "2010-12-01",
        region: "sa-east-1",
      }),
    });
  }
  public async sendEmail({
    to,
    from,
    subject,
    template,
  }: ISendMailDTO): Promise<void> {
    console.log("Its working...");

    const message = {
      from: {
        name: mailConfig.defaults.from.name,
        address: mailConfig.defaults.from.email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.templateProvider.parse(template),
    };
    await this.clientTransporter.sendMail(message);
  }
}

export default SESMailProvider;
