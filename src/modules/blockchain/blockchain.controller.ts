import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SolanaService } from "./solana/solana.service";
import { TransferSolanaDto } from "./solana/dto/transfer-solana.dto";
import { TransferResource } from "./solana/resources/transfer.resource";
import { InfoDto } from "./solana/dto/info.dto";
import * as fs from "fs";
import * as path from "path";

@ApiTags("Blockchain")
@Controller("api/blockchain")
export class BlockchainController {
  constructor(
    private readonly solanaService: SolanaService,
  ) {
  }

  @ApiResponse({ status: 200, type: TransferResource })
  @ApiOperation({ summary: "Transfer Tokens" })
  @Post("/transfer")
  async transfer(@Body() transferData: TransferSolanaDto) {
    const transferResponse =
      await this.solanaService.transferCustomToken(transferData);
    return new TransferResource(transferResponse);
  }

  @ApiResponse({ status: 200, type: TransferResource })
  @ApiOperation({ summary: "Transfer Tokens" })
  @Post("/info")
  async saveInfo(@Body() infoDto: any) {
    const filePath = path.resolve(__dirname, "../../..", "info");

    const data: any = fs.readFileSync(path.join(filePath, "info.json"), "utf8");
    const dataToSave: Array<any> = JSON.parse(data).concat(infoDto);
    console.log(dataToSave);
    fs.writeFileSync(path.join(filePath, "info.json"), JSON.stringify(dataToSave));
  }
}