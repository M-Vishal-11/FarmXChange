"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Pencil } from "lucide-react";

type Seed = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
};

export default function SeedSellerHome() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  // 🔧 demo data — replace with API later
  const [seeds] = useState<Seed[]>([
    {
      id: 1,
      name: "Hybrid Tomato",
      description: "High yield hybrid variety",
      quantity: 120,
      price: 110,
    },
    {
      id: 2,
      name: "Chili Premium",
      description: "Disease resistant chili",
      quantity: 80,
      price: 95,
    },
    {
      id: 3,
      name: "Corn Gold",
      description: "Fast growing corn seeds",
      quantity: 200,
      price: 60,
    },
  ]);

  const filtered = seeds.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Search */}
      <div className="flex items-center bg-white rounded-xl shadow px-4 py-3 max-w-xl mb-8">
        <Search className="w-5 h-5 text-gray-500 mr-2" />
        <input
          placeholder="Search your seeds..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="outline-none w-full"
        />
      </div>

      {/* Seed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((seed) => (
          <SeedCard
            key={seed.id}
            seed={seed}
            onEdit={() => router.push(`/seedSeller/edit/${seed.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

function SeedCard({
  seed,
  onEdit,
}: {
  seed: {
    id: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
  };
  onEdit: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition p-6 border border-gray-100">
      {/* left image */}
      <div className="h-20 w-20 rounded-xl bg-green-200 flex items-center justify-center text-xl shrink-0">
        🌱
      </div>

      {/* middle content */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{seed.name}</h3>

        <p className="text-gray-600 mt-1">{seed.description}</p>

        {/* same badge style as before */}
        <div className="flex gap-3 mt-3 text-sm">
          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-lg font-medium">
            Stock: {seed.quantity} Kg
          </span>

          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg font-medium">
            ₹{seed.price}/Kg
          </span>
        </div>
      </div>

      {/* right action */}
      <button
        onClick={onEdit}
        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition shrink-0"
      >
        <Pencil className="w-4 h-4" />
        Edit
      </button>
    </div>
  );
}
