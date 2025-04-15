"use server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// Fetch payment status by session ID
export async function getPaymentStatus(sessionId: string | null | undefined) {
  if (!sessionId) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return {
      status: session.payment_status,
      amount_total: session.amount_total,
      currency: session?.currency?.toUpperCase(),
    };
  } catch (error) {
    console.error("Error retrieving session:", error);
    return null;
  }
}
