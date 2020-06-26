import { container } from "tsyringe";
import IMailTemplateProvider from "./models/IMailTemplateProvider";
import HandlebarsMailTemplate from "./implementations/HandlebarsTemplateMailProvider";

const providers = {
  handleBars: HandlebarsMailTemplate,
};

container.registerSingleton<IMailTemplateProvider>(
  "MailTemplateProvider",
  providers.handleBars
);
