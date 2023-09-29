import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import { AuthTypeEnum } from "../enums/auth-type.enum";

export class LoginAuthDto {
  @ApiProperty({ example: "johny@gmail.com" })
  @IsNotEmpty()
  @IsEmail({}, { message: "Please provide valid Email." })
  email: string;

  @ApiProperty({ example: "qwerQWER1234%$" })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: AuthTypeEnum.specialist })
  @IsString()
  @IsEnum([...Object.values(AuthTypeEnum)])
  type: string;
}
