import { OrdersProduct } from "./OrderProduct";

export function OrderCard() {
  return (
    <article className="bg-white rounded-2xl shadow-lg p-6">
      {/* Customer Info */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-1">Customer Details</h2>
        <p>
          <span className="font-medium">Name:</span> Ramesh Kumar
        </p>
        <p>
          <span className="font-medium">Phone:</span> 9876543210
        </p>
        <p>
          <span className="font-medium">Address:</span> Chennai, Tamil Nadu
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
        <div className="text-lg font-bold text-green-700">Total: ₹200</div>

        <button className="px-5 py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
          Mark as Delivered
        </button>
      </div>
    </article>
  );
}
