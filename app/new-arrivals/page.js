"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Structured Blazer",
    price: "₦7,200",
    image: "/structured-blazer.jpg",
    badge: "LIMITED EDITION",
  },
  {
    id: 2,
    name: "Ankle Chelsea Boot",
    price: "₦4,800",
    image: "/chelsea-boot.jpg",
  },
  {
    id: 3,
    name: "Cashmere Mock-Neck",
    price: "₦4,350",
    image: "/mock-neck.jpg",
  },
  {
    id: 4,
    name: "The Overcoat",
    price: "₦11,250",
    image: "/overcoat.jpg",
  },
];

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="/new-arrival-hero-img.jpg"
          alt="The Autumn Edit"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <p className="text-xs text-white tracking-[0.2em] uppercase mb-4">
            AUTUMN / WINTER 2026
          </p>
          <h2 className="text-4xl md:text-6xl font-light text-white italic mb-6">
            The Autumn Edit
          </h2>
          <Link
            href="/collections"
            className="px-8 py-2 bg-black text-white text-xs tracking-[0.15em] uppercase hover:bg-gray-900 transition-colors cursor-pointer"
          >
            EXPLORE COLLECTION
          </Link>
        </div>
      </section>

      {/* Timeless Silhouettes Section */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="aspect-[3/4] overflow-hidden relative">
            <Image
              src="/man-in-red-suit.jpg"
              alt="Timeless Silhouettes"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500 tracking-[0.15em] uppercase mb-4">
              CRAFTSMANSHIP
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
              Timeless Silhouettes
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-8">
              Our autumn collection explores the intersection of brutalist
              architecture and fluid tailoring. Each piece is a testament to the
              silent luxury that defines AETHEL.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="aspect-square overflow-hidden mb-3 relative">
                  <Image
                    src="/knitwear.jpg"
                    alt="Knitwear"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-gray-900">The Knitwear Series</p>
                <Link href="/collections" className="text-xs text-gray-500 cursor-pointer hover:text-gray-900 transition-colors">SHOP NOW</Link>
              </div>
              <div>
                <div className="aspect-square overflow-hidden mb-3 relative">
                  <Image
                    src="/signature-leather.jpg"
                    alt="Leather"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-sm text-gray-900">Signature Leather</p>
                <Link href="/collections" className="text-xs text-gray-500 cursor-pointer hover:text-gray-900 transition-colors">SHOP NOW</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals Product Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-2">
                New Arrivals
              </h2>
              <p className="text-sm text-gray-500">
                Curated essentials for the modern wardrobe.
              </p>
            </div>
            <Link
              href="/new-arrivals"
              className="text-sm text-gray-900 tracking-[0.15em] uppercase mt-4 md:mt-0 cursor-pointer"
            >
              VIEW ALL
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden mb-3">
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-[10px] tracking-[0.15em] uppercase z-10">
                      {product.badge}
                    </div>
                  )}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-900">{product.name}</p>
                  <p className="text-xs md:text-sm text-gray-900">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
