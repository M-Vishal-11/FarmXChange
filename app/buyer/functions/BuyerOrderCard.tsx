import { OrdersProduct } from "@/app/farmer/functions/OrderProduct";
import { farmerProps } from "../viewOrders/page";
import { useMemo } from "react";

export function ViewOrderCard({
  farmerName,
  products,
  phone,
  email,
}: farmerProps) {
  const total = useMemo(
    () => products.reduce((sum, item) => sum + item.price * item.qnty, 0),
    [products]
  );

  return (
    <article className="bg-white rounded-2xl shadow-md p-6">
      {/* Seller Info */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">Seller Details</h2>
        <p>
          <span className="font-medium">Name:</span> {farmerName}
        </p>

        <p>
          <span className="font-medium">Phone:</span>
          <a
            href={`tel:+91${phone}`}
            className="text-blue-600 hover:underline active:underline"
          >
            {phone}
          </a>
        </p>

        <p>
          <span className="font-medium">Email:</span>{" "}
          <a
            href={`mailto:${email}`}
            className="text-blue-600 hover:underline active:underline"
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
        <p className="text-lg font-bold text-green-700">Total Paid: ₹{total}</p>

        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
          Preparing
        </span>
      </div>
    </article>
  );
}
