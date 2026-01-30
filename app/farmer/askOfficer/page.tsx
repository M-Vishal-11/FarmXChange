"use client";
import { MessageCircle, Headset, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function AskOfficer() {
  const router = useRouter();

  // ✅ Dummy officers (replace with your API data)
  const officers = [
    {
      id: "off1",
      name: "Mr. Rajesh Kumar",
      role: "Agriculture Officer",
      district: "Coimbatore",
      avatar:
        "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=200&h=200&fit=crop",
      online: true,
    },
    {
      id: "off2",
      name: "Ms. Priya Sharma",
      role: "Horticulture Officer",
      district: "Erode",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop",
      online: false,
    },
    {
      id: "off3",
      name: "Mr. Abdul Rahman",
      role: "Soil Specialist",
      district: "Salem",
      avatar:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop",
      online: true,
    },
    {
      id: "off4",
      name: "Mr. Abdul Rahman",
      role: "Soil Specialist",
      district: "Salem",
      avatar:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&h=200&fit=crop",
      online: true,
    },
  ];

  const officersRef = useRef<HTMLDivElement | null>(null);

  const goToOfficers = () => {
    officersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Ask Officer</h1>
          <p className="mt-2 text-gray-600">
            Get quick guidance on crops, pests, soil, fertilizers, schemes, and
            orders.
          </p>
        </div>

        {/* Main Card */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: Illustration */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-100" />
            <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-emerald-100" />

            <div className="relative">
              <div className="flex items-center gap-2 text-green-700">
                <Headset className="h-5 w-5" />
                <span className="text-sm font-semibold">Officer Support</span>
              </div>

              {/* Image placeholder */}
              <div className="mt-5 flex h-56 items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
                <span className="text-sm text-gray-500">
                  Add image / illustration here
                </span>
              </div>

              <div className="mt-5 rounded-xl bg-green-50 p-4 text-sm text-green-900">
                Tip: Include clear photos + location + crop stage to get faster
                answers.
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-green-100 p-3">
                <MessageCircle className="h-6 w-6 text-green-700" />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Chat with Agriculture Officer
                </h2>
                <p className="mt-2 text-gray-600">
                  Ask anything related to farming. You&apos;ll get actionable
                  steps, not long theory.
                </p>
              </div>
            </div>

            {/* Quick Topics */}
            <div className="mt-6">
              <p className="text-sm font-semibold text-gray-800">
                Popular topics
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Pest control",
                  "Fertilizer plan",
                  "Disease symptoms",
                  "Soil testing",
                  "Weather impact",
                  "Govt schemes",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm text-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={goToOfficers}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white shadow-md transition hover:bg-green-700"
              >
                Start Chat
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                onClick={goToOfficers}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 font-semibold text-gray-800 transition hover:bg-gray-50"
              >
                Share a Photo
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Available hours: 9 AM – 6 PM (Mon–Sat). If offline, we’ll notify
              when a reply arrives.
            </div>
          </div>
        </div>

        {/* ✅ Officers List */}
        <div ref={officersRef} className="mt-10 scroll-mt-24">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h3 className="text-xl font-bold text-gray-900">
              Available Officers
            </h3>
            <p className="text-sm text-gray-600">
              Choose one officer to chat directly
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {officers.map((o) => (
              <div
                key={o.id}
                className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-200 transition hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={o.avatar}
                      alt={o.name}
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-100"
                    />
                    <span
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-white ${
                        o.online ? "bg-green-500" : "bg-gray-400"
                      }`}
                      title={o.online ? "Online" : "Offline"}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-gray-900">
                      {o.name}
                    </p>
                    <p className="text-sm text-gray-600">{o.role}</p>
                    <p className="text-xs text-gray-500">{o.district}</p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() =>
                      router.push(`/farmer/askOfficer/chat/${o.id}`)
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat with me
                  </button>

                  <button
                    onClick={() =>
                      router.push(`/farmer/askOfficer/profile/${o.id}`)
                    }
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-800 transition hover:bg-gray-50"
                  >
                    View
                  </button>
                </div>

                {!o.online && (
                  <p className="mt-3 text-xs text-gray-500">
                    Officer is offline — you can still message, they’ll reply
                    later.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
