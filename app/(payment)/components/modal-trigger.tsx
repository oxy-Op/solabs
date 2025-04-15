"use client";

import React, { useEffect } from "react";
import { useModal } from "@/hooks/use-modal";
import Stripe from "stripe";

type ModalTriggerClientProps = {
  success?: string;
  error?: string;
  paymentStatus?: {
    status: Stripe.Checkout.Session.PaymentStatus;
    amount_total: number | null;
    currency: string | undefined;
  } | null;
};

const ModalTriggerClient: React.FC<ModalTriggerClientProps> = ({
  success,
  error,
  paymentStatus,
}) => {
  const { onOpen } = useModal();

  useEffect(() => {
    if (success) {
      onOpen("success", { paymentStatus });
    } else if (error) {
      onOpen("error");
    }
  }, [success, error, paymentStatus, onOpen]);

  return null; // We don't need to render anything from this component, just handle modal state
};

export default ModalTriggerClient;
