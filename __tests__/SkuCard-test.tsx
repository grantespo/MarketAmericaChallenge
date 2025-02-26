import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';

import {
  skuWithImageInStock,
  skuWithoutImageOutOfStock,
} from '../__mocks__/MockSku';
import SkuCard from '../components/skus/SkuCard';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

const mockAddToCart = jest.fn();
jest.mock('../contexts/CartProvider', () => ({
  useCart: () => ({
    addToCart: mockAddToCart,
  }),
}));

describe('SkuCard Component', () => {
  beforeEach(() => {
    mockAddToCart.mockClear();
  });

  it('renders correctly with image and IN_STOCK', () => {
    const { getByText, getByTestId } = render(
      <SkuCard sku={skuWithImageInStock} />,
    );

    expect(getByText('Product 1™')).toBeTruthy();
    expect(getByText('$25')).toBeTruthy();
    expect(getByText('In Stock')).toBeTruthy();

    expect(getByTestId('add-button')).toBeTruthy();
  });

  it('renders correctly without image and OUT_OF_STOCK', () => {
    const { getByText, queryByTestId } = render(
      <SkuCard sku={skuWithoutImageOutOfStock} />,
    );

    expect(getByText('Product 2™')).toBeTruthy();
    expect(getByText('$30')).toBeTruthy();
    expect(getByText('Not Available')).toBeTruthy();

    expect(queryByTestId('add-button')).toBeNull();
  });

  it("calls addToCart when 'Add' button pressed", () => {
    const { getByTestId } = render(<SkuCard sku={skuWithImageInStock} />);

    fireEvent.press(getByTestId('add-button'));

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(skuWithImageInStock);
  });
});
