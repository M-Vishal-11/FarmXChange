import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userName } = await req.json();

    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("sellers");

    const seller = await collection.findOne(
      { displayName: userName },
      { projection: { _id: 0, description: 1 } }
    );

    return NextResponse.json({
      message: "Received",
      description: seller?.description ?? "",
    });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Something Went Wrong",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
