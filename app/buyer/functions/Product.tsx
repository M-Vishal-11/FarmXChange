"use client";

import { useEffect, useState } from "react";
import { useCart } from "./cartStore";

type ProductProps = {
  name: string;
  description: string;
  quantity: number; // available stock
  price: number;
  farmerName: string;
};

export default function Product({
  name,
  description,
  quantity,
  price,
  farmerName,
}: ProductProps) {
  const [cartQty, setCartQty] = useState(0);

  //Zustom
  const updateQnty = useCart((state) => state.actions.updateQnty);
  const createItem = useCart((state) => state.actions.addItem);

  useEffect(() => {
    if (cartQty == 1) {
      createItem(farmerName, name, price, 1);
    } else if (cartQty > 1) {
      updateQnty(farmerName, name, cartQty);
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
    else setCartQty(0); // remove from cart
  };

  return (
    <div className="flex items-center justify-between gap-6 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
      {/* Image */}
      <div className="h-20 w-20 bg-stone-300 rounded-xl" />

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <p className="text-sm text-green-700 mt-1">Available: {quantity} Kg</p>
        <p className="mt-1 text-md font-bold text-gray-900">₹{price}/Kg</p>
      </div>

      {/* Cart Actions */}
      {cartQty === 0 ? (
        <button
          onClick={addToCart}
          className="px-5 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={decrease}
            className="h-9 w-9 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300"
          >
            −
          </button>

          <span className="w-6 text-center font-semibold">{cartQty}</span>

          <button
            onClick={increase}
            className="h-9 w-9 rounded-full bg-gray-200 text-lg font-bold hover:bg-gray-300"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}
