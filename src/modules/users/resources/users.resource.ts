import { Injectable } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { UserGenderEnum } from "../enums/user-gender.enum";

@Injectable()
export class UsersResource {
  @ApiProperty({ example: 1 })
  public id: number;
  @ApiProperty({ example: "John Smith" })
  public name: string;
  @ApiProperty({ example: "johny@gmail.com" })
  public email: string;
  @ApiProperty({ example: "+3736091232" })
  public phone: string;
  @ApiProperty({ example: "2gCr6A9bk7rfXqwwBsW1PB63Yh19perTjH7y5yvKCYHN" })
  public public_key: string;
  @ApiProperty({ example: "johny-avatar.png" })
  public avatar: string;
  @ApiProperty({ example: UserGenderEnum.male })
  public gender: string;
  @ApiProperty({ example: "1990-07-10" })
  public birthdate: Date | null;

  public constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.public_key = user.public_key;
    this.avatar = user.avatar;
    this.gender = user.gender;
    this.birthdate = user.birthdate;
  }

  public static collect(users): UsersResource[] {
    return users.map((user) => {
      return new UsersResource(user);
    });
  }
}
