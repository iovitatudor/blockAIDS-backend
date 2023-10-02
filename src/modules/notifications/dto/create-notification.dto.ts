import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { NotificationStatusEnum } from "../enums/notification-status.enum";

export class CreateNotificationDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  taskId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  specialistId: string;

  @ApiProperty({ example: NotificationStatusEnum.scheduled })
  @IsEnum(NotificationStatusEnum)
  @IsString()
  @IsNotEmpty()
  user_status: string;

  @ApiProperty({ example: NotificationStatusEnum.scheduled })
  @IsEnum(NotificationStatusEnum)
  @IsString()
  @IsNotEmpty()
  specialist_status: string;

  @ApiProperty({ example: "You've created a new task." })
  @IsNotEmpty()
  @IsString()
  user_message: string;

  @ApiProperty({ example: "John Doe has created a new task." })
  @IsNotEmpty()
  @IsString()
  specialist_message: string;
}