"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { auth } from "@/app/components/firebase";
import { useClearCart, useFarmers } from "../functions/cartStore";

export default function BuyerInfo() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const cartData = Object.entries(useFarmers());
  const clearCart = useClearCart();

  /* =========================
     AUTH + AUTO FILL
  ========================== */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        toast.error("Please login to continue");
        router.replace("/login");
        return;
      }

      setUser(user);

      if (user.displayName) {
        setFullName(user.displayName);
      }
      if (user.email) {
        setEmail(user.email);
      }
      const getData = async () => {
        const res = await axios.post("/api/getBuyer", { userId: user.uid });
        const { body } = res.data;
        if (body) {
          setAddress(body.address);
          setPhone(body.phone);
        }
      };

      getData();
    });

    return () => unsubscribe();
  }, [router]);

  /* =========================
     SUBMIT HANDLER
  ========================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("Authentication required");
      return;
    }

    if (cartData.length == 0) {
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-xl rounded-xl p-4 border-l-4 border-amber-400`}
          >
            <h3 className="font-semibold text-gray-800 mb-1">
              🛒 Your cart is empty
            </h3>

            <p className="text-sm text-gray-600">
              Looks like the page was refreshed, so your cart items were
              cleared. Please add products and place your order again.
            </p>

            <p className="mt-2 text-xs text-amber-600">
              ⚠️ Tip: Avoid refreshing the page while checking out.
            </p>
          </div>
        ),
        { duration: 4500 }
      );
      return;
    }

    if (!fullName || !phone || !address) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/placeOrder", {
        userId: user.uid,
        fullName,
        email,
        phone,
        address,
        cartData,
      });

      toast.success("Order placed successfully 🎉");
      clearCart();
      router.replace("/buyer/orderPlaced");
    } catch (error) {
      console.error(error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     UI
  ========================== */
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Buyer Information
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-emerald-500">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-emerald-500">*</span>
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email id"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-emerald-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-emerald-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter delivery address"
              className="w-full px-4 py-2 border rounded-xl resize-none focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          {/* Payment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <input
              type="text"
              value="Cash on Delivery"
              disabled
              className="w-full px-4 py-2 border rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3 rounded-xl bg-emerald-500 text-white font-semibold text-lg hover:bg-emerald-600 transition disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
