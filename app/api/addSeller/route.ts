import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("sellers");
    await collection.insertOne({
      sellerId: body.uid,
      displayName: body.displayName,
      description: body.description,
      email: body.email,
      phone: body.phone,
    });

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
