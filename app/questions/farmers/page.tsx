"use client";

import { useRouter } from "next/navigation";

export default function Question1() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted");
    const formData = new FormData(e.currentTarget);
    console.log(Object.fromEntries(formData.entries()));
    router.replace("/farmer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 to-emerald-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Farmer Survey 🌱
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Q1 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              1. What pesticides are you currently using?
            </label>
            <textarea
              placeholder="Eg: Neem oil, Chlorpyrifos..."
              rows={3}
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none resize-none"
              name="pesticides"
              required
            />
          </div>

          {/* Q2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              2. Are you maintaining cleanliness regularly?
            </label>
            <select
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              name="cleanliness"
              required
            >
              <option value="">Select an option</option>
              <option>Yes</option>
              <option>No</option>
              <option>Sometimes</option>
            </select>
          </div>

          {/* Q3 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              3. How much area is used for cultivation?
            </label>
            <input
              type="number"
              placeholder="In acres"
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              name="area"
              required
            />
          </div>

          {/* Q4 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              4. What type of crops are you cultivating?
            </label>
            <input
              type="text"
              placeholder="Eg: Rice, Wheat, Vegetables"
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              name="type"
              required
            />
          </div>

          {/* Q5 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              5. Irrigation method used
            </label>
            <select
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              name="irrigationMethod"
              required
            >
              <option value="">Select method</option>
              <option>Drip Irrigation</option>
              <option>Sprinkler</option>
              <option>Flood Irrigation</option>
              <option>Rain-fed</option>
            </select>
          </div>

          {/* Q6 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              6. How often do you use pesticides?
            </label>
            <select
              className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
              name="repetition"
              required
            >
              <option value="">Select frequency</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Seasonally</option>
              <option>Rarely</option>
            </select>
          </div>

          {/* Q7 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              7. Do you follow organic farming practices?
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" name="organic" value="Yes" required />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="organic" value="No" required />
                No
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-emerald-500 text-white py-3 rounded-xl font-semibold hover:bg-emerald-600 transition"
          >
            Submit ✅
          </button>
        </form>
      </div>
    </div>
  );
}
