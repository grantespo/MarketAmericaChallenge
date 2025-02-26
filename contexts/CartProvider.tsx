import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Sku } from '../types/Sku';

type CartItem = [Sku, number]; // Tuple (Sku, Quantity)

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (sku: Sku) => void;
  removeFromCart: (sku: Sku, removeAll: boolean) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (sku: Sku) => {
    const existingCartItems = [...cartItems];
    const skuIndex = cartItems.findIndex((item) => item[0].id === sku.id);
    if (skuIndex !== -1) {
      //sku exists cart; increment qty
      const existingSkuCartItem = existingCartItems[skuIndex];
      existingCartItems[skuIndex] = [
        existingSkuCartItem[0],
        existingSkuCartItem[1] + 1,
      ];
    } else {
      existingCartItems.push([sku, 1]);
    }
    setCartItems([...existingCartItems]);
  };

  const removeFromCart = (sku: Sku, removeAll: boolean) => {
    const skuIndex = cartItems.findIndex((item) => item[0].id === sku.id);
    if (skuIndex === -1) {
      // sku not in cart
      return;
    }
    let existingCartItems = [...cartItems];
    const existingSkuCartItem = existingCartItems[skuIndex];
    if (existingSkuCartItem[1] <= 0 || removeAll) {
      // qty <= 0; remove it from the cart
      existingCartItems = [
        ...existingCartItems.filter((item) => item[0].id !== sku.id),
      ];
    } else {
      existingCartItems[skuIndex] = [
        existingSkuCartItem[0],
        existingSkuCartItem[1] - 1,
      ];
    }
    setCartItems([...existingCartItems]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
