"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MessageCircle,
  MapPin,
  ShieldCheck,
  Phone,
  Mail,
  Briefcase,
  Star,
} from "lucide-react";

type Officer = {
  id: string;
  name: string;
  role: string;
  district: string;
  avatar: string;
  online: boolean;
  phone?: string;
  email?: string;
  experienceYears?: number;
  specialization?: string[];
  languages?: string[];
  rating?: number; // 0-5
  about?: string;
};

type Review = {
  id: string;
  stars: number; // 1-5
  comment: string;
  createdAt: string;
};

function StarRow({
  value,
  onChange,
  size = 22,
}: {
  value: number;
  onChange: (v: number) => void;
  size?: number;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className="rounded-md p-1 hover:bg-gray-100"
          aria-label={`Rate ${n} stars`}
        >
          <Star
            style={{ width: size, height: size }}
            className={
              n <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function OfficerProfilePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const officerId = Array.isArray(params?.id)
    ? decodeURIComponent(params.id[0])
    : decodeURIComponent(params.id || "");

  // ✅ Replace this with API call later
  const officers: Officer[] = [
    {
      id: "off1",
      name: "Mr. Rajesh Kumar",
      role: "Agriculture Officer",
      district: "Coimbatore",
      avatar:
        "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=400&h=400&fit=crop",
      online: true,
      phone: "+91 98765 43210",
      email: "rajesh.kumar@agri.gov.in",
      experienceYears: 8,
      specialization: ["Pest control", "Crop planning", "Govt schemes"],
      languages: ["Tamil", "English"],
      rating: 4.6,
      about:
        "I help farmers with crop planning, pest management, and practical fertilizer schedules based on season and soil condition.",
    },
    {
      id: "off2",
      name: "Ms. Priya Sharma",
      role: "Horticulture Officer",
      district: "Erode",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
      online: false,
      phone: "+91 91234 56789",
      email: "priya.sharma@agri.gov.in",
      experienceYears: 6,
      specialization: ["Fruits", "Vegetables", "Drip irrigation"],
      languages: ["English", "Hindi"],
      rating: 4.3,
      about:
        "Focused on horticulture best practices: nursery, pruning, drip setups, and disease prevention for fruits & vegetables.",
    },
    {
      id: "off3",
      name: "Mr. Abdul Rahman",
      role: "Soil Specialist",
      district: "Salem",
      avatar:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop",
      online: true,
      phone: "+91 99887 77665",
      email: "abdul.rahman@agri.gov.in",
      experienceYears: 10,
      specialization: ["Soil testing", "NPK scheduling", "pH correction"],
      languages: ["Tamil", "English"],
      rating: 4.8,
      about:
        "I specialize in soil reports, pH correction, nutrient planning, and making fertilizer schedules that reduce cost and improve yield.",
    },
  ];

  const officer = useMemo(
    () => officers.find((o) => o.id === officerId),
    [officerId],
  );

  // ✅ Dummy reviews per officer (later: fetch by officerId)
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "r1",
      stars: 5,
      comment: "Very helpful and quick response.",
      createdAt: "2026-01-10",
    },
    {
      id: "r2",
      stars: 4,
      comment: "Good guidance for fertilizer schedule.",
      createdAt: "2026-01-12",
    },
    {
      id: "r3",
      stars: 5,
      comment: "Solved pest issue in 2 days.",
      createdAt: "2026-01-18",
    },
    {
      id: "r4",
      stars: 3,
      comment: "Reply was a bit late but useful.",
      createdAt: "2026-01-20",
    },
    {
      id: "r5",
      stars: 4,
      comment: "Clear explanation in Tamil.",
      createdAt: "2026-01-22",
    },
  ]);

  // rating input
  const [newStars, setNewStars] = useState<number>(5);
  const [newComment, setNewComment] = useState<string>("");
  const [error, setError] = useState<string>("");

  const breakdown = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<number, number>;
    for (const r of reviews) counts[r.stars]++;

    const total = reviews.length || 1;
    const avg =
      reviews.reduce((sum, r) => sum + r.stars, 0) / (reviews.length || 1);

    return {
      counts,
      total: reviews.length,
      avg,
      pct: (star: number) => Math.round((counts[star] / total) * 100),
    };
  }, [reviews]);

  const submitReview = () => {
    setError("");
    const text = newComment.trim();
    if (text.length < 3) {
      setError("Please write at least 3 characters.");
      return;
    }
    if (newStars < 1 || newStars > 5) {
      setError("Please select a star rating.");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    setReviews((prev) => [
      {
        id: crypto.randomUUID(),
        stars: newStars,
        comment: text,
        createdAt: today,
      },
      ...prev,
    ]);

    setNewComment("");
    setNewStars(5);
  };

  if (!officer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <div className="mt-8 rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-200">
            <p className="text-lg font-semibold text-gray-900">
              Officer not found
            </p>
            <p className="mt-2 text-sm text-gray-600">
              The officer profile you’re looking for doesn’t exist.
            </p>
            <button
              onClick={() => router.push("/farmer/askOfficer")}
              className="mt-5 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
            >
              Go to Officers List
            </button>
          </div>
        </div>
      </div>
    );
  }

  const starsLabel = Math.round((officer.rating ?? 0) * 10) / 10;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Top actions */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <button
            onClick={() => router.push(`/farmer/askOfficer/chat/${officer.id}`)}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-700"
          >
            <MessageCircle className="h-4 w-4" />
            Chat with Officer
          </button>
        </div>

        {/* Profile Card */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left card */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-green-100" />
            <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-emerald-100" />

            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={officer.avatar}
                    alt={officer.name}
                    className="h-20 w-20 rounded-2xl object-cover ring-2 ring-gray-100"
                  />
                  <span
                    className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full ring-2 ring-white ${
                      officer.online ? "bg-green-500" : "bg-gray-400"
                    }`}
                    title={officer.online ? "Online" : "Offline"}
                  />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xl font-bold text-gray-900">
                    {officer.name}
                  </p>
                  <p className="text-sm font-medium text-gray-700">
                    {officer.role}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{officer.district}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-800">
                  <ShieldCheck className="h-4 w-4" />
                  Verified Officer
                </span>

                {!!officer.experienceYears && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-3 py-1 text-sm font-semibold text-gray-800">
                    <Briefcase className="h-4 w-4" />
                    {officer.experienceYears} yrs exp
                  </span>
                )}

                {!!officer.rating && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-800">
                    <Star className="h-4 w-4" />
                    {starsLabel}/5
                  </span>
                )}
              </div>

              <div className="mt-5 space-y-3">
                {officer.phone && (
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                    <Phone className="h-4 w-4 text-gray-700" />
                    <p className="text-sm font-medium text-gray-800">
                      {officer.phone}
                    </p>
                  </div>
                )}

                {officer.email && (
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                    <Mail className="h-4 w-4 text-gray-700" />
                    <p className="text-sm font-medium text-gray-800">
                      {officer.email}
                    </p>
                  </div>
                )}
              </div>

              {!officer.online && (
                <p className="mt-4 text-xs text-gray-500">
                  Officer is offline — you can message now, they’ll reply later.
                </p>
              )}
            </div>
          </div>

          {/* Right content */}
          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-900">About</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              {officer.about ??
                "Officer details will appear here. Add a short bio to build trust with farmers."}
            </p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-200">
                <h3 className="text-sm font-bold text-gray-900">
                  Specializations
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(
                    officer.specialization ?? ["Crop guidance", "Pest control"]
                  ).map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-white px-3 py-1 text-sm text-gray-800 ring-1 ring-gray-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-200">
                <h3 className="text-sm font-bold text-gray-900">Languages</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(officer.languages ?? ["Tamil", "English"]).map((l) => (
                    <span
                      key={l}
                      className="rounded-full bg-white px-3 py-1 text-sm text-gray-800 ring-1 ring-gray-200"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() =>
                  router.push(`/farmer/askOfficer/chat/${officer.id}`)
                }
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4" />
                Start Chat
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500">
              Suggested: Share crop name + age + location + 2 clear photos.
            </div>
          </div>
        </div>

        {/* ✅ Reviews Section */}
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {/* Left: Breakdown */}
          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200">
            <h3 className="text-lg font-bold text-gray-900">Ratings</h3>

            <div className="mt-3 flex items-end justify-between">
              <div>
                <p className="text-3xl font-extrabold text-gray-900">
                  {breakdown.avg.toFixed(1)}
                </p>
                <p className="text-sm text-gray-600">
                  Based on {breakdown.total} review
                  {breakdown.total === 1 ? "" : "s"}
                </p>
              </div>

              <div className="pb-1">
                <StarRow
                  value={Math.round(breakdown.avg)}
                  onChange={() => {}}
                />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[5, 4, 3, 2, 1].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className="w-10 text-sm font-semibold text-gray-700">
                    {s}★
                  </div>

                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full bg-green-600"
                      style={{ width: `${breakdown.pct(s)}%` }}
                    />
                  </div>

                  <div className="w-10 text-right text-sm text-gray-600">
                    {breakdown.counts[s]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Add review + list */}
          <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-200 lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900">Write a review</h3>
            <p className="mt-1 text-sm text-gray-600">
              Give stars and a short comment. This helps other farmers.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Your rating
                </p>
                <StarRow value={newStars} onChange={setNewStars} />
              </div>

              <button
                onClick={submitReview}
                className="rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
              >
                Submit
              </button>
            </div>

            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Example: Clear solution for pest issue, explained in Tamil, worked well..."
              className="mt-4 w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm text-gray-800 outline-none ring-0 focus:border-green-500"
              rows={4}
            />

            {error && (
              <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>
            )}

            {/* Reviews list */}
            <div className="mt-7">
              <h4 className="text-sm font-bold text-gray-900">
                Recent reviews
              </h4>

              <div className="mt-3 space-y-4">
                {reviews.slice(0, 6).map((r) => (
                  <div
                    key={r.id}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={
                              n <= r.stars
                                ? "h-4 w-4 fill-yellow-400 text-yellow-400"
                                : "h-4 w-4 text-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        {r.createdAt}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-gray-700">{r.comment}</p>
                  </div>
                ))}

                {reviews.length === 0 && (
                  <p className="text-sm text-gray-600">
                    No reviews yet. Be the first to review.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
