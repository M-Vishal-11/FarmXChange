export function OrdersProduct() {
  return (
    <div className="flex justify-between items-center bg-gray-100 rounded-xl p-4">
      <div>
        <div className="font-semibold">Product Name: Tomatoes</div>
        <div className="text-sm text-gray-600">Quantity: 10 Kg</div>
      </div>

      <div className="font-semibold text-red-600">₹100</div>
    </div>
  );
}
