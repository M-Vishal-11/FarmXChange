"use client";
import { useEffect, useMemo, useState } from "react";
import { buyerProps } from "../viewOrders/page";
import { OrdersProduct } from "./OrderProduct";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/components/firebase";
import toast from "react-hot-toast";

export function OrderCard({
  buyerName,
  products,
  phone,
  email,
  buyerId,
}: buyerProps) {
  const [userName, setUserName] = useState("");
  const total = useMemo(
    () => products.reduce((sum, p) => sum + p.price * p.qnty, 0),
    [products]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return;
      if (user.displayName) {
        setUserName(user.displayName);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleDelivery = async () => {
    const res = await axios.post("/api/viewOrders/deleteOrder", {
      userName,
      buyerId,
    });
    console.log(res.data);
    toast.success("Order deleted successfull");
    toast.custom((t) => (
      <div className="flex items-center gap-4 rounded-xl bg-white px-4 py-3 shadow-lg border">
        <span className="text-sm font-medium text-gray-800">
          Changes made successfully
        </span>

        <button
          onClick={() => {
            window.location.reload();
            toast.dismiss(t.id);
          }}
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          Reload
        </button>
      </div>
    ));
  };

  return (
    <article className="bg-white rounded-2xl shadow-lg p-6">
      {/* Customer Info */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Customer Details</h2>
        <p>
          <span className="font-medium">Name:</span> {buyerName}
        </p>

        <p>
          <span className="font-medium">Phone:</span>
          <a
            href={`tel:+91${phone}`}
            className="text-blue-600 hover:underline active:underline ml-1"
          >
            {phone}
          </a>
        </p>

        <p>
          <span className="font-medium">Email:</span>{" "}
          <a
            href={`mailto:${email}`}
            className="text-blue-600 hover:underline active:underline ml-1"
          >
            {email}
          </a>
        </p>
      </div>

      {/* Divider */}
      <hr className="my-4" />

      {/* Receipt */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Receipt</h3>

        <div className="space-y-3">
          {products.map((item, i) => (
            <OrdersProduct
              key={i}
              productName={item.productName}
              qnty={item.qnty}
              price={item.price}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-lg font-bold text-green-700">Total: ₹{total}</div>

        <button
          className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition"
          onClick={handleDelivery}
        >
          Mark as Delivered
        </button>
      </div>
    </article>
  );
}
