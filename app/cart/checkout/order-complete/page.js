"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProtectedPage } from "@/components/ProtectedPage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useWishlist } from "@/contexts/WishlistContext";

export default function OrderCompletePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { orders, shippingAddress, clearCart } = useWishlist();
  const lastOrder = orders[0];

  // Get user's name from Supabase metadata or email
  const getUserFirstName = () => {
    if (!user) return "Customer";
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(" ")[0];
    }
    if (user.email) {
      return user.email.split("@")[0];
    }
    return "Customer";
  };

  const getUserName = () => {
    if (!user) return "Customer Name";
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user.email) {
      return user.email;
    }
    return "Customer Name";
  };

  const orderNumber = lastOrder
    ? `#${lastOrder.orderNumber}`
    : "#AE-" + Math.floor(1000 + Math.random() * 9000);
  const orderDate = lastOrder
    ? lastOrder.orderDate
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const getEstimatedDelivery = () => {
    if (lastOrder?.deliveryMethod === "express") {
      const start = new Date(
        Date.now() + 1 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const end = new Date(
        Date.now() + 2 * 24 * 60 * 60 * 1000,
      ).toLocaleDateString("en-US", { month: "short", day: "numeric" });
      return `${start} — ${end}`;
    }
    const start = new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000,
    ).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const end = new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000,
    ).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    return `${start} — ${end}`;
  };

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="px-6 py-16 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-8">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-6">
              Thank you for your order, {getUserFirstName()}.
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Your selection of essential pieces is being prepared with the
              utmost care. We will notify you as soon as your items begin their
              journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div>
                <h3 className="text-xs tracking-wider text-gray-600 font-semibold mb-6 border-b border-gray-200 pb-4">
                  ORDER INFORMATION
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number</span>
                    <span className="font-semibold text-gray-900">
                      {orderNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Date</span>
                    <span className="font-semibold text-gray-900">
                      {orderDate}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Delivery</span>
                    <span className="font-semibold text-gray-900">
                      {getEstimatedDelivery()}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs tracking-wider text-gray-600 font-semibold mb-6 border-b border-gray-200 pb-4">
                  SHIPPING TO
                </h3>
                <div className="text-gray-600 space-y-1">
                  <p className="text-gray-900">
                    {shippingAddress?.firstName && shippingAddress?.lastName
                      ? `${shippingAddress.firstName} ${shippingAddress.lastName}`
                      : getUserName()}
                  </p>
                  <p>{shippingAddress?.address}</p>
                  <p>
                    {shippingAddress?.city}, {shippingAddress?.postalCode}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <button
                  onClick={() => router.push("/profile")}
                  className="w-full bg-black text-white py-4 text-sm tracking-wider hover:bg-gray-800 cursor-pointer font-semibold"
                >
                  VIEW ORDER STATUS
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    router.push("/collections");
                  }}
                  className="w-full border border-black text-gray-900 py-4 text-sm tracking-wider hover:bg-gray-100 cursor-pointer font-semibold"
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 p-8">
                <h3 className="text-xs tracking-wider text-gray-600 font-semibold mb-8">
                  ORDER SUMMARY
                </h3>
                <div className="space-y-8 mb-12">
                  {lastOrder?.items && lastOrder.items.length > 0 ? (
                    lastOrder.items.map((item, index) => (
                      <div key={item.id || index} className="flex gap-6">
                        <div className="w-32 h-40 bg-gray-200 flex-shrink-0 overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <h4 className="text-2xl font-serif text-gray-900 mb-1">
                              {item.product.name}
                            </h4>
                            <p className="text-xs tracking-wider text-gray-600 mb-3">
                              {item.product.size || "OS"} / {item.size}
                            </p>
                            <p className="text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="text-base md:text-lg text-gray-900">
                            ₦
                            {(
                              item.product.price * item.quantity
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No order details available.</p>
                  )}
                </div>
                <div className="border-t border-gray-200 pt-8 space-y-4">
                  <div className="flex justify-between text-sm md:text-base text-gray-600">
                    <span>Subtotal</span>
                    <span>₦{(lastOrder?.subtotal || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm md:text-base text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {lastOrder?.deliveryMethod === "express"
                        ? `₦${lastOrder.deliveryFee.toLocaleString()}`
                        : "Complimentary"}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-sm md:text-base text-gray-900 pt-4 border-t border-gray-200">
                    <span>TOTAL</span>
                    <span>₦{(lastOrder?.total || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedPage>
  );
}
