"use client";

import { useEffect, useState } from "react";
import { OrderCard } from "../functions/OrderCard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/components/firebase";
import axios from "axios";
import { productProps } from "@/app/buyer/viewOrders/page";

export type buyerProps = {
  buyerName: string;
  products: productProps[];
  phone: number;
  email: string;
  buyerId: string;
};

export default function Page() {
  const [orders, setOrders] = useState<buyerProps[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const farmerName = user.displayName;
      console.log(farmerName);
      const getData = async () => {
        const res = await axios.post("/api/viewOrders/getUsers", {
          farmerName,
        });
        console.log(res.data);
        setOrders(res.data.data);
      };
      getData();
    });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Orders Received 📦</h1>
      <div className="space-y-6">
        {orders.map(({ buyerName, products, phone, email, buyerId }, i) => (
          <OrderCard
            key={i}
            buyerName={buyerName}
            products={products}
            phone={phone}
            email={email}
            buyerId={buyerId}
          />
        ))}
      </div>
    </div>
  );
}
