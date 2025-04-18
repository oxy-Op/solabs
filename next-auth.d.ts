import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  publicKey: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
