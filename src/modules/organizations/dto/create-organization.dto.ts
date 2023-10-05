import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrganizationDto {
  @ApiProperty({ example: "Healthy Life Clinic" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "USA" })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: "New-York" })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: "47 W 13th St" })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: "support@healthy.com" })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "+010213245504" })
  @IsString()
  @IsNotEmpty()
  phone: string;
}