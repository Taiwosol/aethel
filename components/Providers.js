"use client";

import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/contexts/AuthContext";

export function Providers({ children }) {
  return (
    <AuthProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </AuthProvider>
  );
}
