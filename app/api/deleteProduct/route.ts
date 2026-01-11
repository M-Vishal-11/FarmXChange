import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { productName, sellerId } = await req.json();

    //product
    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("products");
    const productData = await collection.deleteOne({
      sellerId: sellerId,
      productName: productName,
    });

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
