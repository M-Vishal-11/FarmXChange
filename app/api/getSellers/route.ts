import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("sellers");
    const data = await collection
      .find({}, { projection: { _id: 0, displayName: 1, description: 1 } })
      .toArray();

    console.log(data);

    return NextResponse.json({
      message: "Received",
      sellers: data,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Something Went Wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
