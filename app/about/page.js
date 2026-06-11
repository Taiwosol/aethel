"use client";

import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navigation />

      <main className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl md:text-7xl font-light text-gray-900 mb-6">
                  The Art of Intent
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We believe that true luxury whispers. Our design philosophy is
                  rooted in the rigorous elimination of the unnecessary,
                  creating timeless silhouettes that endure beyond seasons.
                  Every stitch, every textile, and every drape is a deliberate
                  choice—a silent testament to minimalist perfection.
                </p>
              </div>
              <div className="aspect-[3/4] overflow-hidden relative">
                <Image
                  src="/about-img-01.jpg"
                  alt="About AETHEL"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </section>

          <section className="mb-20">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">
                  The Craft
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Our pieces are born from a reverence for material and maker.
                  We partner exclusively with legacy mills and independent
                  artisans who share our uncompromising standards. By
                  prioritizing ethically sourced fabrics and meticulous
                  construction techniques, each garment is not merely worn, but
                  inherited.
                </p>
              </div>
              <div className="aspect-[3/4] overflow-hidden relative md:order-1">
                <Image
                  src="/about-img-02.jpg"
                  alt="Our Craft"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </section>

          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-6">
                  Enduring Responsibility
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Fashion is our privilege. In an industry driven by velocity,
                  we embrace slow fashion. We shoulder responsibility across
                  every phase of our supply chain—from utilizing regenerative
                  agriculture for our textiles to implementing carbon-neutral
                  logistics. We create with intention, acknowledging that the
                  most sustainable garment is the one that remains relevant.
                </p>
              </div>
              <div className="aspect-[3/4] overflow-hidden relative">
                <Image
                  src="/about-img-03.jpg"
                  alt="Sustainability"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
