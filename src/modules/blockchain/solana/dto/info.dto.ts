import { ApiProperty } from "@nestjs/swagger";

export class InfoDto {
  @ApiProperty({ example: "TG" })
  TG: string;

  @ApiProperty({ example: "marketing channel" })
  marketingChannel: string;

  @ApiProperty({ example: "main channel" })
  mainChannel: string;

  @ApiProperty({ example: " region" })
  region: string;

  @ApiProperty({ example: "address" })
  address: string;
}