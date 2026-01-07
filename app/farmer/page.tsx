import FarmCard from "./functions/FarmCard";

export default function FarmerHome() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="flex justify-center mt-10">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full max-w-xl px-5 py-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
        <FarmCard
          name="Tomatoes"
          description="Pure organic tomatoes with no chemicals"
          quantity={50}
        />
        <FarmCard
          name="Potatoes"
          description="Farm fresh potatoes, naturally grown"
          quantity={80}
        />
        <FarmCard
          name="Potatoes"
          description="Farm fresh potatoes, naturally grown"
          quantity={80}
        />
        <FarmCard
          name="Potatoes"
          description="Farm fresh potatoes, naturally grown"
          quantity={80}
        />
      </div>
    </div>
  );
}
