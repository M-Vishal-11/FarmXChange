"use client";

import { useRouter } from "next/navigation";
import SeedCartItem from "../../functions/SeedCartItem";
import {
  useRemoveSeed,
  useSeedSellers,
  useUpdateSeedQnty,
} from "../../functions/seedStore";

type CartItemType = {
  name: string;
  price: number;
  quantity: number;
  sellerName: string;
};

export default function SeedCart() {
  const router = useRouter();

  // const cartItems = [
  //   {
  //     name: "Hybrid Tomato",
  //     price: 120,
  //     quantity: 2,
  //     sellerName: "GreenRoot Seeds",
  //   },
  //   {
  //     name: "Organic Chili",
  //     price: 90,
  //     quantity: 1,
  //     sellerName: "GreenRoot Seeds",
  //   },
  //   {
  //     name: "Corn Premium",
  //     price: 70,
  //     quantity: 3,
  //     sellerName: "AgroNest",
  //   },
  // ];

  const seedSellers = useSeedSellers();
  const updateSeedqnty = useUpdateSeedQnty();
  const removeSeed = useRemoveSeed();

  // derive items
  const cartItems: CartItemType[] = Object.entries(seedSellers).flatMap(
    ([sellerName, products]) =>
      products.map((product) => ({
        name: product.seedName,
        price: product.price,
        quantity: product.qnty,
        sellerName,
      })),
  );

  const increaseQty = (item: CartItemType) => {
    updateSeedqnty(item.sellerName, item.name, item.quantity + 1);
  };

  const decreaseQty = (item: CartItemType) => {
    if (item.quantity <= 1) {
      removeSeed(item.sellerName, item.name);
    } else {
      updateSeedqnty(item.sellerName, item.name, item.quantity - 1);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = cartItems.length > 0 ? 30 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-green-50 p-10">
      <h1 className="text-3xl font-bold mb-8">Seed Cart 🌱</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-gray-500 text-lg">No seeds added yet 🌾</div>
          ) : (
            cartItems.map((item) => (
              <SeedCartItem
                key={`${item.sellerName}-${item.name}`}
                {...item}
                onIncrease={() => increaseQty(item)}
                onDecrease={() => decreaseQty(item)}
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
            onClick={() => router.push("/farmer/buySeeds/farmerInfo")}
            className="mt-6 w-full py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50"
          >
            Proceed to Seed Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
