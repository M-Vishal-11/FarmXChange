"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/components/firebase.js";
import { updateProfile } from "firebase/auth";

export default function SignUpPage() {
  const router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || user) return;

    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    console.log({ name, email, password });

    const res = await createUserWithEmailAndPassword(email, password);

    if (res?.user) {
      await updateProfile(res.user, {
        displayName: name,
      });
    }

    await res?.user.reload();

    console.log(res);
    toast.success("Account created successfully 🎉");
    router.push("/login"); // or dashboard
  };

  useEffect(() => {
    if (!error) return;

    switch (error.code) {
      case "auth/email-already-in-use":
        toast.error("User already exists");
        break;

      case "auth/weak-password":
        toast.error("Password is too weak");
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
          Create Account 🌾
        </h1>
        <p className="text-green-700 text-center mb-8">
          Helping farmers grow smarter
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-green-800 text-sm mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Farmer Name"
              className="w-full px-4 py-3 rounded-xl border border-green-300 outline-none focus:ring-2 focus:ring-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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

          {/* Confirm Password */}
          <div>
            <label className="block text-green-800 text-sm mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-green-300 outline-none focus:ring-2 focus:ring-green-500"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-linear-to-r from-green-600 to-emerald-500
             text-white font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-green-700 text-sm mt-6">
          Already have an account?{" "}
          <button
            className="underline hover:text-green-900"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
