"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function OrderPlacedPage() {
  const router = useRouter();

  useEffect(() => {
    // 🎉 Confetti burst
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });

    // second softer burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.6 },
      });
    }, 300);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-slate-100 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center w-full max-w-md animate-fade-in">
        {/* ✅ Tick Animation */}
        <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center animate-pop">
          <svg
            className="w-14 h-14 text-emerald-600 tick-draw"
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

        <h1 className="text-3xl font-bold text-emerald-600 mb-2">
          Order Placed!
        </h1>

        <p className="text-gray-600 mb-6">
          Payment Method:{" "}
          <span className="font-semibold">Cash on Delivery</span>
        </p>

        <button
          onClick={() => router.replace("/buyer")}
          className="w-full py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
        >
          Go to Home
        </button>
      </div>

      {/* Minimal animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pop {
          0% {
            transform: scale(0);
          }
          70% {
            transform: scale(1.15);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes drawTick {
          from {
            stroke-dashoffset: 48;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-pop {
          animation: pop 0.6s ease-out;
        }

        .tick-draw {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: drawTick 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
