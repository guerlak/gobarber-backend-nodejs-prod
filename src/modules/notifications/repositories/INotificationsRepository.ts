import Notification from "../infra/typeorm/schemas/Notification";
import ICreateNotification from "../dtos/ICreateNotificationDTO";

export default interface INotificationsRepository {
  create(data: ICreateNotification): Promise<Notification>;
}
