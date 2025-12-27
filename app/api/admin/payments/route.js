import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb/connection";
import Booking from "@/lib/mongodb/models/Booking";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    await connectDB();

    // Fetch all bookings sorted by newest first
    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    return NextResponse.json(bookings, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
