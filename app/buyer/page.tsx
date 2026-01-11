"use client";

import { useEffect, useState } from "react";
import { Card } from "./functions/Card";
import axios from "axios";

type CardProps = {
  displayName: string;
  description: string;
};

export default function BuyerHome() {
  // const cards: CardProps[] = [
  //   {
  //     farmerName: "Farmer 1",
  //     description: "Fresh organic vegetables directly from the farm.",
  //   },
  //   {
  //     farmerName: "Farmer 2",
  //     description: "Naturally grown fruits with zero chemicals.",
  //   },
  //   {
  //     farmerName: "Farmer 3",
  //     description: "Naturally grown fruits with zero chemicals.",
  //   },
  // ];

  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/getSellers");
      const sellers = res.data.sellers;
      console.log(sellers);
      setCards(sellers);
    };
    getData();
  }, []);

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
        {cards.map((item, index) => (
          <Card
            farmerName={item.displayName}
            description={item.description}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
