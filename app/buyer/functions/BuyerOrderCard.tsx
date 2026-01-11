import { OrdersProduct } from "@/app/farmer/functions/OrderProduct";

export function ViewOrderCard() {
  return (
    <article className="bg-white rounded-2xl shadow-md p-6">
      {/* Seller Info */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">Seller Details</h2>
        <p>
          <span className="font-medium">Name:</span> Suresh Patel
        </p>
        <p>
          <span className="font-medium">Phone:</span> 9123456789
        </p>
      </div>

      {/* Divider */}
      <hr className="my-4" />

      {/* Receipt */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Receipt</h3>

        <div className="space-y-3">
          <OrdersProduct />
          <OrdersProduct />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6">
        <p className="text-lg font-bold text-green-700">Total Paid: ₹200</p>

        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
          Getting Ready
        </span>
      </div>
    </article>
  );
}
