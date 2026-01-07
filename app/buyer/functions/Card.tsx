"use client";
import { useRouter } from "next/navigation";

type CardProps = {
  farmerName: string;
  description: string;
};

export function Card({ farmerName, description }: CardProps) {
  const router = useRouter();
  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-52 bg-stone-400"></div>

      {/* Content */}
      <div className="p-6">
        <h2 className="text-2xl font-bold">{farmerName}</h2>
        <p className="text-gray-600 mt-2">{description}</p>

        <button
          className="mt-4 w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          onClick={() => router.push(`/buyer/${farmerName}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
