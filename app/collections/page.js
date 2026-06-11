"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

const PRODUCTS_PER_PAGE = 6;

export default function CollectionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [showSizeSelector, setShowSizeSelector] = useState(null);
  const { toggleWishlist, isInWishlist, wishlist } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = products.slice(startIndex, endIndex);

  // Check if any size of this product is in wishlist
  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  // Get the first size of this product that's in wishlist
  const getWishlistedSize = (productId) => {
    const item = wishlist.find((item) => item.product.id === productId);
    return item ? item.size : undefined;
  };

  const handleWishlistClick = (product, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      return;
    }
    if (product.sizes.length === 1) {
      toggleWishlist(product, product.sizes[0]);
    } else {
      setShowSizeSelector(showSizeSelector === product.id ? null : product.id);
    }
  };

  const handleSizeSelect = (product, size, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push("/login");
      return;
    }
    toggleWishlist(product, size);
    setShowSizeSelector(null);
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navigation />

      <main className="px-6 py-12 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-4">
            The Editorial AW24
          </h1>
          <p className="text-gray-600 max-w-xl">
            A curated selection of timeless silhouettes, crafted from ethically
            sourced fabrics. This season explores the intersection of brutalist
            architecture and organic fluid movements.
          </p>
        </div>

        <p className="text-sm text-gray-500 mb-8">
          Showing {products.length} products
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/collections/${product.slug}`}
              className="relative"
            >
              <div className="aspect-[3/4] bg-gray-200 mb-4 overflow-hidden relative group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <button
                  onClick={(e) => handleWishlistClick(product, e)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors cursor-pointer z-10"
                >
                  <svg
                    className="w-5 h-5"
                    fill={
                      isProductInWishlist(product.id) ? "currentColor" : "none"
                    }
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                {showSizeSelector === product.id && (
                  <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center p-4 z-20">
                    <p className="text-sm font-medium mb-4 text-gray-900">
                      Select Size
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={(e) => handleSizeSelect(product, size, e)}
                          className={`px-4 py-2 border transition-colors cursor-pointer ${
                            isInWishlist(product.id, size)
                              ? "border-gray-900 bg-gray-900 text-white"
                              : "border-gray-300 text-gray-900 hover:border-gray-900 hover:bg-gray-900 hover:text-white"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowSizeSelector(null);
                      }}
                      className="mt-4 text-sm text-gray-900 hover:text-gray-500 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-light text-gray-900 mb-1">
                {product.name}
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                ₦{product.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-between w-full">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 md:gap-2 text-xs md:text-sm tracking-wider"
          >
            <svg
              className="w-3 h-3 md:w-4 md:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="hidden sm:inline">PREVIOUS</span>
          </button>
          <div className="flex gap-1 md:gap-4 items-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-1 py-0.5 md:px-2 md:py-1 text-xs md:text-sm cursor-pointer relative ${
                  currentPage === page
                    ? "text-gray-900 font-semibold"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {String(page).padStart(2, "0")}
                {currentPage === page && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 md:w-6 h-0.5 bg-gray-900" />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="text-gray-500 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 md:gap-2 text-xs md:text-sm tracking-wider"
          >
            <span className="hidden sm:inline">NEXT</span>
            <svg
              className="w-3 h-3 md:w-4 md:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
