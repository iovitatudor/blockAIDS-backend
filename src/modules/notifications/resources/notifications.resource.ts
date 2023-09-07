import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationStatusEnum } from "../enums/notification-status.enum";

@Injectable()
export class NotificationsResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: NotificationStatusEnum.scheduled })
  public status: string;
  @ApiProperty({ example: "You've created a new task." })
  public userMessage: string;
  @ApiProperty({ example: "John Doe has created a new task." })
  public specialistMessage: string;

  public constructor(notification) {
    this.id = notification.id;
    this.status = notification.status;
    this.userMessage = notification.user_message;
    this.specialistMessage = notification.specialist_message;
  }

  public static collect(notifications): NotificationsResource[] {
    return notifications.map((notification) => {
      return new NotificationsResource(notification);
    });
  }
}
