import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/providers/modal-provider";

export const metadata: Metadata = {
  title: "Solabs",
  description: "Generated by create next app",
};

const font = Raleway({ weight: "600", subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(`font-semibold antialiased uppercase `, font.className)}
      >
        {children}
        <ModalProvider />
      </body>
    </html>
  );
}
