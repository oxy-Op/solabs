"use client";

import PaymentStatusModal from "@/app/(payment)/components/payment-status";
import CheckoutTopUpModal from "@/modals/top-up";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CheckoutTopUpModal />
      <PaymentStatusModal />
    </>
  );
};
