import { Module } from "@nestjs/common";
import { BlockchainController } from "./blockchain.controller";
import { SolanaService } from "./solana/solana.service";

@Module({
  controllers: [BlockchainController],
  providers: [SolanaService],
})
export class BlockchainModule {
}
