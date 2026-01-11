import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productName, description, availableQuantity, price, sellerId } =
      body;

    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("products");
    await collection.updateOne(
      { sellerId: sellerId, productName: productName },
      {
        $set: {
          description: description,
          availableQuantity: availableQuantity,
          price: price,
        },
      }
    );

    return NextResponse.json({ message: "received", success: true });
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Something Went Wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
