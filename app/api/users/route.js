// API route for user operations
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/mongodb/connection";
import User from "@/lib/mongodb/models/User";

// POST - Create new user
export async function POST(request) {
  try {
    console.log("API /api/users hit");
    await connectDB();
    console.log("DB connected");

    const body = await request.json();
    console.log("Request body parsed", body);
    const { nid, name, email, contact, password } = body;
    const normalizedEmail = email.toLowerCase();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password if provided (not provided for OAuth users)
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create new user
    const user = await User.create({
      nid,
      name,
      email: normalizedEmail,
      contact,
      password: hashedPassword,
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
