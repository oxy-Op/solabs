import { Connection } from "@solana/web3.js";

const globalForSolanaConnection = globalThis as unknown as {
  solanaConnection: Connection;
};

export const solanaConnection =
  globalForSolanaConnection.solanaConnection ||
  new Connection(process.env.RPC_URL!);

if (process.env.NODE_ENV !== "production") {
  globalForSolanaConnection.solanaConnection = solanaConnection;
}
