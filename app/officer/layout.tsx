"use client";

import { onAuthStateChanged } from "firebase/auth";
import { Home, Leaf, Settings, PlusCircle, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth } from "../components/firebase";
import axios from "axios";

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [len, setLen] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const farmerName = user.displayName;
      const getData = async () => {
        const res = await axios.post("/api/getOrderLength", { farmerName });
        setLen(res.data.dataLength);
      };
      getData();
    });

    return () => unsubscribe(); // cleanup
  }, []);

  const navBtn = "flex items-center gap-2 hover:text-red-500 transition";

  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        {/* Logo */}
        <Link
          href="/officer"
          className="flex items-center gap-2 text-2xl font-bold text-red-600"
        >
          <Leaf className="w-7 h-7" />
          FarmXChange
        </Link>

        {/* Navigation */}
        <div className="flex gap-8 text-lg font-medium">
          <button onClick={() => router.push("/officer")} className={navBtn}>
            <Home className="w-5 h-5" />
            Home
          </button>

          <button
            onClick={() => router.push("/officer/addProduct")}
            className={navBtn}
          >
            <PlusCircle className="w-5 h-5" />
            Add Product
          </button>

          <button
            onClick={() => router.push("/officer/viewOrders")}
            className={navBtn}
          >
            <Package className="w-5 h-5" />
            View Orders {len !== 0 && <strong>({len})</strong>}
          </button>

          <button
            onClick={() => router.push("/officer/settings")}
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
