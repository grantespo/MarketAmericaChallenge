import { renderHook, act } from '@testing-library/react-native';
import React from 'react';

import { CartProvider, useCart } from '../contexts/CartProvider';
import { ImageSize, Image } from '../types/Image';
import { Sku } from '../types/Sku';

const mockImageSize: ImageSize = {
  width: 80,
  height: 80,
  url: '',
};

const mockImage: Image = {
  caption: 'test caption',
  sizes: [mockImageSize],
};

const mockSku: Sku = {
  id: 'sku123',
  name: 'Test Product',
  price: 10.0,
  priceString: '$10.00',
  inventoryStatus: 'In Stock',
  images: [mockImage],
};

const mockNotFoundSku: Sku = {
  id: '0',
  name: 'Test Product',
  price: 10.0,
  priceString: '$10.00',
  inventoryStatus: 'In Stock',
  images: [mockImage],
};

// Helper to create a fresh context per test
const setupCartHook = () => {
  const wrapper = ({ children }: any) => (
    <CartProvider>{children}</CartProvider>
  );
  return renderHook(() => useCart(), { wrapper });
};

describe('CartProvider', () => {
  test('initializes with empty cart', () => {
    const { result } = setupCartHook();
    expect(result.current.cartItems).toEqual([]);
  });

  test('adds a new SKU to cart', () => {
    const { result } = setupCartHook();

    act(() => {
      result.current.addToCart(mockSku);
    });

    expect(result.current.cartItems).toEqual([[mockSku, 1]]);
  });

  test('increments quantity if SKU already in cart', () => {
    const { result } = setupCartHook();

    act(() => {
      result.current.addToCart(mockSku);
    });

    act(() => {
      result.current.addToCart(mockSku);
    });

    expect(result.current.cartItems).toEqual([[mockSku, 2]]);
  });

  test('removes SKU quantity by one', () => {
    const { result } = setupCartHook();

    act(() => {
      result.current.addToCart(mockSku); // qty = 1
    });

    act(() => {
      result.current.addToCart(mockSku); // qty = 2
    });

    act(() => {
      result.current.removeFromCart(mockSku, false); // decrement by 1
    });

    expect(result.current.cartItems).toEqual([[mockSku, 1]]);
  });

  test('tries to remove SKU that is not in cart', () => {
    const { result } = setupCartHook();

    act(() => {
      result.current.addToCart(mockSku); // qty = 1
    });

    act(() => {
      result.current.removeFromCart(mockNotFoundSku, false); // decrement by 1
    });

    expect(result.current.cartItems).toEqual([[mockSku, 1]]);
  });

  test('removes SKU entirely when removeAll is true', () => {
    const { result } = setupCartHook();

    act(() => {
      result.current.addToCart(mockSku);
    });

    act(() => {
      result.current.addToCart(mockSku);
    });

    act(() => {
      result.current.removeFromCart(mockSku, true);
    });

    expect(result.current.cartItems).toEqual([]);
  });

  test('removes SKU entirely when quantity reaches <0', () => {
    const { result } = setupCartHook();

    act(() => {
      result.current.addToCart(mockSku); // qty = 1
    });

    act(() => {
      result.current.removeFromCart(mockSku, false); // qty = 0
    });

    act(() => {
      result.current.removeFromCart(mockSku, false); // qty < 0
    });

    expect(result.current.cartItems).toEqual([]);
  });

  test('clearCart empties the cart', () => {
    const { result } = setupCartHook();

    act(() => {
      result.current.addToCart(mockSku);
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cartItems).toEqual([]);
  });

  test('throws error if used outside CartProvider', () => {
    try {
      const consoleError = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});
      const result = renderHook(() => useCart());
      expect(result).toEqual(
        Error('useCart must be used within a CartProvider'),
      );
      consoleError.mockRestore();
    } catch {}
  });
});
