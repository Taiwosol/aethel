"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("signin"); // 'signin' or 'signup'
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/collections");
      }
    };
    checkUser();
  }, [supabase.auth, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/collections");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        setSuccessMessage("Check your email for verification!");
      }
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
            SPRING COLLECTION 2024
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
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mb-8">
            {mode === "signin"
              ? "Sign in to access your curated collection."
              : "Start your journey with us today."}
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
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-b-2 border-gray-200 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs text-gray-700 tracking-[0.15em] uppercase">
                  Password
                </label>
                {mode === "signin" && (
                  <Link
                    href="#"
                    className="text-xs text-gray-500 hover:text-gray-900"
                  >
                    Forgot?
                  </Link>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-b-2 border-gray-200 py-3 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 text-sm tracking-[0.15em] uppercase hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {loading
                ? "Please wait..."
                : mode === "signin"
                  ? "Sign In"
                  : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {mode === "signin"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                className="text-sm text-gray-900 font-semibold hover:underline"
              >
                {mode === "signin" ? "Create one" : "Sign in"}
              </button>
            </p>
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
