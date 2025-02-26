// RootNavigationStack.test.tsx

import { render, waitFor } from '@testing-library/react-native';
import React from 'react';

import { CartProvider } from '../contexts/CartProvider';
import RootNavigationStack from '../navigation/RootNavigationStack';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

describe('RootNavigationStack', () => {
  it('renders the navigation stack correctly', async () => {
    const { getByText, getByTestId } = render(
      <CartProvider>
        <RootNavigationStack />
      </CartProvider>,
    );

    // Ensure UI updates before making assertions
    await waitFor(() => {
      expect(getByText('Products')).toBeTruthy();
      expect(getByTestId('cart-icon')).toBeTruthy();
    });
  });
});
