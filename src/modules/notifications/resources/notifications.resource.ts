import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationStatusEnum } from "../enums/notification-status.enum";
import { UsersResource } from "../../users/resources/users.resource";
import { SpecialistsResource } from "../../specialists/resources/specialists.resource";
import { TasksResource } from "../../tasks/resources/tasks.resource";

@Injectable()
export class NotificationsResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: NotificationStatusEnum.scheduled })
  public userStatus: string;
  @ApiProperty({ example: NotificationStatusEnum.scheduled })
  public specialistStatus: string;
  @ApiProperty({ example: "You've created a new task." })
  public userMessage: string;
  @ApiProperty({ example: "John Doe has created a new task." })
  public specialistMessage: string;
  @ApiProperty({ example: TasksResource })
  public task: TasksResource;
  @ApiProperty({ example: UsersResource })
  public user: UsersResource;
  @ApiProperty({ example: SpecialistsResource })
  public specialist: SpecialistsResource;
  public created: string;

  public constructor(notification) {
    this.id = notification.id;
    this.userStatus = notification.user_status;
    this.specialistStatus = notification.specialist_status;
    this.userMessage = notification.user_message;
    this.specialistMessage = notification.specialist_message;
    this.task = notification.task
      ? new TasksResource(notification.task)
      : null;
    this.user = notification.user
      ? new UsersResource(notification.user)
      : null;
    this.specialist = notification.specialist
      ? new SpecialistsResource(notification.specialist)
      : null;
    this.created = notification.created_at;
  }

  public static collect(notifications): NotificationsResource[] {
    return notifications.map((notification) => {
      return new NotificationsResource(notification);
    });
  }
}
