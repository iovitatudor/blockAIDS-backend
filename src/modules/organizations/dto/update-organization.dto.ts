import { IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrganizationDto {
  @ApiProperty({ example: "Healthy Life Clinic", required: false })
  @ValidateIf((o) => "name" in o)
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;
}