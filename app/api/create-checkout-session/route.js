import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const { bookingId, serviceName, amount, email } = body;

    // Robust origin detection for success/cancel URLs
    // Prefer input from origin header, fallback to host header (handling custom ports like 3001)
    let origin = request.headers.get("origin");
    if (!origin) {
      const host = request.headers.get("host"); // e.g., localhost:3001
      const protocol = request.headers.get("x-forwarded-proto") || "http";
      origin = `${protocol}://${host}`;
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "bdt", // Using BDT as per UI currency symbol
            product_data: {
              name: serviceName,
            },
            unit_amount: Math.round(amount * 100), // Amount in smallest currency unit
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Redirect to my-bookings with status params
      success_url: `${origin}/my-bookings?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/my-bookings?canceled=true`,
      customer_email: email,
      metadata: {
        bookingId: bookingId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return NextResponse.json(
      { error: "Error creating checkout session: " + error.message },
      { status: 500 }
    );
  }
}
