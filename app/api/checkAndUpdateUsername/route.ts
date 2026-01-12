import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userName, sellerId } = await req.json();
    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("sellers");
    const data = await collection.findOne(
      { displayName: userName },
      { projection: { displayName: 1, _id: 0 } }
    );

    if (data) {
      return NextResponse.json({
        message: "Received",
        success: false,
      });
    }

    await collection.updateOne(
      { sellerId },
      { $set: { displayName: userName } }
    );

    return NextResponse.json({
      message: "Received",
      success: true,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Something Went Wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
