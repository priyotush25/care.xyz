// API route for booking operations
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb/connection";
import Booking from "@/lib/mongodb/models/Booking";

// POST - Create new booking
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const {
      userId,
      userEmail,
      userName,
      serviceId,
      serviceName,
      duration,
      location,
      totalCost,
    } = body;

    const booking = await Booking.create({
      userId,
      userEmail,
      userName,
      serviceId,
      serviceName,
      duration,
      location,
      totalCost,
      status: "Pending",
    });

    // Send invoice email asynchronously
    try {
      const { sendInvoiceEmail } = await import("@/lib/email/sendInvoice");
      await sendInvoiceEmail(booking);
    } catch (emailError) {
      console.error("Error sending invoice email:", emailError);
      // Continue execution even if email fails
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking", details: error.message },
      { status: 500 }
    );
  }
}

// GET - Get bookings for a user
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
