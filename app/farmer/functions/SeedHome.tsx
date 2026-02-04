"use client";

import { useEffect, useState } from "react";
import { useAddSeed, useUpdateSeedQnty } from "./seedStore";

type SeedProductProps = {
  seedName: string;
  description: string;
  quantity: number; // available stock
  price: number;
  sellerName: string;
};

export default function SeedProduct({
  seedName,
  description,
  quantity,
  price,
  sellerName,
}: SeedProductProps) {
  const [cartQty, setCartQty] = useState(0);

  //   cart store actions
  const updateSeedQnty = useUpdateSeedQnty();
  const addSeed = useAddSeed();

  useEffect(() => {
    if (cartQty === 1) {
      addSeed(sellerName, seedName, price, 1);
    } else if (cartQty > 1) {
      updateSeedQnty(sellerName, seedName, cartQty);
    }
  }, [cartQty]);

  const addToCart = () => {
    if (quantity > 0) setCartQty(1);
  };

  const increase = () => {
    if (cartQty < quantity) setCartQty(cartQty + 1);
  };

  const decrease = () => {
    if (cartQty > 1) setCartQty(cartQty - 1);
    else setCartQty(0);
  };

  return (
    <div className="flex items-center justify-between gap-6 p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 border border-gray-100">
      {/* Seed Image */}
      <div className="h-20 w-20 rounded-xl bg-linear-to-br from-green-200 to-green-300 flex items-center justify-center text-2xl">
        🌱
      </div>

      {/* Info */}
      <div className="flex-1 space-y-1">
        <h3 className="text-lg font-semibold text-gray-900">{seedName}</h3>

        <p className="text-sm text-gray-600">{description}</p>

        {/* badges row */}
        <div className="flex gap-3 flex-wrap pt-1">
          <span className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-700 font-medium">
            Seller: {sellerName}
          </span>

          <span className="text-xs px-2 py-1 rounded-md bg-green-50 text-green-700 font-medium">
            Stock: {quantity} Kg
          </span>
        </div>

        <p className="text-lg font-bold text-green-700 pt-1">
          ₹{price}
          <span className="text-sm font-medium text-gray-500"> /Kg</span>
        </p>
      </div>

      {/* Cart Actions */}
      {cartQty === 0 ? (
        <button
          onClick={addToCart}
          className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 active:scale-95 transition"
        >
          Add Seeds
        </button>
      ) : (
        <div className="flex items-center gap-3 bg-gray-50 px-3 py-2 rounded-xl border">
          <button
            onClick={decrease}
            className="h-8 w-8 rounded-lg bg-white shadow hover:bg-gray-100 text-lg font-bold"
          >
            −
          </button>

          <span className="w-6 text-center font-semibold">{cartQty}</span>

          <button
            onClick={increase}
            className="h-8 w-8 rounded-lg bg-white shadow hover:bg-gray-100 text-lg font-bold"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
