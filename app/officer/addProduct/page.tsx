"use client";

export default function Page() {
  return (
    <div className="bg-linear-to-br from-red-50 via-white to-gray-100 flex justify-center p-6 md:p-12">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Form */}
        <div className="p-8 space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              placeholder="Product Name"
              className="w-full px-5 py-3 rounded-xl border focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
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
            />
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <button className="w-full sm:w-auto mb-2 px-8 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition shadow-md">
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
