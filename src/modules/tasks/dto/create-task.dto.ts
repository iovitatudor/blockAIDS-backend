import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  ValidateIf,
} from "class-validator";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  specialistId: number;

  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  taskTypeId: number;

  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  organizationId: number;

  @ApiProperty({ example: 1 })
  @IsString()
  @IsNotEmpty()
  notificationId: number;

  @ApiProperty({ example: "My first task" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "1990-07-10", required: false })
  @IsDateString()
  dateDue: Date | null;

  @ApiProperty({ example: TaskStatusEnum.InProgress, required: false })
  @IsString()
  @IsEnum([...Object.values(TaskStatusEnum)])
  status: TaskStatusEnum;

  @ApiProperty({ example: 300 })
  @IsNumber()
  @IsNotEmpty()
  points: number;

  @ApiProperty({ example: "Task description...." })
  @IsString()
  @ValidateIf((o) => "description" in o)
  @MinLength(2, { message: "Description must have at least 2 characters." })
  @IsNotEmpty()
  description: string;
}