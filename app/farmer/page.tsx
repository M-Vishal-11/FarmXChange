"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import FarmCard from "./functions/FarmCard";
import { auth } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

type ProductProps = {
  productName: string;
  description: string;
  availableQuantity: number;
  price: number;
  displayName: string; // seller name
};

export default function FarmerHome() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user?.displayName) return;

      const res = await axios.post("/api/getProducts", {
        decodedName: user.displayName,
      });

      console.log(res.data);
      if (res.data.productsData.length == 0) {
        toast.error("No products found!");
      }

      setProducts(res.data.productsData ?? []);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="flex justify-center mt-10">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-xl px-5 py-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
        {products.map((p, i) => (
          <FarmCard
            key={i}
            name={p.productName}
            description={p.description}
            quantity={p.availableQuantity}
            price={p.price}
          />
        ))}
      </div>
    </div>
  );
}
