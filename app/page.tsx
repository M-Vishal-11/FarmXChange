"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart, Tractor, ShieldCheck } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 to-red-100">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Buyer */}
        <button
          onClick={() => router.push("/login?category=buyer")} //buyer
          className="group w-64 h-40 rounded-3xl bg-linear-to-br from-red-500 to-red-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center justify-center"
        >
          <ShoppingCart className="w-12 h-12 mb-3" />
          <span className="text-3xl font-bold">Buyer</span>
        </button>

        {/* Farmer */}
        <button
          onClick={() => router.push("/login?category=farmer")} //farmer
          className="group w-64 h-40 rounded-3xl bg-linear-to-br from-green-500 to-green-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center justify-center"
        >
          <Tractor className="w-12 h-12 mb-3" />
          <span className="text-3xl font-bold">Farmer</span>
        </button>

        {/* Agri Officer */}
        <button
          onClick={() => router.push("/login?category=officer")} //officer
          className="group w-64 h-40 rounded-3xl bg-linear-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex flex-col items-center justify-center"
        >
          <ShieldCheck className="w-12 h-12 mb-3" />
          <span className="text-3xl font-bold">Agri Officer</span>
        </button>
      </div>
    </div>
  );
}
