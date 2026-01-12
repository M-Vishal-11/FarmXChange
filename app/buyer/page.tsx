"use client";

import { useEffect, useMemo, useState } from "react";
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
  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/getSellers");
        console.log(res.data);
        setCards(res.data.sellers ?? []);
      } catch {
        setError("Failed to load sellers");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const filteredCards = useMemo(() => {
    if (!searchVal.trim()) return cards;

    return cards.filter((card) =>
      card.displayName.toLowerCase().includes(searchVal.toLowerCase())
    );
  }, [cards, searchVal]);

  if (loading) return <p className="text-center mt-20">Loading sellers...</p>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="flex justify-center mt-10">
        <input
          type="text"
          placeholder="Search farmers/officers..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          className="w-full max-w-xl px-5 py-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
        {filteredCards.map((item) => (
          <Card
            key={item.id}
            farmerName={item.displayName}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
