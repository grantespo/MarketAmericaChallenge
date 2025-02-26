import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useCart } from '../contexts/CartProvider';
import CartSkuCard from '../components/cart/CartSkuCard';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

jest.mock('../contexts/CartProvider', () => ({
    useCart: jest.fn(),
  }));

jest.mock('../components/common/ProductImage', () => 'ProductImage');

const mockSku = {
  id: 'sku123',
  name: 'Test Product&reg;',
  price: 10.0,
  priceString: '$10.00',
  inventoryStatus: 'In Stock',
  images: [{ sizes: [{ url: 'testimage.png', width: 100, height: 100 }], caption: '' }],
};

const mockAddToCart = jest.fn();
const mockRemoveFromCart = jest.fn();

describe('CartSkuCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useCart as jest.Mock).mockReturnValue({
      cartItems: [[mockSku, 2]],
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    });
  });

  it('renders correctly and shows quantity', () => {
    const { getByText } = render(<CartSkuCard sku={mockSku} />);

    expect(getByText('Test Product®')).toBeTruthy();
    expect(getByText('$20.00')).toBeTruthy(); // 2 items * $10.00 each
    expect(getByText('2')).toBeTruthy();
  });

  it('renders product image correctly', () => {
    const { getByTestId } = render(<CartSkuCard sku={mockSku} />);

    expect(getByTestId('product-image')).toBeTruthy();
  });

  it('calls removeFromCart (false) on minus press', () => {
    const { getByTestId } = render(<CartSkuCard sku={mockSku} />);
    fireEvent.press(getByTestId('minus-button'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockSku, false);
  });
  
  it('calls addToCart on plus press', () => {
    const { getByTestId } = render(<CartSkuCard sku={mockSku} />);
    fireEvent.press(getByTestId('plus-button'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockSku);
  });
  
  it('calls removeFromCart (true) on remove press', () => {
    const { getByTestId } = render(<CartSkuCard sku={mockSku} />);
    fireEvent.press(getByTestId('remove-all-button'));
    expect(mockRemoveFromCart).toHaveBeenCalledWith(mockSku, true);
  });

  it('handles SKU with no images gracefully', () => {
    const skuNoImages = { ...mockSku, images: [] };
    const { getByTestId } = render(<CartSkuCard sku={skuNoImages} />);

    expect(getByTestId('product-image')).toBeTruthy();
  });

  it('handles SKU not in cart correctly (quantity 0)', () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [],
      addToCart: mockAddToCart,
      removeFromCart: mockRemoveFromCart,
    });

    const { getByText } = render(<CartSkuCard sku={mockSku} />);

    expect(getByText('0')).toBeTruthy();
    expect(getByText('$0.00')).toBeTruthy();
  });
});
