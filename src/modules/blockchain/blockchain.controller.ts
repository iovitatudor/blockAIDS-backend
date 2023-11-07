import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SolanaService } from "./solana/solana.service";
import { TransferSolanaDto } from "./solana/dto/transfer-solana.dto";
import { TransferResource } from "./solana/resources/transfer.resource";

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
}