import { container } from "tsyringe";
import "@modules/users/providers";
import "./providers";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentRepository";
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentsRepository";
import IUsersRepository from "@modules/users/repositories/IUserRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import ITokensRepository from "@modules/users/repositories/ITokenRepository";
import TokensRepository from "@modules/users/infra/typeorm/repositories/TokenRepositoy";
import INotificationRepository from "@modules/notifications/repositories/INotificationsRepository";
import NotificationsRepository from "@modules/notifications/infra/typeorm/repositories/NotificationRepository";

container.registerSingleton<IAppointmentsRepository>(
  "AppointmentsRepository",
  AppointmentsRepository
);
container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
container.registerSingleton<ITokensRepository>(
  "TokensRepository",
  TokensRepository
);
container.registerSingleton<INotificationRepository>(
  "NotificationsRepository",
  NotificationsRepository
);
