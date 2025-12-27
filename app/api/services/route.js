// API route for services
import { NextResponse } from "next/server";
import { servicesData } from "@/lib/data/sampleData";

// GET - Get all services (for now using sample data)
// In production, this would fetch from MongoDB
export async function GET() {
  try {
    return NextResponse.json(servicesData, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
