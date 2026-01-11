import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("products");
    await collection.insertOne({
      ...body,
    });

    return NextResponse.json({
      message: "Received",
      body,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}
