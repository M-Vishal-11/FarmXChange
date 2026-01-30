"use client";

import { onAuthStateChanged } from "firebase/auth";
import {
  Home,
  Leaf,
  Settings,
  Package,
  MessageCircle,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { auth } from "../components/firebase";

export default function OfficerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [orderLen, setOrderLen] = useState(0);
  const [chatLen, setChatLen] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.push("/login"); // change if your route is different
        return;
      }

      const officerName = user.displayName || "Officer";

      try {
        // ✅ you can create these APIs later. For now keep one.
        const res = await axios.post("/api/getOrderLength", { officerName });
        setOrderLen(res.data.dataLength || 0);

        // Optional unread chats length (create this API later)
        // const chatRes = await axios.post("/api/getOfficerUnreadChats", { officerName });
        // setChatLen(chatRes.data.count || 0);
      } catch (e) {
        console.log(e);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const navItem = useMemo(
    () => (href: string) => {
      const active = pathname === href;
      return `flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition
      ${active ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50 hover:text-green-700"}`;
    },
    [pathname],
  );

  const Badge = ({ n }: { n: number }) =>
    n > 0 ? (
      <span className="ml-2 inline-flex min-w-[22px] items-center justify-center rounded-full bg-green-600 px-2 py-0.5 text-xs font-bold text-white">
        {n}
      </span>
    ) : null;

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/officer"
            className="flex items-center gap-2 text-xl font-extrabold text-green-700"
          >
            <Leaf className="h-7 w-7" />
            FarmXChange
          </Link>

          {/* Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => router.push("/officer")}
              className={navItem("/officer")}
            >
              <Home className="h-5 w-5" />
              Home
            </button>

            <button
              onClick={() => router.push("/officer/settings")}
              className={navItem("/officer/settings")}
            >
              <Settings className="h-5 w-5" />
              Settings
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
