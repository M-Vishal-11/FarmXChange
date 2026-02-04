"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingCart, Search } from "lucide-react";
import SeedProduct from "../functions/SeedHome";

export default function BuySeeds() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // Demo data — replace with DB/API later
  const seeds = [
    {
      seedName: "Hybrid Tomato",
      description: "High yield variety",
      quantity: 40,
      price: 120,
      sellerName: "GreenRoot Seeds",
    },
    {
      seedName: "Organic Chili",
      description: "Spicy red chili seeds",
      quantity: 25,
      price: 90,
      sellerName: "AgroNest",
    },
    {
      seedName: "Corn Premium",
      description: "Fast growing corn",
      quantity: 60,
      price: 70,
      sellerName: "FarmTrust",
    },
  ];

  const filteredSeeds = seeds.filter((s) =>
    s.seedName.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Search + Cart Row */}
      <div className="flex gap-4 items-center mb-8">
        {/* Search Bar */}
        <div className="flex items-center bg-white rounded-xl shadow px-4 py-3 w-full max-w-xl">
          <Search className="w-5 h-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search seeds..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none w-full"
          />
        </div>

        {/* Cart Button */}
        <button
          onClick={() => router.push("/farmer/buySeeds/cart")}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-3 rounded-xl shadow hover:bg-green-700 transition"
        >
          <ShoppingCart className="w-5 h-5" />
          Cart
        </button>
      </div>

      {/* Seed List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSeeds.length > 0 ? (
          filteredSeeds.map((seed, i) => (
            <SeedProduct
              key={i}
              seedName={seed.seedName}
              description={seed.description}
              quantity={seed.quantity}
              price={seed.price}
              sellerName={seed.sellerName}
            />
          ))
        ) : (
          <p className="text-gray-500">No seeds found.</p>
        )}
      </div>
    </div>
  );
}
