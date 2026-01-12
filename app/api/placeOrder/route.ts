import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

type Product = {
  productName: string;
  price: number;
  qnty: number;
};

export async function POST(req: Request) {
  try {
    const { cartData, ...body } = await req.json();

    // ✅ Basic validation
    if (!body.userId || !Array.isArray(cartData)) {
      return NextResponse.json(
        { message: "Invalid request payload" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("farmxchange");

    /* =========================
       CUSTOMERS (UPSERT)
    ========================== */
    const collectionCus = db.collection("customers");

    await collectionCus.updateOne(
      { userId: body.userId },
      {
        $set: {
          fullName: body.fullName,
          phone: body.phone,
          address: body.address,
          updatedAt: new Date(),
        },
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    /* =========================
       ORDERS (BULK WRITE)
    ========================== */
    const collectionOrders = db.collection("orders");

    const operations = (cartData as [string, Product[]][]).map(
      ([farmerName, products]) => ({
        updateOne: {
          filter: { buyerId: body.userId, farmerName },
          update: {
            $set: {
              buyerId: body.userId,
              farmerName,
              products,
            },
          },
          upsert: true,
        },
      })
    );

    if (operations.length > 0) {
      await collectionOrders.bulkWrite(operations);
    }

    return NextResponse.json({ message: "Order placed successfully" });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
