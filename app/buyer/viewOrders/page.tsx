import { ViewOrderCard } from "../functions/BuyerOrderCard";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">My Order 📦</h1>

      <div className="space-y-6 max-w-2xl mx-auto">
        <ViewOrderCard />
      </div>
    </div>
  );
}
