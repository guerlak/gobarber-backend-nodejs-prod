import INotificationsRepository from "../INotificationsRepository";
import Notification from "../../infra/typeorm/schemas/Notification";
import ICreateNotificationDTO from "../../dtos/ICreateNotificationDTO";
import { getYear } from "date-fns";
import { ObjectID } from "mongodb";

class FakeNotificationRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    user_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, user_id });

    this.notifications.push(notification);
    return notification;
  }

  public async listAll(): Promise<Notification[] | undefined> {
    return this.notifications;
  }
}

export default FakeNotificationRepository;
