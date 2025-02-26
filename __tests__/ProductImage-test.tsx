import { act, render, waitFor } from "@testing-library/react-native";
import ProductImage from "../components/common/ProductImage";

import React from "react";

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

let mockImageEvents: {
  onLoadStart?: () => void;
  onLoadEnd?: () => void;
  onError?: () => void;
} = {};

jest.mock("expo-image", () => {
  const React = require("react");
  return {
    Image: jest.fn(({ source, onLoadStart, onLoadEnd, onError }) => {
      mockImageEvents = { onLoadStart, onLoadEnd, onError };
      return null;
    }),
  };
});

const valid_image_url = "https://img.shop.com/Image/210000/214100/214196/products/36127105Single_Bottle__90_Servings_.jpg?size=200x200"


describe("ProductImage Component", () => {
  it("renders loading indicator when image starts loading", () => {
    const { getByTestId } = render(<ProductImage skuImage={valid_image_url} />);

    // Initially, the loading indicator should be visible
    expect(getByTestId("activity-indicator")).toBeTruthy();
  });

  it("hides loading indicator after image load finishes", async () => {
    const { queryByTestId } = render(<ProductImage skuImage={valid_image_url} />);

    // Simulate image loading
    await waitFor(() => {
      mockImageEvents.onLoadEnd?.();
    });

    expect(queryByTestId("activity-indicator")).toBeNull();
  });

  it("displays placeholder on image load error", async () => {
    const { getByTestId, queryByTestId } = render(
      <ProductImage skuImage="invalid_url" />
    );

    // Manually trigger error:
    await waitFor(() => {
      mockImageEvents.onError && mockImageEvents.onError();
    });

    expect(getByTestId("placeholder-icon")).toBeTruthy();
    expect(queryByTestId("sku-image")).toBeNull();
  });

  it("renders placeholder immediately when skuImage is null", () => {
    const { getByTestId, queryByTestId } = render(<ProductImage skuImage={null} />);
    expect(queryByTestId("activity-indicator")).toBeNull();
    expect(getByTestId("placeholder-icon")).toBeTruthy();
  });

  it("calls setLoading(true) when skuImage is not null (onLoadStart triggered)", () => {
    const { getByTestId } = render(<ProductImage skuImage={valid_image_url} />);
  
    // Initially, loading might already be true, but explicitly triggering onLoadStart
    act(() => {
      mockImageEvents.onLoadStart?.();
    });
  
    // Verify the loading spinner is rendered after onLoadStart is called
    expect(getByTestId("activity-indicator")).toBeTruthy();
  });

  it("sets ActivityIndicator size based on largeImage prop", () => {
    const { getByTestId, rerender } = render(<ProductImage skuImage={valid_image_url} largeImage />);
    expect(getByTestId("activity-indicator").props.size).toBe("large");

    rerender(<ProductImage skuImage={valid_image_url} largeImage={false} />);
    expect(getByTestId("activity-indicator").props.size).toBe("small");
  })

  it("applies width and height correctly to container", () => {
    const { getByTestId } = render(<ProductImage skuImage={null} width={120} height={150} />);
    const containerStyle = getByTestId("image-container").props.style;

    expect(containerStyle.width).toBe(120);
    expect(containerStyle.height).toBe(150);
  });
});
