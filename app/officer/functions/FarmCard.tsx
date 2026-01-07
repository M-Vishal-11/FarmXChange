"use client";

import { useRouter } from "next/navigation";

type FarmCardProps = {
  name: string;
  description: string;
  quantity: number;
};

export default function FarmCard({
  name,
  description,
  quantity,
}: FarmCardProps) {
  const router = useRouter();

  return (
    <div className="group flex items-center gap-6 p-6 bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300">
      {/* Image */}
      <div className="relative">
        <div className="h-20 w-20 bg-stone-300 rounded-2xl" />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{description}</p>
        <p className="text-sm text-green-700 mt-2 font-medium">
          Available: {quantity} Kg
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={() => router.push(`/farmer/${name}`)}
        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 hover:scale-105 transition"
      >
        Edit
      </button>
    </div>
  );
}
