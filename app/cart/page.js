"use client";

import { useWishlist } from "@/contexts/WishlistContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProtectedPage } from "@/components/ProtectedPage";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity, calculateSubtotal } =
    useWishlist();
  const router = useRouter();
  const subtotal = calculateSubtotal();

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="px-6 py-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h1 className="text-3xl font-serif text-gray-900 mb-4 md:mb-0">
              SHOPPING CART
            </h1>
            <button className="text-xs tracking-wider text-gray-500 hover:text-gray-900 cursor-pointer">
              <svg
                className="w-4 h-4 inline mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="text-xs tracking-wider text-gray-500 mb-12">
            Your curated selection
          </p>

          {cart.length === 0 ? (
            <p className="text-gray-600 text-lg">
              Your shopping cart is empty.
            </p>
          ) : (
            <>
              <div className="space-y-8 mb-12">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-6 items-start">
                    <div className="w-32 h-32 bg-gray-200 flex-shrink-0 overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-serif text-gray-900 mb-2">
                          {item.product.name}
                        </h3>
                        <p className="text-xs tracking-wider text-gray-500 mb-4">
                          SIZE: {item.size}
                        </p>
                        <div className="flex items-center gap-4 border border-gray-300 w-fit">
                          <button
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:text-gray-900 cursor-pointer"
                          >
                            −
                          </button>
                          <span className="text-gray-900 px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:text-gray-900 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <p className="text-gray-900 font-medium">
                          ₦
                          {(
                            item.product.price * item.quantity
                          ).toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-gray-900 cursor-pointer"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-900">SUBTOTAL</span>
                  <span className="text-gray-900 font-medium">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-8">
                  <span className="text-gray-600">SHIPPING</span>
                  <span className="text-gray-600">CALCULATED AT CHECKOUT</span>
                </div>
                <button
                  onClick={() => router.push("/cart/checkout")}
                  className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-800 mb-8 cursor-pointer"
                >
                  CHECKOUT NOW
                </button>
                <div className="flex gap-8 justify-center text-xs tracking-wider text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Shipping Policy
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Us
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
        <Footer />
      </div>
    </ProtectedPage>
  );
}
