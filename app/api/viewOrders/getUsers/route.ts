import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { farmerName } = await req.json();

    const client = await clientPromise;
    const db = client.db("farmxchange");
    const collection = db.collection("orders");
    const data = await collection
      .aggregate([
        { $match: { farmerName } },
        {
          $lookup: {
            from: "customers",
            foreignField: "userId",
            localField: "buyerId",
            as: "customerInfo",
          },
        },
        {
          $unwind: {
            path: "$customerInfo",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 0,
            // farmerName: 0,
            buyerName: "$customerInfo.fullName",
            phone: "$customerInfo.phone",
            address: "$customerInfo.address",
            email: "$customerInfo.email",
            products: 1,
            buyerId: 1,
          },
        },
      ])
      .toArray();

    return NextResponse.json({
      message: "Received",
      data,
    });
  } catch (error: unknown) {
    return NextResponse.json({
      message: "Something Went Wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
