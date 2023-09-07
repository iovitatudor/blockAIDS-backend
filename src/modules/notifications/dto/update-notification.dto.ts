import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { CreateNotificationDto } from "./create-notification.dto";
import { NotificationStatusEnum } from "../enums/notification-status.enum";

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @ApiProperty({ example: NotificationStatusEnum.scheduled, required: false })
  @ValidateIf((o) => "status" in o)
  @IsEnum(NotificationStatusEnum)
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: "You've created a new task.", required: false })
  @ValidateIf((o) => "status" in o)
  @IsNotEmpty()
  @IsString()
  user_message: string;

  @ApiProperty({ example: "John Doe has created a new task.", required: false })
  @ValidateIf((o) => "status" in o)
  @IsNotEmpty()
  @IsString()
  specialist_message: string;
}
