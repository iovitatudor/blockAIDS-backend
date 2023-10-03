import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  ValidateIf,
} from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTaskDto } from "./create-task.dto";
import { TaskStatusEnum } from "../enums/task-status.enum";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ example: '1' })
  @ValidateIf((o) => "userId" in o)
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ValidateIf((o) => "specialistId" in o)
  @ApiProperty({ example: '1' })
  @IsString()
  @IsNotEmpty()
  specialistId: string;

  @ApiProperty({ example: '1' })
  @ValidateIf((o) => "taskTypeId" in o)
  @IsString()
  @IsNotEmpty()
  taskTypeId: string;

  @ApiProperty({ example: '1' })
  @ValidateIf((o) => "organizationId" in o)
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({ example: "My first task" })
  @ValidateIf((o) => "name" in o)
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "1990-07-10", required: false })
  @ValidateIf((o) => "dateDue" in o)
  @IsDateString()
  due_date: Date | null;

  @ApiProperty({ example: TaskStatusEnum.InProgress, required: false })
  @ValidateIf((o) => "status" in o)
  @IsString()
  @IsEnum([...Object.values(TaskStatusEnum)])
  status: TaskStatusEnum;

  @ApiProperty({ example: 300 })
  @ValidateIf((o) => "points" in o)
  @IsNumber()
  @IsNotEmpty()
  points: number;

  @ApiProperty({ example: "Task description...." })
  @ValidateIf((o) => "description" in o)
  @IsString()
  @MinLength(2, { message: "Description must have at least 2 characters." })
  @IsNotEmpty()
  description: string;
}
