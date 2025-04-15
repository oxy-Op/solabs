"use client";

import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutTopUp: React.FC = () => {
  const [amount, setAmount] = useState<number | string>("");

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;

      // Call the backend API to create a checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const session = await response.json();

      // Redirect to the Stripe Checkout
      const result = await stripe?.redirectToCheckout({
        sessionId: session.id,
      });

      if (result?.error) {
        alert(result.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Input field */}
      <Input
        type="number"
        placeholder="Enter SOL amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-4 w-full max-w-xs text-center  text-white border  focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Checkout button */}
      <Button
        onClick={handleCheckout}
        className="w-full max-w-xs bg-blue-600 hover:bg-blue-500 text-white font-semibold mt-4"
      >
        Proceed to Checkout
      </Button>
    </div>
  );
};

export default CheckoutTopUp;
