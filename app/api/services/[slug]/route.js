// API route to get service by slug or ID
import { NextResponse } from "next/server";
import { servicesData } from "@/lib/data/sampleData";

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    // Find service by slug or _id
    const service = servicesData.find((s) => s.slug === slug || s._id === slug);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service, { status: 200 });
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}
