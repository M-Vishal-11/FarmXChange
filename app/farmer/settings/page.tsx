"use client";

import { auth } from "@/app/components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  deleteUser,
  updateProfile,
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [description, setDescription] = useState("");

  // 🔄 Load existing user data
  useEffect(() => {
    if (user) {
      setUserName(user.displayName ?? "");
      setEmail(user.email ?? "");
    }
  }, [user]);

  //Not Authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?category=farmer");
    }
  }, [user, loading, router]);

  //Description
  useEffect(() => {
    const getDescription = async () => {
      const res = await axios.post("/api/getDescriptionSeller", { userName });
      setDescription(res?.data.description);
    };
    getDescription();
  }, [userName]);

  // 🔐 Re-authentication (required for sensitive actions)
  const reAuthenticate = async () => {
    if (!user || !user.email) return;

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    await reauthenticateWithCredential(user, credential);
  };

  // 👤 Update username
  const handleUpdateName = async () => {
    if (!user) return;

    await updateProfile(user, { displayName: userName });
    await user.reload();

    toast.success("Username updated ✅");
  };

  // ✉️ Update email
  const handleUpdateEmail = async () => {
    if (!user) return;

    try {
      await reAuthenticate();
      await updateEmail(user, email);
      toast.success("Email updated ✅");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 🔑 Update password
  const handleUpdatePassword = async () => {
    if (!user) return;

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await reAuthenticate();
      await updatePassword(user, newPassword);
      toast.success("Password updated 🔐");
      setNewPassword("");
      setCurrentPassword("");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  //Logout account
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully 👋");
      router.push("/login?category=farmer");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // 🗑️ Delete account
  const handleDeleteAccount = async () => {
    if (!user) return;

    toast(
      (t) => (
        <div className="space-y-3">
          <p className="font-semibold text-red-600">
            ⚠️ Delete account permanently?
          </p>
          <p className="text-sm text-gray-600">This action cannot be undone.</p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 rounded-lg border"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                toast.dismiss(t.id);

                try {
                  await deleteUser(user);
                  toast.success("Account deleted 🗑️");
                  router.push("/signup");
                } catch (err: any) {
                  if (err.code === "auth/requires-recent-login") {
                    toast.error("Please login again");
                    router.push("/login");
                  } else {
                    toast.error(err.message);
                  }
                }
              }}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: 6000 }
    );
  };

  //Update description
  const handleDescription = async () => {
    console.log("hello");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-14 mb-20 px-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Account Settings ⚙️
        </h1>

        {/* Username */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-gray-600">Username</label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3
                   outline-none focus:ring-2 focus:ring-green-500
                   transition"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button
            onClick={handleUpdateName}
            className="w-full py-3 rounded-xl
                   bg-green-600 text-white font-semibold
                   hover:bg-green-700 active:scale-95
                   transition"
          >
            Update Username
          </button>
        </section>

        {/* Description */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-gray-600">
            description
          </label>
          <textarea
            className="w-full rounded-xl border border-gray-300 px-4 py-3
             outline-none focus:ring-2 focus:ring-green-500
             transition resize-none"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button
            onClick={handleDescription}
            className="w-full py-3 rounded-xl
                   bg-lime-600 text-white font-semibold
                   hover:bg-lime-700 active:scale-95
                   transition"
          >
            Update Description
          </button>
        </section>

        <hr className="border-gray-200" />

        {/* Email */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3
                   outline-none focus:ring-2 focus:ring-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3
                   outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Current password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            onClick={handleUpdateEmail}
            className="w-full py-3 rounded-xl
                   bg-blue-600 text-white font-semibold
                   hover:bg-blue-700 active:scale-95
                   transition"
          >
            Update Email
          </button>
        </section>

        <hr className="border-gray-200" />

        {/* Password */}
        <section className="space-y-3">
          <label className="text-sm font-medium text-gray-600">
            Change Password
          </label>
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3
                   outline-none focus:ring-2 focus:ring-green-500"
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="w-full rounded-xl border border-gray-300 px-4 py-3
                   outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Current password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            onClick={handleUpdatePassword}
            className="w-full py-3 rounded-xl
                   bg-purple-600 text-white font-semibold
                   hover:bg-purple-700 active:scale-95
                   transition"
          >
            Update Password
          </button>
        </section>

        <hr className="border-gray-200" />

        {/* Logout */}
        <section className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl
               bg-gray-100 text-gray-800 font-semibold
               hover:bg-gray-200 active:scale-95
               transition"
          >
            Logout
          </button>
        </section>

        <hr className="border-gray-200" />

        {/* Delete */}
        <section className="space-y-3">
          <p className="text-sm text-red-600 font-medium">Danger Zone</p>
          <button
            onClick={handleDeleteAccount}
            className="w-full py-3 rounded-xl
                   bg-red-600 text-white font-semibold
                   hover:bg-red-700 active:scale-95
                   transition shadow-md"
          >
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}
