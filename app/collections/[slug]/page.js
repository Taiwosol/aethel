"use client";

import { useState, use } from "react";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const [selectedSize, setSelectedSize] = useState(null);
  const [openSections, setOpenSections] = useState({
    materials: false,
    shipping: false,
    story: false,
  });
  const { addToCart, toggleWishlist, isInWishlist } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();

  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (selectedSize || product.sizes.length === 1) {
      addToCart(product, selectedSize || product.sizes[0]);
    }
  };

  const handleToggleWishlist = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    if (selectedSize || product.sizes.length === 1) {
      toggleWishlist(product, selectedSize || product.sizes[0]);
    }
  };

  const isProductInWishlist = isInWishlist(
    product.id,
    selectedSize || (product.sizes.length === 1 ? product.sizes[0] : undefined),
  );

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navigation />
      <main className="px-6 py-12 max-w-7xl mx-auto">
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link
                href="/"
                className="hover:text-gray-900 transition-colors cursor-pointer"
              >
                AETHEL
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/collections"
                className="hover:text-gray-900 transition-colors cursor-pointer"
              >
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative aspect-[3/4] bg-gray-200 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-2xl font-light text-gray-600 mb-8">
              ₦{product.price.toLocaleString()}
            </p>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Crafted in our Milanese atelier from an exquisite blend of virgin
              Italian wool. A timeless silhouette that balances architectural
              rigidity with the grace of artisanal finishing. Designed to endure
              seasons, not just cycles.
            </p>

            <div className="mb-8">
              <h3 className="text-sm font-semibold tracking-wider text-gray-900 mb-4 uppercase">
                Size
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border transition-colors cursor-pointer ${
                      selectedSize === size
                        ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-300 hover:border-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize && product.sizes.length !== 1}
                className="flex-1 bg-black text-white py-4 text-sm tracking-wider uppercase hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                disabled={!selectedSize && product.sizes.length !== 1}
                className={`px-6 py-4 border transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  isProductInWishlist
                    ? "border-gray-900 text-gray-900"
                    : "border-gray-300 hover:border-gray-900"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={isProductInWishlist ? "currentColor" : "none"}
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
            </div>

            <div className="border-t border-gray-200 pt-8 pb-8">
              <button
                onClick={() => toggleSection("materials")}
                className="w-full flex justify-between items-center text-left cursor-pointer"
              >
                <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                  Materials & Care
                </h3>
                <svg
                  className={`w-5 h-5 transition-transform ${openSections.materials ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openSections.materials && (
                <p className="text-gray-600 leading-relaxed mt-4">
                  100% Virgin Italian Wool. Lining: 100% Cupro. Dry clean only
                  by specialists. Each piece is hand-finished with horn buttons
                  from Tuscany.
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-8 pb-8">
              <button
                onClick={() => toggleSection("shipping")}
                className="w-full flex justify-between items-center text-left cursor-pointer"
              >
                <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                  Shipping & Returns
                </h3>
                <svg
                  className={`w-5 h-5 transition-transform ${openSections.shipping ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openSections.shipping && (
                <p className="text-gray-600 leading-relaxed mt-4">
                  Complimentary express shipping globally. We offer a 30-day
                  return policy on all unworn items in original packaging.
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 pt-8">
              <button
                onClick={() => toggleSection("story")}
                className="w-full flex justify-between items-center text-left cursor-pointer"
              >
                <h3 className="text-sm font-semibold tracking-wider text-gray-900 uppercase">
                  The Aethel Story
                </h3>
                <svg
                  className={`w-5 h-5 transition-transform ${openSections.story ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openSections.story && (
                <p className="text-gray-600 leading-relaxed mt-4">
                  Aethel was founded on the principle of radical simplicity. Our
                  overcoats are the result of three decades of tailoring
                  expertise combined with modern architectural design
                  principles.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
