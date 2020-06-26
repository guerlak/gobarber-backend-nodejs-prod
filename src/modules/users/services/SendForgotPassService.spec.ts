import FakeUserRepo from "@modules/users/repositories/fakes/FakeUserRepository";
import FakeMailProvider from "@shared/container/providers/MailProvider/fakes/FakeMailProvider";
//must place after to avoid import metadata
import SendForgotPassService from "./SendForgotPassService";
import FakeUsersTokenRepo from "../repositories/fakes/FakeTokensRepository";

let userRepo: FakeUserRepo;
let fakeMail: FakeMailProvider;
let tokensRepo: FakeUsersTokenRepo;
let sendForgotPassService: SendForgotPassService;

describe("Forgot Password Email Sender", () => {
  beforeEach(() => {
    userRepo = new FakeUserRepo();
    fakeMail = new FakeMailProvider();
    tokensRepo = new FakeUsersTokenRepo();
    sendForgotPassService = new SendForgotPassService(
      userRepo,
      fakeMail,
      tokensRepo
    );
  });

  it("should be able to send email with recovery password instructions", async () => {
    const sendMail = jest.spyOn(fakeMail, "sendEmail");

    const user = await userRepo.createUser({
      name: "Martina",
      email: "martina@gmail.com",
      password: "aloha",
    });

    await sendForgotPassService.execute({ email: user.email });
    expect(sendMail).toHaveBeenCalled();
  });

  it("should be able to recover pass to a non exist user", async () => {
    await expect(
      sendForgotPassService.execute({ email: "guer@gmail.com" })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should generate forgot password token ", async () => {
    const generateToken = jest.spyOn(tokensRepo, "generate");

    const user = await userRepo.createUser({
      name: "Martina",
      email: "martina@gmail.com",
      password: "aloha",
    });

    await sendForgotPassService.execute({ email: "martina@gmail.com" });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
