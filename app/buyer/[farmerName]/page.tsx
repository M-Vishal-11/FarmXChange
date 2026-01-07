"use client";

import { useParams } from "next/navigation";
import Product from "@/app/buyer/functions/Product";

export default function Page() {
  const params = useParams<{ farmerName?: string }>();

  if (!params?.farmerName) {
    return <div className="p-10 text-lg">Loading...</div>;
  }

  const decodedName = decodeURIComponent(params.farmerName);

  const products = [
    {
      name: "Carrots",
      description: "Crunchy and sweet farm-grown carrots",
      quantity: 40,
      price: 45,
    },
    {
      name: "Cabbage",
      description: "Fresh green cabbage harvested today",
      quantity: 25,
      price: 30,
    },
    {
      name: "Apples",
      description: "Naturally sweet apples from hill farms",
      quantity: 60,
      price: 120,
    },
    {
      name: "Bananas",
      description: "Fresh yellow bananas, rich in energy",
      quantity: 100,
      price: 40,
    },
    {
      name: "Oranges",
      description: "Juicy oranges with natural sweetness",
      quantity: 70,
      price: 80,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      {/* Farmer Info */}
      <div className="flex items-center gap-6 bg-white rounded-3xl shadow-lg p-8 mb-10">
        {/* Farmer Image */}
        <div className="h-28 w-28 rounded-full bg-stone-300"></div>

        {/* Farmer Details */}
        <div>
          <h1 className="text-3xl font-bold capitalize">{decodedName}</h1>
          <p className="text-gray-600 mt-2">
            Verified farmer providing fresh, chemical-free produce.
          </p>
        </div>
      </div>

      {/* Products */}
      <h2 className="text-2xl font-bold mb-6">Available Products</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {products.map((p, i) => (
          <Product
            key={i}
            name={p.name}
            description={p.description}
            quantity={p.quantity}
            price={p.price}
            farmerName={decodedName}
          />
        ))}
      </div>
    </div>
  );
}
