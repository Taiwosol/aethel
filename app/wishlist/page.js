"use client";

import { useWishlist } from "@/contexts/WishlistContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ProtectedPage } from "@/components/ProtectedPage";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useWishlist();
  const [sortBy, setSortBy] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Sort wishlist
  const sortedWishlist = [...wishlist].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.product.name.localeCompare(b.product.name);
      case "price":
        return a.product.price - b.product.price;
      case "newest":
      default:
        return (b.createdAt || 0) - (a.createdAt || 0);
    }
  });

  const sortOptions = [
    { value: "newest", label: "SORT BY: NEWEST" },
    { value: "name", label: "SORT BY: NAME" },
    { value: "price", label: "SORT BY: PRICE" },
  ];

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="px-6 py-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h1 className="text-3xl font-serif text-gray-900 mb-4 md:mb-0">Saved for Later</h1>
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="text-sm tracking-wider text-gray-600 hover:text-gray-900 border border-gray-300 px-4 py-2 cursor-pointer"
              >
                {sortOptions.find(opt => opt.value === sortBy)?.label}
              </button>
              {showSortDropdown && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded shadow z-50 min-w-[180px]">
                  {sortOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setSortBy(opt.value);
                        setShowSortDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm tracking-wider cursor-pointer hover:bg-gray-100 ${
                        sortBy === opt.value ? "text-gray-900 font-semibold" : "text-gray-600"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {sortedWishlist.length === 0 ? (
            <p className="text-gray-600 text-lg">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedWishlist.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-4 right-4 z-10 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="aspect-square bg-gray-200 mb-4 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-xs tracking-widest text-gray-500 mb-2">{item.product.category}</p>
                  <h3 className="text-lg font-serif text-gray-900 mb-2">{item.product.name}</h3>
                  <p className="text-gray-700 mb-4">₦{item.product.price.toLocaleString()}</p>
                  <button
                    onClick={() => {
                      addToCart(item.product, item.size);
                      removeFromWishlist(item.id);
                    }}
                    className="w-full bg-black text-white py-3 text-sm tracking-wider hover:bg-gray-800 cursor-pointer"
                  >
                    ADD TO CART
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedPage>
  );
}
