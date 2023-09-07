import { Module } from "@nestjs/common";
import { CrudNotificationsService } from "./services/crud-notifications.service";
import { NotificationsController } from "./notifications.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Notification } from "./entities/notification.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  controllers: [NotificationsController],
  providers: [CrudNotificationsService],
})
export class NotificationsModule {
}
