"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProtectedPage } from "@/components/ProtectedPage";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (user) {
      setName(user.user_metadata?.full_name || "");
    }
  }, [user]);

  const handleUpdateName = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: name },
      });

      if (error) throw error;

      setEditingName(false);
      setMessage("Name updated successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setMessageType("error");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      setNewPassword("");
      setConfirmPassword("");
      setMessage("Password updated successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/");
    } catch (error) {
      setMessage(error.message);
      setMessageType("error");
      setLoading(false);
    }
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-[#fafafa]">
        <Navigation />

        <main className="px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-light italic text-gray-900 mb-4">
              Welcome Back, {user?.user_metadata?.full_name || "User"}
            </h1>
            <p className="text-sm tracking-[0.15em] uppercase text-gray-500 mb-8">
              MY PROFILE
            </p>

            {message && (
              <div
                className={`mb-6 p-4 rounded ${
                  messageType === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message}
              </div>
            )}

            <div className="space-y-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-light tracking-[0.05em] text-gray-900 mb-4">
                  Account Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{user?.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Name
                    </label>
                    {editingName ? (
                      <form onSubmit={handleUpdateName} className="flex gap-3">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                          placeholder="Enter your name"
                        />
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-80 disabled:opacity-50 cursor-pointer"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingName(false);
                            setName(user?.user_metadata?.full_name || "");
                          }}
                          className="px-4 py-2 border border-gray-300 text-gray-900 rounded hover:bg-gray-50 cursor-pointer"
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <div className="flex items-center gap-3">
                        <p className="text-gray-900">
                          {user?.user_metadata?.full_name || "Not set"}
                        </p>
                        <button
                          onClick={() => setEditingName(true)}
                          className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-light tracking-[0.05em] text-gray-900 mb-4">
                  Change Password
                </h2>

                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-900"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-80 disabled:opacity-50 cursor-pointer"
                  >
                    Update Password
                  </button>
                </form>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-light tracking-[0.05em] text-gray-900 mb-4">
                  Log Out
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Sign out of your account
                </p>
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="px-6 py-2 border border-red-500 text-red-500 rounded hover:bg-red-50 disabled:opacity-50 cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedPage>
  );
}
