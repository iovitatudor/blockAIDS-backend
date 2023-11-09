import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from "class-validator";

import { UserGenderEnum } from "../enums/user-gender.enum";
import { ApiProperty } from "@nestjs/swagger";

const passwordRegEx =
  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d][A-Za-z\d@$!%*#?&_]{8,}$/;

export class CreateUserDto {
  @ApiProperty({ example: "John Smith" })
  @IsString()
  @MinLength(2, { message: "Name must have at least 2 characters." })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "johny@gmail.com" })
  @IsNotEmpty()
  @IsEmail({}, { message: "Please provide valid Email." })
  email: string;

  @ApiProperty({ example: "+3736091232", required: false })
  @ValidateIf((o) => "phone" in o)
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: "2gCr6A9bk7rfXqwwBsW1PB63Yh19perTjH7y5yvKCYHN",
    required: false,
  })
  @ValidateIf((o) => "public_key" in o)
  @IsString()
  @IsNotEmpty()
  public_key: string;

  @ApiProperty({ example: "1990-07-10", required: false })
  @ValidateIf((o) => "birthdate" in o)
  @IsOptional()
  @IsDateString()
  birthdate: Date | null;

  @ApiProperty({ example: UserGenderEnum.male, required: false })
  @ValidateIf((o) => "gender" in o)
  @IsString()
  @IsEnum([...Object.values(UserGenderEnum)])
  gender: string;

  @ApiProperty({
    format: "binary",
    required: false,
  })
  @ValidateIf((o) => "avatar" in o)
  @IsOptional()
  avatar: string;

  @ApiProperty({
    example: "https://avatars.githubusercontent.com/u/36919907",
    required: false,
  })
  @ValidateIf((o) => "avatar_link" in o)
  @IsString()
  @IsOptional()
  avatar_link: string;

  @ApiProperty({ example: "qwerQWER1234%$" })
  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters,
    at least one uppercase letter,
    one lowercase letter,
    one number`,
  })
  password: string;
}