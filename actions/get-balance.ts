"use server";

import { auth } from "@/auth";
import { solanaConnection } from "@/lib/rpc-connection";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function getBalance() {
  const session = await auth();

  if (!session || !session.user || !session.user.publicKey) {
    return 0;
  }

  const balance = await solanaConnection.getBalance(
    new PublicKey(session.user.publicKey)
  );

  return balance / LAMPORTS_PER_SOL;
}
