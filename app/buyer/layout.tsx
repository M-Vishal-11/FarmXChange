"use client";
import Link from "next/link";
import { Home, ShoppingCart, Leaf, Settings, Package } from "lucide-react";
import { useRouter } from "next/navigation";

export default function layoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        {/* Logo */}
        <Link
          href="/buyer"
          className="flex items-center gap-2 text-2xl font-bold text-red-600"
        >
          <Leaf className="w-7 h-7" />
          FarmXChange
        </Link>

        {/* Nav Links */}
        <div className="flex gap-6 text-lg font-medium">
          <button
            onClick={() => router.push("/buyer")}
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <Home className="w-5 h-5" />
            Home
          </button>

          <button
            onClick={() => router.push("/buyer/cart")}
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
          </button>

          <button
            onClick={() => router.push("/buyer/viewOrders")}
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <Package className="w-5 h-5" />
            View Orders
          </button>

          <button
            onClick={() => router.push("/buyer/settings")}
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </nav>

      {children}
    </>
  );
}
