import React from "react";
import { render } from "@testing-library/react-native";
import ReviewView from "../components/products/review/ReviewView";

jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'Ionicons',
  }));

describe("ReviewView Component", () => {
  it("returns empty fragment if reviewData is undefined", () => {
    const { toJSON } = render(<ReviewView reviewData={undefined} />);
    expect(toJSON()).toBeNull();
  });

  it("returns empty fragment if reviewData.count is empty", () => {
    const { toJSON } = render(<ReviewView reviewData={{ count: "", rating: 0 }} />);
    expect(toJSON()).toBeNull();
  });

  it("returns empty fragment if reviewData.count is '0'", () => {
    const { toJSON } = render(<ReviewView reviewData={{ count: "0", rating: 0 }} />);
    expect(toJSON()).toBeNull();
  });

  it("renders correctly with full stars, no half stars", () => {
    const { getAllByTestId, getByText } = render(
      <ReviewView reviewData={{ count: "10", rating: 5 }} />
    );

    expect(getAllByTestId("full-star")).toHaveLength(5);
    expect(getByText("(5)")).toBeTruthy();
    expect(getByText("10 reviews")).toBeTruthy();
  });

  it("renders correctly with half stars and empty stars", () => {
    const { getAllByTestId, getByTestId, getByText } = render(
      <ReviewView reviewData={{ count: "3", rating: 3.5 }} />
    );

    expect(getAllByTestId("full-star")).toHaveLength(3);
    expect(getByTestId("half-star")).toBeTruthy();
    expect(getAllByTestId("empty-star")).toHaveLength(1);
    expect(getByText("(3.5)")).toBeTruthy();
    expect(getByText("3 reviews")).toBeTruthy();
  });

  it("renders singular 'review' when count is '1'", () => {
    const { getByText } = render(
      <ReviewView reviewData={{ count: "1", rating: 4 }} />
    );

    expect(getByText("1 review")).toBeTruthy();
  });
});
