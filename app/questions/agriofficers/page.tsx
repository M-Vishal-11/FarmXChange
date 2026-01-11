"use client";

import { auth } from "@/app/components/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AgriOfficerSurvey() {
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = auth.currentUser;

    if (!user) {
      alert("Please login first");
      return;
    }

    const res = axios.post("/api/addSeller", {
      displayName: user?.displayName,
      email: user?.email,
      uid: user?.uid,
      description: formData.get("description"),
      phone: formData.get("phone"),
    });
    console.log((await res)?.data);

    router.replace("/officer/addProduct");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 to-emerald-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Agricultural Officer Survey 🧑‍🌾📋
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Q1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1. Officer designation
            </label>
            <input
              type="text"
              placeholder="Eg: Assistant Agricultural Officer"
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              name="designation"
              required
            />
          </div>

          {/* Q2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2. Area under your supervision
            </label>
            <input
              type="number"
              placeholder="In villages / acres"
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              name="area"
              required
            />
          </div>

          {/* Q3 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              3. How frequently do you inspect farms?
            </label>
            <select
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              name="repetition"
              required
            >
              <option>Select frequency</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
              <option>Seasonally</option>
            </select>
          </div>

          {/* Q4 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              4. Major issues observed in farms
            </label>
            <textarea
              rows={3}
              placeholder="Pest attack, water shortage, soil issues..."
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
              name="issues"
              required
            />
          </div>

          {/* Q5 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              5. Do farmers follow recommended pesticide usage?
            </label>
            <select
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              name="followingRules"
              required
            >
              <option>Select an option</option>
              <option>Yes</option>
              <option>No</option>
              <option>Partially</option>
            </select>
          </div>

          {/* Q6 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              6. Are farmers aware of organic farming practices?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="organicAwareness"
                  value="Yes"
                  required
                />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="organicAwareness"
                  value="No"
                  required
                />
                No
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="organicAwareness"
                  value="somewhat"
                  required
                />
                Somewhat
              </label>
            </div>
          </div>

          {/* Q7 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              7. Suggestions to improve agricultural practices
            </label>
            <textarea
              rows={3}
              placeholder="Training, subsidies, awareness programs..."
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
              name="suggestions"
              required
            />
          </div>

          {/* Q8 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              8. Briefly describe yourself
            </label>
            <input
              type="text"
              placeholder="Describe yourself"
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              name="description"
              required
            />
          </div>

          {/* Q9 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              9. Enter your Phone number
            </label>
            <input
              type="tel"
              placeholder="+91"
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              name="phone"
              required
            />
          </div>

          {/* Submit */}
          <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition">
            Submit Report ✅
          </button>
        </form>
      </div>
    </div>
  );
}
