"use client";
import axios from "axios";
import { auth } from "@/app/components/firebase.js";
import toast from "react-hot-toast";

export default function Page() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userId = auth.currentUser?.uid;
    if (!userId) {
      toast.error("Please Login!");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      productName: formData.get("productName"),
      productDescription: formData.get("productDescription"),
      price: formData.get("price"),
      qnty: formData.get("qnty"),
      sellerId: userId,
    };

    try {
      const res = await axios.post("/api/addProduct", data);

      toast.success("Product added successfully!");
      console.log("Success:", res.data);

      form.reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong, buddy!");
    }
  };

  return (
    <div className="bg-linear-to-br from-red-50 via-white to-gray-100 flex justify-center p-6 md:p-12">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Form */}
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              placeholder="Product Name"
              className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
              name="productName"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Description
            </label>
            <textarea
              rows={3}
              placeholder="Enter product description..."
              className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none resize-none"
              name="productDescription"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (/Kg)
            </label>
            <input
              type="number"
              placeholder="60 /kg"
              className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
              name="price"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available Quantity (Kg)
            </label>
            <input
              type="number"
              placeholder="50KG"
              className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
              name="qnty"
              required
            />
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button
              type="submit"
              className="w-full sm:w-auto mb-2 px-8 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition shadow-md"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
