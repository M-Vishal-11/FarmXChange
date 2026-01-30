"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MessageCircle,
  Send,
  ArrowLeft,
  ShieldCheck,
  Circle,
  Filter,
} from "lucide-react";

type Farmer = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  unread: number;
  lastMsg: string;
  time: string;
  status: "new" | "open" | "resolved";
};

type Msg = {
  id: string;
  from: "farmer" | "officer";
  text: string;
  time: string;
};

function nowTime() {
  const d = new Date();
  const hh = d.getHours().toString().padStart(2, "0");
  const mm = d.getMinutes().toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

export default function OfficerDashboard() {
  const router = useRouter();

  // ✅ Dummy officer profile
  const officer = {
    name: "Officer Priya",
    role: "Horticulture Officer",
    district: "Erode",
    online: true,
  };

  // ✅ Dummy farmers list (replace with API)
  const [farmers, setFarmers] = useState<Farmer[]>([
    {
      id: "f1",
      name: "Karthik",
      location: "Salem",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop",
      unread: 2,
      lastMsg: "Leaves curling, insects seen. What to do?",
      time: "09:13",
      status: "new",
    },
    {
      id: "f2",
      name: "Sathish",
      location: "Erode",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
      unread: 0,
      lastMsg: "Need fertilizer plan for tomato 30 days.",
      time: "Yesterday",
      status: "open",
    },
    {
      id: "f3",
      name: "Divya",
      location: "Coimbatore",
      avatar:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=200&h=200&fit=crop",
      unread: 1,
      lastMsg: "Yellow spots on leaves, can you check?",
      time: "08:40",
      status: "open",
    },
    {
      id: "f4",
      name: "Mohan",
      location: "Namakkal",
      avatar:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop",
      unread: 0,
      lastMsg: "Thanks! Problem solved 👍",
      time: "Mon",
      status: "resolved",
    },
  ]);

  const [activeFarmerId, setActiveFarmerId] = useState<string>("f1");
  const activeFarmer = useMemo(
    () => farmers.find((f) => f.id === activeFarmerId) || farmers[0],
    [farmers, activeFarmerId],
  );

  // ✅ Dummy chat messages per farmer (replace with API store)
  const [messages, setMessages] = useState<Record<string, Msg[]>>({
    f1: [
      {
        id: "m1",
        from: "farmer",
        text: "Tomato crop 35 days. Leaves curling.",
        time: "09:12",
      },
      { id: "m2", from: "farmer", text: "Small insects also.", time: "09:13" },
      {
        id: "m3",
        from: "officer",
        text: "Please share a clear photo of leaf + insect.",
        time: "09:14",
      },
    ],
    f2: [
      {
        id: "m1",
        from: "farmer",
        text: "Need fertilizer plan for tomato 30 days.",
        time: "Yesterday",
      },
      {
        id: "m2",
        from: "officer",
        text: "Send soil test (if any) + current fertilizer used.",
        time: "Yesterday",
      },
    ],
    f3: [
      {
        id: "m1",
        from: "farmer",
        text: "Yellow spots on leaves. Please help.",
        time: "08:40",
      },
    ],
    f4: [
      {
        id: "m1",
        from: "farmer",
        text: "Thanks! Problem solved 👍",
        time: "Mon",
      },
      {
        id: "m2",
        from: "officer",
        text: "Happy to help. Keep monitoring weekly.",
        time: "Mon",
      },
    ],
  });

  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Farmer["status"]>(
    "all",
  );
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeFarmerId, messages]);

  const filteredFarmers = useMemo(() => {
    const s = search.trim().toLowerCase();
    return farmers.filter((f) => {
      const matchesText =
        !s ||
        f.name.toLowerCase().includes(s) ||
        f.location.toLowerCase().includes(s) ||
        f.lastMsg.toLowerCase().includes(s);

      const matchesStatus =
        statusFilter === "all" ? true : f.status === statusFilter;
      return matchesText && matchesStatus;
    });
  }, [farmers, search, statusFilter]);

  const openChat = (id: string) => {
    setActiveFarmerId(id);
    // set unread to 0
    setFarmers((prev) =>
      prev.map((f) => (f.id === id ? { ...f, unread: 0 } : f)),
    );
  };

  const send = () => {
    const t = text.trim();
    if (!t) return;

    const msg: Msg = {
      id: crypto.randomUUID(),
      from: "officer",
      text: t,
      time: nowTime(),
    };
    setMessages((prev) => ({
      ...prev,
      [activeFarmerId]: [...(prev[activeFarmerId] || []), msg],
    }));
    setText("");
  };

  const setFarmerStatus = (status: Farmer["status"]) => {
    setFarmers((prev) =>
      prev.map((f) => (f.id === activeFarmerId ? { ...f, status } : f)),
    );
  };

  const statusPill = (s: Farmer["status"]) => {
    const base = "rounded-full px-2.5 py-1 text-xs font-semibold ring-1";
    if (s === "new") return `${base} bg-green-50 text-green-700 ring-green-200`;
    if (s === "open") return `${base} bg-blue-50 text-blue-700 ring-blue-200`;
    return `${base} bg-gray-50 text-gray-700 ring-gray-200`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Top bar */}
        <div className="mb-5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <div className="flex items-center gap-3">
              <div className="min-w-0">
                <p className="truncate text-base font-bold text-gray-900">
                  {officer.name}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600">
                  <span>{officer.role}</span>
                  <span className="text-gray-300">•</span>
                  <span>{officer.district}</span>
                  <span className="text-gray-300">•</span>
                  <span className="inline-flex items-center gap-1">
                    <Circle
                      className={`h-2.5 w-2.5 ${
                        officer.online ? "text-green-600" : "text-gray-400"
                      }`}
                      fill="currentColor"
                    />
                    {officer.online ? "Online" : "Offline"}
                  </span>
                  <span className="text-gray-300">•</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 font-semibold text-green-700">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert("Logout later")}
              className="rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left: farmers list */}
          <div className="rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gray-200">
            <div className="flex items-center justify-between gap-2">
              <p className="text-lg font-bold text-gray-900">Farmer Chats</p>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="w-40 rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-green-500"
                  />
                </div>

                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="rounded-xl border border-gray-200 bg-white py-2 pl-9 pr-8 text-sm outline-none focus:border-green-500"
                  >
                    <option value="all">All</option>
                    <option value="new">New</option>
                    <option value="open">Open</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {filteredFarmers.map((f) => {
                const active = f.id === activeFarmerId;
                return (
                  <button
                    key={f.id}
                    onClick={() => openChat(f.id)}
                    className={`w-full rounded-2xl p-3 text-left transition ${
                      active
                        ? "bg-green-50 ring-1 ring-green-200"
                        : "hover:bg-gray-50 ring-1 ring-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={f.avatar}
                        alt={f.name}
                        className="h-11 w-11 rounded-2xl object-cover ring-2 ring-gray-100"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="truncate text-sm font-bold text-gray-900">
                            {f.name}
                          </p>
                          <span className="text-xs text-gray-500">
                            {f.time}
                          </span>
                        </div>

                        <p className="truncate text-xs text-gray-600">
                          {f.location} • {f.lastMsg}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <span className={statusPill(f.status)}>
                            {f.status}
                          </span>

                          {f.unread > 0 && (
                            <span className="inline-flex h-6 min-w-[24px] items-center justify-center rounded-full bg-green-600 px-2 text-xs font-bold text-white">
                              {f.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}

              {filteredFarmers.length === 0 && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
                  No chats found.
                </div>
              )}
            </div>
          </div>

          {/* Right: chat */}
          <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 lg:col-span-2">
            {/* Chat header */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={activeFarmer.avatar}
                  alt={activeFarmer.name}
                  className="h-11 w-11 rounded-2xl object-cover ring-2 ring-gray-100"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-900">
                    {activeFarmer.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    {activeFarmer.location}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setFarmerStatus("open")}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  Mark Open
                </button>
                <button
                  onClick={() => setFarmerStatus("resolved")}
                  className="rounded-xl bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                >
                  Mark Resolved
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[60vh] overflow-y-auto p-4 sm:p-6">
              <div className="mx-auto max-w-2xl space-y-3">
                {(messages[activeFarmerId] || []).map((m) => {
                  const mine = m.from === "officer";
                  return (
                    <div
                      key={m.id}
                      className={`flex ${mine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          mine
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{m.text}</p>
                        <div
                          className={`mt-1 text-[11px] ${
                            mine ? "text-green-50/90" : "text-gray-500"
                          }`}
                        >
                          {m.time}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={endRef} />
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-3 sm:p-4">
              <div className="mx-auto flex max-w-2xl items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert("Quick templates later")}
                  className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 hover:bg-gray-50"
                  title="Templates"
                >
                  <MessageCircle className="h-5 w-5" />
                </button>

                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                  }}
                  placeholder="Type reply..."
                  className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:border-green-500"
                />

                <button
                  onClick={send}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white hover:bg-green-700"
                >
                  <Send className="h-4 w-4" />
                  Send
                </button>
              </div>

              <p className="mx-auto mt-2 max-w-2xl text-xs text-gray-500">
                Keep replies short and actionable. Ask for crop name + age +
                location + clear photo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
