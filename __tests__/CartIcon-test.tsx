import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CartIcon } from '../components/CartIcon';
import { useCart } from '../contexts/CartProvider';

jest.mock('@expo/vector-icons', () => ({
    Ionicons: 'Ionicons',
}));
  

jest.mock('../contexts/CartProvider', () => ({
  useCart: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockNavigation = { navigate: mockNavigate };

describe('CartIcon', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders cart icon correctly with empty cart', () => {
    (useCart as jest.Mock).mockReturnValue({ cartItems: [] });

    const { queryByText } = render(<CartIcon navigation={mockNavigation} />);

    expect(queryByText('0')).toBeNull();
  });

  it('renders cart quantity when items are present', () => {
    (useCart as jest.Mock).mockReturnValue({
      cartItems: [
        [{ id: 'sku1' }, 2],
        [{ id: 'sku2' }, 3],
      ],
    });

    const { getByText } = render(<CartIcon navigation={mockNavigation} />);

    expect(getByText('5')).toBeTruthy();
  });

  it('calls navigation.navigate when pressed', () => {
    (useCart as jest.Mock).mockReturnValue({ cartItems: [] });

    const { getByTestId } = render(
      <CartIcon navigation={mockNavigation} />
    );

    fireEvent.press(getByTestId('cart-icon'));

    expect(mockNavigate).toHaveBeenCalledWith('Cart');
  });
});
