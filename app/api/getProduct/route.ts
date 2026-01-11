import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId, productName } = await req.json();

    //product
    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("products");
    const productData = await collection
      .find(
        { sellerId: userId, productName: productName },
        { projection: { _id: 0, sellerId: 0, displayName: 0, productName: 0 } }
      )
      .toArray();

    return NextResponse.json({
      message: "Received",
      productData,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Something Went Wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
