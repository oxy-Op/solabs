import {
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import "server-only";
import { solanaConnection } from "./rpc-connection";
import bs58 from "bs58";

export async function topup(address: string) {
  try {
    const signer = Keypair.fromSecretKey(bs58.decode(process.env.PRIVATE_KEY!));
    const airdrop = await solanaConnection.requestAirdrop(
      new PublicKey(address),
      5_000_000_00
    );

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(signer.publicKey),
        toPubkey: new PublicKey(address),
        lamports: 5_000_000_00,
      })
    );

    const signature = await solanaConnection.sendTransaction(transaction, [
      signer,
    ]);
    console.log("Topup signature:", signature);
  } catch (error) {
    console.error("Topup error:", error);
  }
}
