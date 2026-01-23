"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Card } from "./functions/Card";

type CardProps = {
  displayName: string;
  description: string;
};

type WeatherProps = {
  temp: number;
  humidity: number;
  condition: string;
};

export default function BuyerHome() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchVal, setSearchVal] = useState("");

  // 🌤 Weather state
  const [weather, setWeather] = useState<WeatherProps | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // 👨‍🌾 Sellers fetch
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/getSellers");
        setCards(res.data?.sellers ?? []);
      } catch (err) {
        setError("Failed to load sellers");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  // 🌤 Weather fetch
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=Chennai&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`,
        );

        setWeather({
          temp: res.data.main.temp,
          humidity: res.data.main.humidity,
          condition: res.data.weather[0].description,
        });
      } catch (err: any) {
        console.error(
          "Weather fetch failed:",
          err?.response?.data || err.message,
        );
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // 🔍 Search filter
  const filteredCards = useMemo(() => {
    const value = searchVal.trim().toLowerCase();
    if (!value) return cards;

    return cards.filter((card) =>
      card.displayName.toLowerCase().includes(value),
    );
  }, [cards, searchVal]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">Loading sellers...</p>
    );
  }

  if (error) {
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search + Weather */}
      <div className="flex justify-center mt-10 px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search farmers / officers..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="w-full px-5 py-3 rounded-full border shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
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

      {/* Empty State */}
      {filteredCards.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No matching sellers found
        </p>
      )}

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
        {filteredCards.map((item) => (
          <Card
            key={item.displayName}
            farmerName={item.displayName}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
