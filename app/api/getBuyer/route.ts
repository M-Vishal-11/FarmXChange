import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("customers");
    const body = await collection.findOne(
      { userId },
      { projection: { _id: 0, phone: 1, address: 1 } }
    );

    return NextResponse.json({
      message: "Received",
      body,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Something Went Wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
