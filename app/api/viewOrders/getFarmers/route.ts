import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { buyerId } = await req.json();

    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("orders");
    const data = await collection
      .aggregate([
        // 1️⃣ Match buyer
        {
          $match: { buyerId },
        },

        // 2️⃣ Join with sellers collection
        {
          $lookup: {
            from: "sellers",
            localField: "farmerName", // orders.farmerName
            foreignField: "displayName", // sellers.displayName
            as: "sellerInfo",
          },
        },

        // 3️⃣ Flatten sellerInfo array
        {
          $unwind: {
            path: "$sellerInfo",
            preserveNullAndEmptyArrays: true,
          },
        },

        // 4️⃣ Shape final response
        {
          $project: {
            _id: 0,
            farmerName: 1,
            products: 1,
            phone: "$sellerInfo.phone",
            email: "$sellerInfo.email",
          },
        },
      ])
      .toArray();

    return NextResponse.json({
      message: "Received",
      products: data,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Something Went Wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
