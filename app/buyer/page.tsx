"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./functions/Card";

type CardProps = {
  id: string;
  displayName: string;
  description: string;
};

export default function BuyerHome() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/getSellers");
        console.log(res.data);
        setCards(res.data.sellers ?? []);
      } catch (err) {
        console.error(err);
        setError("Failed to load sellers");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return <p className="text-center mt-20">Loading sellers...</p>;
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="flex justify-center mt-10">
        <input
          type="text"
          placeholder="Search farmers or products..."
          className="w-full max-w-xl px-5 py-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
        {cards.map((item, i) => (
          <Card
            key={i}
            farmerName={item.displayName}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
