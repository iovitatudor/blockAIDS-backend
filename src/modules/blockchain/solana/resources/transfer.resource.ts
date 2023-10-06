import { ApiProperty } from "@nestjs/swagger";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TransferResource {
  @ApiProperty({ example: "success" })
  public status: string;
  @ApiProperty({ example: 10 })
  public amount: number;
  @ApiProperty({ example: "2gCr6A9bk7rfXqwwBsW1PB63Yh19perTjH7y5yvKCYHN" })
  public recipientPublicKey: string;
  @ApiProperty({ example: "3yD6c4N1P8QrYBiQFQW882hmvXGNhrxHUs3ni7FeEeqS9cEWrKckff2ZC33fcy9YkGNgBHcnxwfA7x9iShhSBsnk" })
  public signature: string;

  public constructor(transfer) {
    this.status = transfer.status;
    this.amount = transfer.amount;
    this.recipientPublicKey = transfer.recipientPublicKey;
    this.signature = transfer.signature;
  }

  public static collect(transfers): TransferResource[] {
    return transfers.map((transfer) => {
      return new TransferResource(transfer);
    });
  }
}