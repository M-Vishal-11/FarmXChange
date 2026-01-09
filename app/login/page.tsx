"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/components/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Handle Submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    console.log({ email, password });
    await signInWithEmailAndPassword(email, password);
  };

  //Login Status
  useEffect(() => {
    if (user) {
      toast.success("Login successful 🎉");
      console.log(user);
      // router.push("/dashboard");
    }
  }, [user, router]);

  // ✅ Handle errors
  useEffect(() => {
    if (!error) return;

    switch (error.code) {
      case "auth/user-not-found":
        toast.error("User not found");
        break;
      case "auth/wrong-password":
        toast.error("Incorrect password");
        break;
      case "auth/invalid-credential":
        toast.error("Invalid email or password");
        break;
      default:
        toast.error(error.message);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-700 via-green-600 to-emerald-500 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-8 border border-green-200">
        {/* Title */}
        <h1 className="text-3xl font-bold text-green-800 text-center mb-2">
          Welcome Back 🌾
        </h1>
        <p className="text-green-700 text-center mb-8">
          Login to continue farming smarter
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-green-800 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="farmer@example.com"
              className="w-full px-4 py-3 rounded-xl border border-green-300 outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-green-800 text-sm mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-green-300 outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`
    w-full py-3 rounded-xl text-white font-semibold shadow-lg
    bg-linear-to-r from-green-600 to-emerald-500
    transition-all
    ${
      loading
        ? "opacity-60 cursor-not-allowed"
        : "hover:scale-[1.02] active:scale-95"
    }
  `}
          >
            {loading ? "Loggin in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-green-700 text-sm mt-6">
          Don&apos;t have an account?{" "}
          <button
            className="underline hover:text-green-900"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
