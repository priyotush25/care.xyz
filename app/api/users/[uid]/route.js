// API route to get user by email
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb/connection";
import User from "@/lib/mongodb/models/User";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { email } = await params;
    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
