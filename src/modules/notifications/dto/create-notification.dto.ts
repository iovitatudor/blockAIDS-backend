import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationStatusEnum } from "../enums/notification-status.enum";

export class CreateNotificationDto {
  @ApiProperty({ example: NotificationStatusEnum.scheduled })
  @IsEnum(NotificationStatusEnum)
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: "You've created a new task." })
  @IsNotEmpty()
  @IsString()
  user_message: string;

  @ApiProperty({ example: "John Doe has created a new task." })
  @IsNotEmpty()
  @IsString()
  specialist_message: string;
}