import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskTypeDto {
  @ApiProperty({ example: "Take semi-annual test" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "Take semi-annual test..." })
  description: string;

  @ApiProperty({ example: "1" })
  @IsString()
  @IsNotEmpty()
  reward: string;
}