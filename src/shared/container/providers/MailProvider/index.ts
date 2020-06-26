import { container } from "tsyringe";
import EtherealMailProvider from "./implementation/EtherealMailProvider";
import SESMailProvider from "./implementation/SESMailProvider";
import IMailProvider from "../MailProvider/models/IMailProvider";
import mailConfig from "@config/mail";

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  providers[mailConfig.driver]
);
