import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class TransferSolanaDto {
  @ApiProperty({ example: "AIDS" })
  @IsString()
  @IsNotEmpty()
  token: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: "2gCr6A9bk7rfXqwwBsW1PB63Yh19perTjH7y5yvKCYHN" })
  @IsString()
  @IsNotEmpty()
  recipientPublicKey: string;
}