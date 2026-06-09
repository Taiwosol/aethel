"use client";

import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    const savedCart = localStorage.getItem("cart");
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Wishlist functions
  const addToWishlist = (product, size) => {
    const itemExists = wishlist.some(
      (item) => item.product.id === product.id && item.size === size
    );
    if (!itemExists) {
      setWishlist([...wishlist, { product, size, id: Date.now(), createdAt: Date.now() }]);
    }
  };

  const removeFromWishlist = (itemId) => {
    setWishlist(wishlist.filter((item) => item.id !== itemId));
  };

  const clearWishlist = () => {
    setWishlist([]);
  };

  const isInWishlist = (productId, size) => {
    return wishlist.some(
      (item) => item.product.id === productId && item.size === size
    );
  };

  // Cart functions
  const addToCart = (product, size) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.size === size
    );
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { product, size, quantity: 1, id: Date.now() }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        calculateSubtotal
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
