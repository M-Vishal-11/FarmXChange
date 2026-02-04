export default function SeedCartItem({
  name,
  price,
  quantity,
  sellerName,
  onIncrease,
  onDecrease,
}: {
  name: string;
  price: number;
  quantity: number;
  sellerName: string;
  onIncrease: () => void;
  onDecrease: () => void;
}) {
  return (
    <div className="flex items-center gap-6 bg-white rounded-2xl shadow-md p-5">
      <div className="h-20 w-20 bg-green-200 rounded-xl" />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">
          {name}
          <span className="text-sm text-gray-500"> ({sellerName})</span>
        </h3>
        <p className="text-gray-600">₹{price} / Kg</p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          −
        </button>

        <span className="font-semibold">{quantity}</span>

        <button
          onClick={onIncrease}
          className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <div className="font-semibold">₹{price * quantity}</div>
    </div>
  );
}
