interface IMailConfig {
  driver: "ethereal" | "ses";
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || "ethereal",
  defaults: {
    from: {
      email: "rafael@guerlak.com",
      name: "Rafael Guerlak",
    },
  },
} as IMailConfig;
