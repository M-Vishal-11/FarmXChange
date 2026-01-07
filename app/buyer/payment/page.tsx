"use client";

import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-3xl shadow-xl p-10 text-center animate-fadeIn">
        {/* Tick Animation */}
        <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-scaleUp">
          <svg
            className="w-14 h-14 text-green-600 animate-drawTick"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-6">
          Payment Method:{" "}
          <span className="font-semibold">Cash on Delivery</span>
        </p>

        <button
          className="mt-4 px-6 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          onClick={() => router.replace("/buyer")}
        >
          Go to Home
        </button>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleUp {
          0% {
            transform: scale(0);
          }
          70% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes drawTick {
          0% {
            stroke-dasharray: 50;
            stroke-dashoffset: 50;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-scaleUp {
          animation: scaleUp 0.6s ease-out;
        }

        .animate-drawTick {
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
          animation: drawTick 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
