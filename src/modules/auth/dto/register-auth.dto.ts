import {
  IsEmail,
  IsEnum,
  IsNotEmpty, IsNumber,
  IsString,
  Matches,
  MinLength, ValidateIf,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { AuthTypeEnum } from "../enums/auth-type.enum";

const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export class RegisterAuthDto {
  @ApiProperty({ example: "John Smith" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "johny@gmail.com" })
  @IsNotEmpty()
  @IsEmail({}, { message: "Please provide valid Email." })
  email: string;

  @ApiProperty({ example: "qwerQWER1234%$" })
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain minimum 8 and maximum 20 characters, 
    at least one uppercase letter, 
    one lowercase letter, 
    one number and 
    one special character`,
  })
  password: string;

  @ApiProperty({ example: AuthTypeEnum.specialist })
  @IsString()
  @IsEnum([...Object.values(AuthTypeEnum)])
  type: string;

  @ApiProperty({ example: 1 })
  @IsString()
  @ValidateIf((o) => "organizationId" in o)
  organizationId: string;
}