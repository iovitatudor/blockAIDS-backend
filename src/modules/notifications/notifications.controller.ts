import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from "@nestjs/common";
import {
  ApiNoContentResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CrudNotificationsService } from "./services/crud-notifications.service";
import { CreateNotificationDto } from "./dto/create-Notification.dto";
import { UpdateNotificationDto } from "./dto/update-Notification.dto";
import { NotificationsResource } from "./resources/Notifications.resource";

@ApiTags("Notifications")
@Controller("notifications")
export class NotificationsController {
  constructor(
    private readonly crudNotificationsService: CrudNotificationsService,
  ) {
  }

  @ApiResponse({ status: 200, type: [NotificationsResource] })
  @ApiOperation({ summary: "Get all notifications" })
  @Get()
  async findAll() {
    const Notifications = await this.crudNotificationsService.findAll();
    return NotificationsResource.collect(Notifications);
  }

  @ApiResponse({ status: 200, type: NotificationsResource })
  @ApiOperation({ summary: "Get notification by id" })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    const user = await this.crudNotificationsService.findOne(+id);
    return new NotificationsResource(user);
  }

  @ApiResponse({ status: 200, type: NotificationsResource })
  @ApiOperation({ summary: "Create Notification" })
  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    const createdNotification = await this.crudNotificationsService.create(
      createNotificationDto,
    );
    const notification = await this.crudNotificationsService.findOne(
      createdNotification.id,
    );
    return new NotificationsResource(notification);
  }

  @ApiResponse({ status: 200, type: NotificationsResource })
  @ApiOperation({ summary: "Update Notification" })
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto,
  ) {
    await this.crudNotificationsService.update(+id, updateNotificationDto);
    const Notification = await this.crudNotificationsService.findOne(+id);
    return new NotificationsResource(Notification);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: "Item for the given id have been deleted",
  })
  @ApiOperation({ summary: "Delete Notification" })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    const Notification = await this.crudNotificationsService.remove(+id);
    return new NotificationsResource(Notification);
  }
}