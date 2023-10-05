import { IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrganizationDto {
  @ApiProperty({ example: "Healthy Life Clinic", required: false })
  @ValidateIf((o) => "name" in o)
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "USA" })
  @ValidateIf((o) => "country" in o)
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: "New-York" })
  @ValidateIf((o) => "city" in o)
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ example: "47 W 13th St" })
  @ValidateIf((o) => "address" in o)
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: "support@healthy.com" })
  @ValidateIf((o) => "email" in o)
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: "+010213245504" })
  @ValidateIf((o) => "phone" in o)
  @IsString()
  @IsNotEmpty()
  phone: string;
}