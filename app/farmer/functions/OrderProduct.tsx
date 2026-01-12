import { productProps } from "@/app/buyer/viewOrders/page";

export function OrdersProduct({ productName, qnty, price }: productProps) {
  return (
    <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">
      <div>
        <div className="font-semibold">Product Name: {productName}</div>
        <div className="text-sm text-gray-600">Quantity: {qnty} Kg</div>
      </div>

      <div className="font-semibold text-red-600">₹{price}</div>
    </div>
  );
}
