import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ProductCard from "../components/products/ProductCard";
import { mockProduct, mockProductWithoutImage } from "../__mocks__/MockProduct";

const mockNavigate = jest.fn();

const navigation = { navigate: mockNavigate };

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe("ProductCard Component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("renders correctly with images", () => {
    const { getByText } = render(<ProductCard product={mockProduct} navigation={navigation} />);

    expect(getByText("testName")).toBeTruthy();
    expect(getByText("This is a short description")).toBeTruthy();
    expect(getByText("$10 - $50")).toBeTruthy();
  });

  it("renders correctly without images (sizes array empty)", () => {
    const { getByText } = render(<ProductCard product={mockProductWithoutImage} navigation={navigation} />);

    expect(getByText("No Image Product™")).toBeTruthy();
    expect(getByText("No image description®")).toBeTruthy();
    expect(getByText("$15")).toBeTruthy();
  });

  it("navigates to ProductDetail screen with correct params when pressed", () => {
    const { getByTestId } = render(<ProductCard product={mockProduct} navigation={navigation} />);
    
    fireEvent.press(getByTestId("product-card"));

    expect(mockNavigate).toHaveBeenCalledWith("ProductDetail", {
      id: 1,
      largeImageSize: { 
        width: 800,
        height: 800,
        url: "large_url"
       },
      name: "testName",
      shortDescription: "This is a short description",
    });
  });

  it("handles navigation correctly even without image sizes", () => {
    const { getByTestId } = render(<ProductCard product={mockProductWithoutImage} navigation={navigation} />);

    fireEvent.press(getByTestId("product-card"));

    expect(mockNavigate).toHaveBeenCalledWith("ProductDetail", {
      id: 2,
      largeImageSize: undefined,
      name: "No Image Product™",
      shortDescription: "No image description®",
    });
  });
});
