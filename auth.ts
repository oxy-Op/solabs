import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { Keypair } from "@solana/web3.js";
import { encryptSecretKey } from "./lib/server-utils";

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: PrismaAdapter(prisma),

  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Check if the user already has a publicKey and secretKey
        const existingUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (!existingUser?.publicKey || !existingUser?.secretKey) {
          const keypair = Keypair.generate();
          const publicKey = keypair.publicKey.toString();
          const secretKey = keypair.secretKey.toString();

          const encryptedSecretKey = encryptSecretKey(secretKey);
          await prisma.user.update({
            where: { id: user.id },
            data: {
              publicKey: publicKey,
              secretKey: encryptedSecretKey,
            },
          });

          token.publicKey = publicKey;
        } else {
          token.publicKey = existingUser.publicKey;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // Attach the publicKey to the session so it's accessible on the frontend
      session.user.publicKey = token.publicKey as string;
      session.user.id = token.id as string;
      return session;
    },
  },
  ...authConfig,
});
