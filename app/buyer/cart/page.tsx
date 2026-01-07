"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../functions/cartStore";

type CartItemType = {
  name: string;
  price: number;
  quantity: number;
  farmerName: string;
};

export default function Cart() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  const farmers = useCart((state) => state.farmers);

  useEffect(() => {
    const items: CartItemType[] = [];

    for (const farmerName in farmers) {
      farmers[farmerName].forEach((product) => {
        items.push({
          name: product.productName,
          price: product.price,
          quantity: product.qnty,
          farmerName,
        });
      });
    }

    setCartItems(items);
  }, [farmers]);

  const increaseQty = (index: number) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (index: number) => {
    setCartItems((prev) =>
      prev
        .map((item, i) =>
          i === index ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 20 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-gray-500 text-lg">Your cart is empty 🛒</div>
          ) : (
            cartItems.map((item, index) => (
              <CartItem
                key={`${item.farmerName}-${item.name}`}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onIncrease={() => increaseQty(index)}
                onDecrease={() => decreaseQty(index)}
                farmerName={item.farmerName}
              />
            ))
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Delivery</span>
            <span>₹{deliveryFee}</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <button
            disabled={cartItems.length === 0}
            className="mt-6 w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-50"
            onClick={() => router.push("/buyer/payment")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

function CartItem({
  name,
  price,
  quantity,
  onIncrease,
  onDecrease,
  farmerName,
}: {
  name: string;
  price: number;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  farmerName: string;
}) {
  return (
    <div className="flex items-center gap-6 bg-white rounded-2xl shadow-md p-5">
      {/* Image */}
      <div className="h-20 w-20 bg-stone-300 rounded-xl"></div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">
          {name} <span className="text-sm text-gray-500">({farmerName})</span>
        </h3>
        <p className="text-gray-600">₹{price} / Kg</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          −
        </button>

        <span className="font-semibold">{quantity}</span>

        <button
          onClick={onIncrease}
          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Total */}
      <div className="font-semibold">₹{price * quantity}</div>
    </div>
  );
}
