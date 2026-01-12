import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { farmerName } = await req.json();
    const client = await clientPromise;
    const collection = client.db("farmxchange").collection("orders");
    const dataLength = await collection.countDocuments({ farmerName });
    return NextResponse.json({ message: "Received", dataLength });
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Something Went Wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
