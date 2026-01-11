"use client";

import { auth } from "@/app/components/firebase";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ productName?: string }>();
  const productName = params.productName
    ? decodeURIComponent(params.productName)
    : "";

  const [description, setDescription] = useState("");
  const [availableQuantity, setAvailableQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // ✅ Wait for auth properly
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user?.uid ?? null);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      const getData = async () => {
        const res = await axios.post("/api/getProduct", {
          userId,
          productName,
        });
        const data = res.data.productData[0];
        console.log(data);
        if (!data) {
          toast.error("something went wrong");
          router.replace("/farmer");
        }

        setDescription(data.description);
        setAvailableQuantity(data.availableQuantity);
        setPrice(data.price);
      };
      getData();
    }
  }, [userId]);

  const handleSavechanges = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId) return;

    const res = await axios.post("/api/updateProduct", {
      productName,
      description,
      availableQuantity: Number(availableQuantity),
      price: Number(price),
      sellerId: userId,
    });

    if (res.data.success) {
      toast.success("Edited successfully!");
      setDescription("");
      setAvailableQuantity("");
      setPrice("");
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async () => {
    if (!userId) return;

    await axios.post("/api/deleteProduct", {
      productName,
      sellerId: userId,
    });

    toast.success("Product deleted");
    router.replace("/farmer");
  };

  return (
    <div className="bg-linear-to-br from-red-50 via-white to-gray-100 flex justify-center p-6 md:p-12">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <form className="p-8 space-y-6" onSubmit={handleSavechanges}>
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              disabled
              value={productName}
              className="w-full px-5 py-3 rounded-xl border bg-gray-100 font-semibold cursor-not-allowed"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Description
            </label>
            <textarea
              rows={2}
              placeholder="Enter product description..."
              className="w-full px-5 py-3 rounded-xl border
                         focus:ring-2 focus:ring-red-400
                         focus:border-red-400 outline-none resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Quantity (Kg)
            </label>
            <input
              type="number"
              placeholder="50 KG"
              className="w-full px-5 py-3 rounded-xl border
                         focus:ring-2 focus:ring-red-400
                         focus:border-red-400 outline-none"
              value={availableQuantity}
              onChange={(e) => setAvailableQuantity(e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (/Kg)
            </label>
            <input
              type="number"
              placeholder="60 /KG"
              className="w-full px-5 py-3 rounded-xl border
                         focus:ring-2 focus:ring-red-400
                         focus:border-red-400 outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl
                         bg-red-500 text-white font-semibold
                         hover:bg-red-600 transition shadow-md"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="w-full sm:w-auto px-8 py-3 rounded-xl
                         border border-red-200 text-red-600
                         font-semibold hover:bg-red-50 transition"
            >
              Delete Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
