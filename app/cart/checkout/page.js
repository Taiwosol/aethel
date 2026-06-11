"use client";

import { useWishlist } from "@/contexts/WishlistContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ProtectedPage } from "@/components/ProtectedPage";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { cart, calculateSubtotal, clearCart, saveShippingAddress, addOrder } =
    useWishlist();
  const { user } = useAuth();
  const subtotal = calculateSubtotal();
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("standard"); // 'standard' or 'express'
  const deliveryFee = deliveryMethod === "express" ? 2500 : 0;
  const total = subtotal + deliveryFee;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Load Paystack script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => setPaystackLoaded(true);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  // Validate form
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.postalCode.trim())
      errors.postalCode = "Postal code is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePayNow = () => {
    if (!paystackLoaded) return;
    if (!validateForm()) return;

    // Paystack configuration using environment variable
    const paystackPublicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!paystackPublicKey) {
      alert(
        "Paystack public key is missing. Please check your environment variables.",
      );
      return;
    }

    const handler = window.PaystackPop.setup({
      key: paystackPublicKey,
      email: user?.email || "customer@example.com",
      amount: total * 100, // Paystack uses kobo (100 kobo = 1 NGN)
      currency: "NGN",
      ref: "AETHEL" + Date.now(),
      metadata: {
        custom_fields: [
          {
            display_name: "First Name",
            variable_name: "first_name",
            value: formData.firstName,
          },
          {
            display_name: "Last Name",
            variable_name: "last_name",
            value: formData.lastName,
          },
          {
            display_name: "Shipping Address",
            variable_name: "shipping_address",
            value: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
          },
        ],
      },
      callback: function (response) {
        // Save shipping address and order data
        saveShippingAddress(formData);
        addOrder({
          items: [...cart],
          subtotal,
          deliveryFee,
          total,
          deliveryMethod,
          paymentReference: response.reference,
          orderDate: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          orderNumber: "AE-" + Date.now(),
          status: "Processing",
        });
        clearCart();
        // Redirect to order completion page
        window.location.href = "/cart/checkout/order-complete";
      },
      onClose: function () {
        alert("Transaction was not completed, window closed.");
      },
    });
    handler.openIframe();
  };

  const isFormValid =
    Object.keys(formErrors).length === 0 &&
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.address.trim() &&
    formData.city.trim() &&
    formData.postalCode.trim();

  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="px-6 py-8 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
              Checkout
            </h1>
            <p className="text-sm tracking-wider text-gray-600">
              Finalize Your Selection
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="space-y-12">
                {/* Shipping Address Section */}
                <section>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                    <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
                      01. Shipping Address
                    </h2>
                    <span className="text-sm tracking-wider text-gray-600 font-semibold">
                      REQUIRED
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm tracking-wider text-gray-600 mb-2 font-semibold">
                        FIRST NAME
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="John"
                        className={`w-full py-3 text-lg text-gray-500 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 ${formErrors.firstName ? "border-red-500" : ""}`}
                      />
                      {formErrors.firstName && (
                        <p className="text-xs text-red-500 mt-2">
                          {formErrors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm tracking-wider text-gray-600 mb-2 font-semibold">
                        LAST NAME
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Doe"
                        className={`w-full py-3 text-lg text-gray-500 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 ${formErrors.lastName ? "border-red-500" : ""}`}
                      />
                      {formErrors.lastName && (
                        <p className="text-xs text-red-500 mt-2">
                          {formErrors.lastName}
                        </p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm tracking-wider text-gray-600 mb-2 font-semibold">
                        ADDRESS
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Avenue Montaigne"
                        className={`w-full py-3 text-lg text-gray-500 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 ${formErrors.address ? "border-red-500" : ""}`}
                      />
                      {formErrors.address && (
                        <p className="text-xs text-red-500 mt-2">
                          {formErrors.address}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm tracking-wider text-gray-600 mb-2 font-semibold">
                        CITY
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Lagos"
                        className={`w-full py-3 text-lg text-gray-500 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 ${formErrors.city ? "border-red-500" : ""}`}
                      />
                      {formErrors.city && (
                        <p className="text-xs text-red-500 mt-2">
                          {formErrors.city}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm tracking-wider text-gray-600 mb-2 font-semibold">
                        POSTAL CODE
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="75008"
                        className={`w-full py-3 text-lg text-gray-500 border-b border-gray-300 bg-transparent focus:outline-none focus:border-gray-900 ${formErrors.postalCode ? "border-red-500" : ""}`}
                      />
                      {formErrors.postalCode && (
                        <p className="text-xs text-red-500 mt-2">
                          {formErrors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>
                </section>

                {/* Delivery Method Section */}
                <section>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                    <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
                      02. Delivery Method
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      onClick={() => setDeliveryMethod("standard")}
                      className={`p-8 cursor-pointer transition-all ${deliveryMethod === "standard" ? "border-2 border-black" : "border border-gray-300 hover:border-gray-900"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Standard Delivery
                          </h3>
                          <p className="text-xl text-gray-600">
                            3 - 5 business days
                          </p>
                        </div>
                        <p className="text-lg md:text-xl text-gray-900">
                          Complimentary
                        </p>
                      </div>
                    </div>
                    <div
                      onClick={() => setDeliveryMethod("express")}
                      className={`p-8 cursor-pointer transition-all ${deliveryMethod === "express" ? "border-2 border-black" : "border border-gray-300 hover:border-gray-900"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3">
                            Express Delivery
                          </h3>
                          <p className="text-xl text-gray-600">
                            1 - 2 business days
                          </p>
                        </div>
                        <p className="text-lg md:text-xl text-gray-900">
                          ₦2,500
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Payment Method Section */}
                <section>
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
                    <h2 className="text-2xl md:text-3xl font-serif text-gray-900">
                      03. Payment Method
                    </h2>
                  </div>
                  <button
                    onClick={handlePayNow}
                    disabled={!paystackLoaded || !isFormValid}
                    className="w-full bg-black text-white py-6 text-lg tracking-wider hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-4"
                  >
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6.5 21c-.7 0-1.4-.2-2-.5-.6-.3-1.1-.8-1.4-1.4C2.7 18.3 2.5 17.5 2.5 16V8c0-.7.2-1.4.6-2 .4-.6 1-1.1 1.6-1.4.6-.3 1.3-.5 2-.5H8V4h8v.5h1.5c.7 0 1.4.2 2 .5.6.3 1.1.8 1.4 1.4.4.6.6 1.3.6 2v8c0 .7-.2 1.4-.6 2-.3.6-.8 1.1-1.4 1.4-.6.3-1.3.5-2 .5H6.5zm0-1.5h11c.4 0 .8-.1 1.1-.3.3-.2.6-.5.8-.9.2-.3.3-.7.3-1.1V8c0-.4-.1-.8-.3-1.1-.2-.3-.5-.6-.8-.9-.3-.2-.7-.3-1.1-.3H16v1.5H8V5.7H6.5c-.4 0-.8.1-1.1.3-.3.2-.6.5-.8.9-.2.3-.3.7-.3 1.1v8c0 .4.1.8.3 1.1.2.3.5.6.8.9.3.2.7.3 1.1.3zM11 9.7h2v1h-2v-1zm0 2.6h2v4h-2v-4z" />
                    </svg>
                    {!isFormValid
                      ? "PLEASE FILL IN ALL FIELDS"
                      : "PAY WITH PAYSTACK"}
                  </button>
                </section>
              </div>
            </div>

            {/* Sidebar - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-8">
                  ORDER SUMMARY
                </h3>
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-200 flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 mb-1">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                          Size: {item.size}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-xs md:text-sm text-gray-900">
                        ₦{(item.product.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <div className="flex justify-between text-xs md:text-sm text-gray-900">
                    <span>Subtotal</span>
                    <span>₦{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm text-gray-900">
                    <span>Shipping</span>
                    <span>
                      {deliveryMethod === "standard"
                        ? "Complimentary"
                        : `₦${deliveryFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg md:text-xl font-bold text-gray-900 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
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
