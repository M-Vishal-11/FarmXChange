import { OrderCard } from "../functions/OrderCard";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Orders Received 📦</h1>

      <div className="space-y-6">
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  );
}
