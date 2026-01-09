"use client";

import { Home, Leaf, Settings, PlusCircle, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const navBtn = "flex items-center gap-2 hover:text-red-500 transition";

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        {/* Logo */}
        <Link
          href="/farmer"
          className="flex items-center gap-2 text-2xl font-bold text-red-600"
        >
          <Leaf className="w-7 h-7" />
          FarmXChange
        </Link>

        {/* Navigation */}
        <div className="flex gap-8 text-lg font-medium">
          <button onClick={() => router.push("/farmer")} className={navBtn}>
            <Home className="w-5 h-5" />
            Home
          </button>

          <button
            onClick={() => router.push("/farmer/addProduct")}
            className={navBtn}
          >
            <PlusCircle className="w-5 h-5" />
            Add Product
          </button>

          <button
            onClick={() => router.push("/farmer/viewOrders")}
            className={navBtn}
          >
            <Package className="w-5 h-5" />
            View Orders <strong>(2)</strong>
          </button>

          <button
            onClick={() => router.push("/farmer/settings")}
            className={navBtn}
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
