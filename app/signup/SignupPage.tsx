"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/components/firebase.js";
import { updateProfile } from "firebase/auth";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const capitalized = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "";

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  useEffect(() => {
    if (!category) {
      router.push("/");
    }
  }, [category, router]);

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

    if (category != "buyer") {
      const checkUsername = await axios.post("/api/checkUsernameExist", {
        userName: name,
      });

      if (checkUsername?.data.present == false) {
        toast.error("Pls change the Username");
        toast.error("Username already exist!");
      }
    }

    const res = await createUserWithEmailAndPassword(email, password);

    if (res?.user) {
      await updateProfile(res.user, {
        displayName: name,
      });
    }

    await res?.user.reload();

    toast.success("Account created successfully 🎉");

    switch (category) {
      case "farmer":
        router.push("/questions/farmers"); // questions
        break;
      case "officer":
        router.push("/questions/agriofficers"); // questions
        break;
      default:
        router.push("/login?category=buyer"); // login
    }
  };

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
              Full Name (User Name)
            </label>
            <input
              type="text"
              placeholder={`${capitalized}`}
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
              placeholder={`${category}@example.com`}
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
            onClick={() => router.push(`/login?category=${category}`)}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
