"use client";

import { useParams } from "next/navigation";
import Product from "@/app/buyer/functions/Product";
import { useEffect, useState } from "react";
import axios from "axios";

type ProductProps = {
  productName: string;
  description: string;
  availableQuantity: number;
  price: number;
  displayName: string; // seller name
};

export default function Page() {
  const params = useParams<{ farmerName?: string }>();

  if (!params?.farmerName) {
    return <div className="p-10 text-lg">Loading...</div>;
  }

  const decodedName = decodeURIComponent(params.farmerName);

  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.post("/api/getProducts", { decodedName });

      console.log(res.data);
      setProducts(res.data.productsData);
    };
    getData();
  }, []);

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
            name={p.productName}
            description={p.description}
            quantity={p.availableQuantity}
            price={p.price}
            farmerName={decodedName}
          />
        ))}
      </div>
    </div>
  );
}
