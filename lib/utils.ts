import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to convert token amount from decimals
export function convertTokenAmount(amount: string, decimals: number): string {
  const base = 10 ** decimals;
  return (parseFloat(amount) / base).toFixed(decimals);
}
