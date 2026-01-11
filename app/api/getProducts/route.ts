import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const reqSeller = await req.json();
    const { decodedName } = reqSeller; //Seller Name

    //products
    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("products");
    const productsData = await collection
      .find(
        { displayName: decodedName },
        { projection: { _id: 0, sellerId: 0, displayName: 0 } }
      )
      .toArray();

    return NextResponse.json({
      message: "Received",
      productsData,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Something Went Wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
