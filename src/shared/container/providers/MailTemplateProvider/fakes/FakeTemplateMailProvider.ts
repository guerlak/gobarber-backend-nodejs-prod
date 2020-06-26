import IMailTemplateProvider from "../models/IMailTemplateProvider";
import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import { de } from "date-fns/locale";

class FakeEmailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const emailstr = file;

    return emailstr;
  }
}

export default FakeEmailTemplateProvider;
