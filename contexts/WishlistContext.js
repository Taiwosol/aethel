"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [orders, setOrders] = useState([]);

  const getStorageKeys = () => {
    const userId = user?.id || "guest";
    return {
      wishlistKey: `wishlist_${userId}`,
      cartKey: `cart_${userId}`,
      shippingKey: `shipping_${userId}`,
      ordersKey: `orders_${userId}`,
    };
  };

  useEffect(() => {
    if (user !== undefined) {
      const { wishlistKey, cartKey, shippingKey, ordersKey } = getStorageKeys();
      const savedWishlist = localStorage.getItem(wishlistKey);
      const savedCart = localStorage.getItem(cartKey);
      const savedShipping = localStorage.getItem(shippingKey);
      const savedOrders = localStorage.getItem(ordersKey);
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
      setCart(savedCart ? JSON.parse(savedCart) : []);
      setShippingAddress(savedShipping ? JSON.parse(savedShipping) : null);
      setOrders(savedOrders ? JSON.parse(savedOrders) : []);
    }
  }, [user]);

  useEffect(() => {
    if (user !== undefined) {
      const { wishlistKey } = getStorageKeys();
      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  useEffect(() => {
    if (user !== undefined) {
      const { cartKey } = getStorageKeys();
      localStorage.setItem(cartKey, JSON.stringify(cart));
    }
  }, [cart, user]);

  useEffect(() => {
    if (user !== undefined) {
      const { shippingKey } = getStorageKeys();
      if (shippingAddress) {
        localStorage.setItem(shippingKey, JSON.stringify(shippingAddress));
      } else {
        localStorage.removeItem(shippingKey);
      }
    }
  }, [shippingAddress, user]);

  useEffect(() => {
    if (user !== undefined) {
      const { ordersKey } = getStorageKeys();
      if (orders.length > 0) {
        localStorage.setItem(ordersKey, JSON.stringify(orders));
      } else {
        localStorage.removeItem(ordersKey);
      }
    }
  }, [orders, user]);

  // Wishlist functions
  const addToWishlist = (product, size) => {
    const itemExists = wishlist.some(
      (item) => item.product.id === product.id && item.size === size,
    );
    if (!itemExists) {
      setWishlist([
        ...wishlist,
        { product, size, id: Date.now(), createdAt: Date.now() },
      ]);
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
      (item) => item.product.id === productId && item.size === size,
    );
  };

  // Cart functions
  const addToCart = (product, size) => {
    const existingItemIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.size === size,
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
      item.id === itemId ? { ...item, quantity: newQuantity } : item,
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  // Shipping and order functions
  const saveShippingAddress = (address) => {
    setShippingAddress(address);
  };

  const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const removeOrder = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.orderNumber !== orderId));
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
        calculateSubtotal,
        shippingAddress,
        saveShippingAddress,
        orders,
        addOrder,
        removeOrder,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
