import Stripe from "stripe";
import { create } from "zustand";

export type ModalType = "topup" | "success" | "error";

type ModalData = {
  sessionId?: string;
  paymentStatus?: {
    status: Stripe.Checkout.Session.PaymentStatus;
    amount_total: number | null;
    currency: string | undefined;
  } | null;
};

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false, data: {} }),
}));
