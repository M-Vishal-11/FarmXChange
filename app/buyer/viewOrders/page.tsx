"use client";
import { useEffect, useState } from "react";
import { ViewOrderCard } from "../functions/BuyerOrderCard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/components/firebase";
import axios from "axios";

export type productProps = {
  productName: string;
  price: number;
  qnty: number;
};

export type farmerProps = {
  farmerName: string;
  products: productProps[];
  phone: number;
  email: string;
};

export default function Page() {
  const [data, setData] = useState<farmerProps[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const buyerId = user.uid;
      const getData = async () => {
        const res = await axios.post("/api/viewOrders/getFarmers", { buyerId });
        console.log(res.data);
        setData(res.data.products);
      };
      getData();
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">My Order 📦</h1>

      <div className="space-y-6 max-w-2xl mx-auto">
        {data.map(({ farmerName, products, phone, email }) => (
          <ViewOrderCard
            key={farmerName}
            farmerName={farmerName}
            products={products}
            phone={phone}
            email={email}
          />
        ))}
      </div>
    </div>
  );
}
