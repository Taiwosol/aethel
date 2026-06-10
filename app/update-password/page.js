"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/");
      }
    };
    checkSession();
  }, [supabase.auth, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });
      if (error) throw error;
      setSuccessMessage("Password updated successfully! Redirecting...");
      setTimeout(() => {
        router.push("/collections");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:items-start">
      {/* Left Section */}
      <div className="w-full md:w-1/2 bg-[#1a1a1a] flex flex-col">
        <div className="flex-1 flex items-center justify-center p-0">
          <div className="w-full h-full">
            <img
              src="/login-img.jpg"
              alt="Fashion collection"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="p-8 md:p-12 bg-[#1a1a1a]">
          <p className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-4">
            SPRING COLLECTION 2026
          </p>
          <h2 className="text-5xl md:text-7xl font-light text-white italic">
            The Art of
            <br />
            Subtlety
          </h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 bg-white flex flex-col justify-between p-8 md:p-16 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
        <div className="max-w-md w-full">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
            Update Password
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMessage && (
              <div className="p-3 bg-red-50 text-red-700 text-sm rounded">
                {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="p-3 bg-green-50 text-green-700 text-sm rounded">
                {successMessage}
              </div>
            )}

            <div>
              <label className="block text-xs text-gray-700 tracking-[0.15em] uppercase mb-2">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b-2 border-gray-200 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-700 tracking-[0.15em] uppercase mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border-b-2 border-gray-200 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 text-sm tracking-[0.15em] uppercase hover:bg-gray-900 transition-colors disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Please wait..." : "Update Password"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push("/")}
              className="text-sm text-gray-900 font-semibold hover:underline cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-16 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 AETHEL ALL RIGHTS RESERVED</p>
          <div className="flex gap-8">
            <span>SUPPORT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
