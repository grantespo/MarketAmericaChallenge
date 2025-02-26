import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Keyboard, Platform } from "react-native";
import SearchBar from "../components/common/SearchBar";

jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'Ionicons',
  }));

jest.spyOn(Keyboard, "dismiss").mockImplementation(jest.fn());

describe("SearchBar Component", () => {
  const placeholderText = "Search items";

  it("renders correctly with initial props", () => {
    const { getByPlaceholderText, queryByTestId } = render(
      <SearchBar query="" setQuery={jest.fn()} placeholder={placeholderText} />
    );

    expect(getByPlaceholderText(placeholderText)).toBeTruthy();
    expect(queryByTestId("clear-button")).toBeNull();
  });

  it("calls setQuery when text is entered", () => {
    const mockSetQuery = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchBar query="" setQuery={mockSetQuery} placeholder={placeholderText} />
    );

    fireEvent.changeText(getByPlaceholderText(placeholderText), "New Query");
    expect(mockSetQuery).toHaveBeenCalledWith("New Query");
  });

  it("shows clear button when query is not empty", () => {
    const { getByTestId } = render(
      <SearchBar query="test" setQuery={jest.fn()} placeholder={placeholderText} />
    );

    expect(getByTestId("clear-button")).toBeTruthy();
  });

  it("clears query when clear button is pressed", () => {
    const mockSetQuery = jest.fn();
    const { getByTestId } = render(
      <SearchBar query="some query" setQuery={mockSetQuery} placeholder={placeholderText} />
    );

    fireEvent.press(getByTestId("clear-button"));
    expect(mockSetQuery).toHaveBeenCalledWith("");
  });

  it("dismisses keyboard on submit editing", () => {
    const { getByPlaceholderText } = render(
      <SearchBar query="query" setQuery={jest.fn()} placeholder={placeholderText} />
    );

    fireEvent(getByPlaceholderText(placeholderText), "submitEditing");
    expect(Keyboard.dismiss).toHaveBeenCalled();
  });

  it("adjusts clear button height based on platform (Android)", () => {
    Platform.OS = "android";
    const { getByTestId } = render(
      <SearchBar query="test" setQuery={jest.fn()} placeholder={placeholderText} />
    );
    expect(getByTestId("clear-button").props.style.height).toBe(45);
  });

  it("adjusts clear button height based on platform (iOS)", () => {
    Platform.OS = "ios";
    const { getByTestId } = render(
      <SearchBar query="test" setQuery={jest.fn()} placeholder={placeholderText} />
    );
    expect(getByTestId("clear-button").props.style.height).toBe(35);
  });
});
