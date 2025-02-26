import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";
import { useCart } from "../contexts/CartProvider";
import CartScreen from "../screens/cart/CartScreen";

jest.mock("../components/cart/CartSkuCard", () => jest.fn(() => null));

const mockClearCart = jest.fn();
jest.mock("../contexts/CartProvider", () => ({
  useCart: jest.fn(),
}));

jest.mock("expo-local-authentication", () => ({
  authenticateAsync: jest.fn(),
}));

jest.spyOn(Alert, "alert");

const mockNavigation = { pop: jest.fn() };

describe("CartScreen Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty cart message when cartItems is empty", () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [],
      clearCart: mockClearCart,
    });

    const { getByText } = render(<CartScreen navigation={mockNavigation as any} route={{} as any}  />);
    expect(getByText("Cart is empty")).toBeTruthy();
  });

  it("renders CartSkuCard components and calculates total price and quantity", () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [
        [{ id: "1", price: 10.0 }, 2], // total $20
        [{ id: "2", price: 5.5 }, 1],  // total $5.50
      ],
      clearCart: mockClearCart,
    });

    const { getByText } = render(<CartScreen navigation={mockNavigation as any} route={{} as any}  />);

    expect(getByText("Buy ($25.50)")).toBeTruthy();
  });

  it("handles successful purchase (biometric auth success)", async () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [[{ id: "1", price: 10.0 }, 1]],
      clearCart: mockClearCart,
    });

    (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({
      success: true,
    });

    const { getByText } = render(<CartScreen navigation={mockNavigation as any} route={{} as any}  />);

    fireEvent.press(getByText("Buy ($10.00)"));

    await waitFor(() => {
      expect(LocalAuthentication.authenticateAsync).toHaveBeenCalledWith({
        promptMessage: "Authenticate to purchase items",
      });
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success!",
        "Purchase successful!"
      );
      expect(mockClearCart).toHaveBeenCalled();
      expect(mockNavigation.pop).toHaveBeenCalled();
    });
  });

  it("handles unsuccessful purchase (biometric auth fail)", async () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [[{ id: "1", price: 10.0 }, 1]],
      clearCart: mockClearCart,
    });

    (LocalAuthentication.authenticateAsync as jest.Mock).mockResolvedValue({
      success: false,
    });

    const { getByText } = render(<CartScreen navigation={mockNavigation as any} route={{} as any}  />);

    fireEvent.press(getByText("Buy ($10.00)"));

    await waitFor(() => {
      expect(LocalAuthentication.authenticateAsync).toHaveBeenCalledWith({
        promptMessage: "Authenticate to purchase items",
      });
      expect(Alert.alert).toHaveBeenCalledWith(
        "Purchase Failed",
        "Could not verify your identity."
      );
      expect(mockClearCart).not.toHaveBeenCalled();
      expect(mockNavigation.pop).not.toHaveBeenCalled();
    });
  });
});
