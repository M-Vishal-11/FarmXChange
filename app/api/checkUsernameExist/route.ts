import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userName } = await req.json();
    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("sellers");
    const data = await collection
      .find(
        { displayName: userName },
        { projection: { displayName: 1, _id: 0 } }
      )
      .toArray();

    return NextResponse.json({
      message: "Received",
      present: data.length == 0,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Something Went Wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
