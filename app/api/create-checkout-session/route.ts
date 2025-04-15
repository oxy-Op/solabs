import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { amount } = await req.json();
  const userSession = await auth();
  console.log(userSession);

  if (
    !userSession ||
    !userSession.user ||
    !userSession.user.id ||
    !userSession.user.publicKey
  ) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  console.log(userSession.user.id);

  const solToUsdRate = 20;
  const totalAmount = Math.round(amount * solToUsdRate * 100);

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: `${amount} SOL`,
          },
          unit_amount: totalAmount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: userSession.user.id,
      publicKey: userSession.user.publicKey,
    },
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/dashboard?error=true`,
  });

  return NextResponse.json({ id: session.id });
}
