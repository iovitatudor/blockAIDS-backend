import { IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateTaskTypeDto } from "./create-task-type.dto";

export class UpdateTaskTypeDto extends PartialType(CreateTaskTypeDto) {
  @ApiProperty({ example: "Take semi-annual test", required: false })
  @ValidateIf((o) => "name" in o)
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Take semi-annual test...", required: false })
  @ValidateIf((o) => "description" in o)
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: "1", required: false })
  @ValidateIf((o) => "reward" in o)
  @IsString()
  @IsNotEmpty()
  reward: string;
}
