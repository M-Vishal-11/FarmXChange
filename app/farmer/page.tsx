"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user?.displayName) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post("/api/getProducts", {
          decodedName: user.displayName,
        });

        const data = res.data?.productsData ?? [];

        if (data.length === 0) {
          toast.error("No products found!");
        }

        setProducts(data);
      } catch (error) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredProducts = useMemo(() => {
    const value = searchVal.trim().toLowerCase();

    if (!value) return products;

    return products.filter((product) =>
      product.productName.toLowerCase().includes(value)
    );
  }, [searchVal, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="flex justify-center mt-10 px-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-xl px-5 py-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-10 text-gray-500">Loading products...</p>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No matching products found
        </p>
      )}

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
        {filteredProducts.map((p) => (
          <FarmCard
            key={p.productName}
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
