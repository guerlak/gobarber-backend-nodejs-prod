import { MongoRepository, getMongoRepository } from "typeorm";

import ICreateNotificationDTO from "../../../dtos/ICreateNotificationDTO";
import INotificationsRepository from "../../../repositories/INotificationsRepository";
import Notification from "../schemas/Notification";

export default class NotificationRepository
  implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;
  constructor() {
    this.ormRepository = getMongoRepository(Notification, "mongo");
  }

  public async create({
    content,
    user_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ content, user_id });
    await this.ormRepository.save(notification);
    return notification;
  }
}
