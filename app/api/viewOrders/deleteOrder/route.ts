import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userName, buyerId } = await req.json();

    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("orders");
    await collection.deleteOne({ farmerName: userName, buyerId });

    return NextResponse.json({ message: "Received" });
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Something Went Wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
