"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Send,
  Image as ImageIcon,
  Paperclip,
  ShieldCheck,
  Phone,
  Circle,
} from "lucide-react";

type Officer = {
  id: string;
  name: string;
  role: string;
  district: string;
  avatar: string;
  online: boolean;
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

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const officerId = searchParams.get("officerId") || "off1";

  // ✅ replace with API later
  const officers: Officer[] = [
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
  ];

  const officer = useMemo(
    () => officers.find((o) => o.id === officerId) || officers[0],
    [officerId],
  );

  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "m1",
      from: "officer",
      text: "Hi! Tell me your crop name, age (days), and what issue you’re facing 😊",
      time: "09:12",
    },
    {
      id: "m2",
      from: "farmer",
      text: "Tomato crop, 35 days. Leaves are curling and small insects seen.",
      time: "09:13",
    },
    {
      id: "m3",
      from: "officer",
      text: "Okay. Please share a clear photo of the leaf + insect if possible.",
      time: "09:14",
    },
  ]);

  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const t = text.trim();
    if (!t) return;

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), from: "farmer", text: t, time: nowTime() },
    ]);
    setText("");

    // ✅ demo auto-reply (remove after backend)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          from: "officer",
          text: "Noted. Please confirm: any yellowing? Also tell last pesticide/fertilizer used.",
          time: nowTime(),
        },
      ]);
    }, 700);
  };

  const quickSend = (q: string) => {
    setText(q);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-6">
        {/* Header */}
        <div className="sticky top-0 z-10 mb-4 rounded-2xl bg-white/80 p-4 shadow-sm ring-1 ring-gray-200 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>

            <div className="flex flex-1 items-center gap-3">
              <div className="relative">
                <img
                  src={officer.avatar}
                  alt={officer.name}
                  className="h-11 w-11 rounded-2xl object-cover ring-2 ring-gray-100"
                />
                <span
                  className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full ring-2 ring-white ${
                    officer.online ? "bg-green-500" : "bg-gray-400"
                  }`}
                  title={officer.online ? "Online" : "Offline"}
                />
              </div>

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
              onClick={() => alert("Call feature later")}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50"
              title="Call (optional feature)"
            >
              <Phone className="h-4 w-4" />
              Call
            </button>
          </div>
        </div>

        {/* Quick prompts */}
        <div className="mb-4 flex flex-wrap gap-2">
          {[
            "Crop: ___, Age: ___ days, Issue: ___",
            "Pest / insect problem",
            "Leaf yellowing / spots",
            "Fertilizer schedule help",
            "Govt scheme enquiry",
          ].map((q) => (
            <button
              key={q}
              onClick={() => quickSend(q)}
              className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Chat area */}
        <div className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200">
          <div className="h-[60vh] overflow-y-auto p-4 sm:p-6">
            <div className="mx-auto max-w-2xl space-y-3">
              {messages.map((m) => {
                const mine = m.from === "farmer";
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
                onClick={() => alert("Attach file later")}
                className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 hover:bg-gray-50"
                title="Attach"
              >
                <Paperclip className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={() => alert("Photo upload later")}
                className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 hover:bg-gray-50"
                title="Photo"
              >
                <ImageIcon className="h-5 w-5" />
              </button>

              <input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Type your message..."
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
              Tip: Send crop name + age + location + clear photo for faster
              help.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
