"use client";
import Link from "next/link";
import { Home, ShoppingCart, Leaf } from "lucide-react";
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
          <Link
            href="/buyer"
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <Home className="w-5 h-5" />
            Home
          </Link>

          <button
            onClick={() => router.push("/buyer/cart")}
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <ShoppingCart className="w-5 h-5" />
            Cart
          </button>
        </div>
      </nav>

      {children}
    </>
  );
}
