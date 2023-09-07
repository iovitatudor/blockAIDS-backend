import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateSpecialistDto } from "./create-specialist.dto";


const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export class UpdateSpecialistDto extends PartialType(CreateSpecialistDto) {
  @ApiProperty({ example: 1 })
  @ValidateIf((o) => "organizationId" in o)
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty({ example: "John Doe", required: false })
  @ValidateIf((o) => "name" in o)
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "johny@gmail.com", required: false })
  @ValidateIf((o) => "email" in o)
  @IsNotEmpty()
  @IsEmail({}, { message: "Please provide valid Email." })
  email: string;

  @ApiProperty({ example: "Neurologist", required: false })
  @ValidateIf((o) => "phone" in o)
  @IsString()
  @IsNotEmpty()
  job_position: string;

  @ApiProperty({ format: "binary", required: false })
  @ValidateIf((o) => "avatar" in o)
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty({ example: "qwerQWER1234%$", required: false })
  @ValidateIf((o) => "password" in o)
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;
}
