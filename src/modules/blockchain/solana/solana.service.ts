import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { TransferSolanaDto } from "./dto/transfer-solana.dto";

const bs58 = require("bs58");

const tokenToDecimal = {
  USDT: 6,
  ETH: 18,
  AIDS: 9,
};

@Injectable()
export class SolanaService {
  async transferCustomToken(transferData: TransferSolanaDto) {
    try {
      const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
      const senderPrivateKeyString = process.env.WALLET_SECRET_KEY;
      const senderPrivateKey = bs58.decode(senderPrivateKeyString);
      const fromWallet = Keypair.fromSecretKey(senderPrivateKey);
      const toWallet = new PublicKey(transferData.recipientPublicKey);
      const mint = new PublicKey(process.env.PUBLIC_KEY);
      const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        fromWallet.publicKey,
      );
      const toTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        fromWallet,
        mint,
        toWallet,
      );
      const amountToTransfer =
        transferData.amount * Math.pow(10, tokenToDecimal[transferData.token]);
      const signature = await transfer(
        connection,
        fromWallet,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromWallet.publicKey,
        amountToTransfer,
      );
      return {
        status: "success",
        signature,
        amount: amountToTransfer,
        recipientPublicKey: transferData.recipientPublicKey,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }
}