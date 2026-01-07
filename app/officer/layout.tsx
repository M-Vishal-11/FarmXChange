import { Leaf } from "lucide-react";
import Link from "next/link";

export default function layoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <Link
          href="/officer"
          className="flex items-center gap-2 text-2xl font-bold text-red-600"
        >
          <Leaf className="w-7 h-7" />
          FarmXChange
        </Link>

        <div className="flex gap-6 text-lg font-medium">
          <Link href="/officer" className="hover:text-red-500 transition">
            Home
          </Link>
          <Link
            href="/officer/addProduct"
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            {/* ➕ Add Product Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Product
          </Link>

          <Link
            href="/officer/viewOrders"
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            {/* 📦 Orders Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7l9-4 9 4-9 4-9-4zm0 5l9 4 9-4m-9 9V11"
              />
            </svg>
            View Orders <strong>(2)</strong>
          </Link>

          <Link
            href="/officer/settings"
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 005 15.4a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 005 8.6a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 008.6 5a1.65 1.65 0 001.51-1V3a2 2 0 014 0v.09A1.65 1.65 0 0015.4 5a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019 8.6c0 .33.04.65.1.95z"
              />
            </svg>
            Settings
          </Link>
        </div>
      </nav>
      {children}
    </>
  );
}
