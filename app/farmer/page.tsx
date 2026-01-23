"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import FarmCard from "./functions/FarmCard";
import { auth } from "../components/firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

type ProductProps = {
  productName: string;
  description: string;
  availableQuantity: number;
  price: number;
  displayName: string;
};

type WeatherProps = {
  temp: number;
  humidity: number;
  condition: string;
};

export default function FarmerHome() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(true);

  // 🌤 Weather state
  const [weather, setWeather] = useState<WeatherProps | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // 🔐 Auth + products
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user?.displayName) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post("/api/getProducts", {
          decodedName: user.displayName,
        });

        const data = res.data?.productsData ?? [];

        if (data.length === 0) {
          toast.error("No products found!");
        }

        setProducts(data);
      } catch (error) {
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🌤 Weather fetch (Chennai)
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Chennai,IN&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`,
        );

        setWeather({
          temp: res.data.main.temp,
          humidity: res.data.main.humidity,
          condition: res.data.weather[0].description,
        });
      } catch (err) {
        console.error("Weather fetch failed");
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // 🔍 Search filter
  const filteredProducts = useMemo(() => {
    const value = searchVal.trim().toLowerCase();
    if (!value) return products;

    return products.filter((product) =>
      product.productName.toLowerCase().includes(value),
    );
  }, [searchVal, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search + Weather */}
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-5 py-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
            />
          </div>

          {/* Weather */}
          <div className="bg-white border rounded-xl shadow-sm p-4 flex flex-col justify-center">
            {weatherLoading ? (
              <p className="text-center text-sm text-gray-500">
                Loading climate...
              </p>
            ) : weather ? (
              <>
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  🌤️ Chennai
                </p>

                <div className="text-xs text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Temp:</span> {weather.temp}°C
                  </p>
                  <p className="capitalize">
                    <span className="font-medium">Condition:</span>{" "}
                    {weather.condition}
                  </p>
                  <p>
                    <span className="font-medium">Humidity:</span>{" "}
                    {weather.humidity}%
                  </p>
                </div>
              </>
            ) : (
              <p className="text-center text-sm text-gray-500">
                Weather unavailable
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-10 text-gray-500">Loading products...</p>
      )}

      {/* Empty */}
      {!loading && filteredProducts.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No matching products found
        </p>
      )}

      {/* Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
        {filteredProducts.map((p) => (
          <FarmCard
            key={p.productName}
            name={p.productName}
            description={p.description}
            quantity={p.availableQuantity}
            price={p.price}
          />
        ))}
      </div>
    </div>
  );
}
