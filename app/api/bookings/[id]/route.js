// API route for individual booking operations
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb/connection";
import Booking from "@/lib/mongodb/models/Booking";

// PATCH - Update booking (cancel, update status)
export async function PATCH(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    const booking = await Booking.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE - Delete booking
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}

// GET - Get single booking
export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}
