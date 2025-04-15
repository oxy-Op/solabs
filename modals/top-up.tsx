"use client";

import { useModal } from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import CheckoutTopUp from "@/app/(payment)/components/checkout";
import { DialogTitle } from "@radix-ui/react-dialog";

export default function CheckoutTopUpModal() {
  const { type, onClose, isOpen } = useModal();
  console.log(type);

  const isModalOpen = isOpen && type === "topup";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black text-white p-6 mx-auto rounded-md">
        <DialogTitle className="text-2xl font-bold text-center mb-2">
          TOP UP YOUR SOLANA
        </DialogTitle>
        <DialogDescription className="text-center mb-4">
          Enter the amount of SOL you want to top up below:
        </DialogDescription>
        <DialogDescription className="text-center text-sm w-full mx-auto">
          Use card: 4000 0035 6000 0008
        </DialogDescription>
        <CheckoutTopUp />
      </DialogContent>
    </Dialog>
  );
}
