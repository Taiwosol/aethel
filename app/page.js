"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[85vh] overflow-hidden">
        <Image
          src="/login-img.jpg"
          alt="AETHEL - Quiet Luxury"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6">
          <p className="text-xs text-white tracking-[0.3em] uppercase mb-4">
            Welcome to
          </p>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-6 tracking-[0.2em]">
            AETHEL
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl">
            Quiet luxury for the discerning contemporary wardrobe
          </p>
          <div className="flex gap-4">
            <Link
              href="/collections"
              className="px-10 py-3 bg-white text-black text-xs tracking-[0.2em] uppercase hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="px-10 py-3 border border-white text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-4">
              Explore
            </p>
            <h2 className="text-3xl md:text-4xl font-light text-gray-900">
              Our Collections
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link
              href="/collections"
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/man-in-red-suit.jpg"
                alt="Editorial AW24"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-8">
                <div>
                  <h3 className="text-xl text-white font-light mb-2">
                    Editorial AW24
                  </h3>
                  <p className="text-xs text-white/80 tracking-[0.15em] uppercase">
                    View Collection
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href="/new-arrivals"
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/new-arrival-hero-img.jpg"
                alt="New Arrivals"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-8">
                <div>
                  <h3 className="text-xl text-white font-light mb-2">
                    New Arrivals
                  </h3>
                  <p className="text-xs text-white/80 tracking-[0.15em] uppercase">
                    Discover Now
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href="/about"
              className="group relative aspect-[3/4] overflow-hidden"
            >
              <Image
                src="/about-img-01.jpg"
                alt="Our Story"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-8">
                <div>
                  <h3 className="text-xl text-white font-light mb-2">
                    Our Story
                  </h3>
                  <p className="text-xs text-white/80 tracking-[0.15em] uppercase">
                    Learn More
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-6">
            Our Philosophy
          </p>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8">
            The Art of Intent
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg mb-10">
            We believe that true luxury whispers. Our design philosophy is
            rooted in the rigorous elimination of the unnecessary, creating
            timeless silhouettes that endure beyond seasons.
          </p>
          <Link
            href="/about"
            className="inline-block px-8 py-3 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-gray-900 transition-colors cursor-pointer"
          >
            Read More
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
