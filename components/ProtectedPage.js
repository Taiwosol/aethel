"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export function ProtectedPage({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="px-6 py-16 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600 mb-8">
            Please sign in to access this page.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-800"
          >
            Sign In
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return <>{children}</>;
}
