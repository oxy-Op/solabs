import { topup } from "@/lib/top-up";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature")!;

  const buf = await req.arrayBuffer();
  const rawBody = Buffer.from(buf);
  console.log("Signature: ", sig);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    console.error(`Webhook error: ${err}`);
    return NextResponse.json(
      { message: `Webhook Error: ${err}` },
      { status: 400 }
    );
  }

  // Handle specific events from Stripe
  if (event.type === "checkout.session.completed") {
    // console.log("Checkout session completed:", event.data.object);

    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId; // Retrieve user ID from metadata
    const publicKey = session?.metadata?.publicKey;

    if (!userId || !publicKey) {
      return NextResponse.json(
        { message: "User ID not found." },
        { status: 400 }
      );
    }

    await topup(publicKey);

    console.log("User ID:", userId);
    console.log("Public Key:", publicKey);

    return NextResponse.json({ received: true });
  }

  return NextResponse.json({ message: "Event type not handled." });
}
