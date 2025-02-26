import { render, waitFor } from '@testing-library/react-native';
import { FlatList, Alert, ActivityIndicator } from 'react-native';

import { mockProduct, mockProductWithoutImage } from '../__mocks__/MockProduct';
import ProductListScreen from '../screens/products/ProductListScreen';
import { searchProducts } from '../services/products';
import { Product } from '../types/Product';

jest.mock('../services/products', () => ({ searchProducts: jest.fn() }));
jest.mock('../utils/useDebounce', () => ({ useDebounce: jest.fn(() => '') }));
jest.spyOn(Alert, 'alert');

jest.mock('../components/products/ProductCard', () => {
  const React = require('react');
  const { Text } = require('react-native');
  const ProductCard = jest.fn(({ product }) => <Text>{product.name}</Text>);
  return {
    __esModule: true,
    default: ProductCard,
  };
});

jest.mock('../components/common/SearchBar', () => ({
  __esModule: true,
  default: jest.fn(() => null),
}));

describe('ProductListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches products and renders ProductCard components', async () => {
    const productsMock: Product[] = [mockProduct, mockProductWithoutImage];

    (searchProducts as jest.Mock).mockResolvedValue({ products: productsMock });

    const { getByText } = render(
      <ProductListScreen navigation={{} as any} route={{} as any} />,
    );

    await waitFor(() => {
      expect(getByText('testName')).toBeTruthy();
      expect(getByText('No Image Product™')).toBeTruthy();
    });
  });

  it('loads more products and shows loading indicator', async () => {
    const initialProducts = [mockProduct];
    const moreProducts = [mockProductWithoutImage];

    // Mock initial load (resolves immediately)
    (searchProducts as jest.Mock).mockResolvedValueOnce({
      products: initialProducts,
    });

    // Mock loadMore call (delay resolution)
    (searchProducts as jest.Mock).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ products: moreProducts }), 200);
        }),
    );

    const { UNSAFE_getByType, getByText } = render(
      <ProductListScreen navigation={{} as any} route={{} as any} />,
    );

    // Wait for initial load to complete
    await waitFor(() => expect(getByText('testName')).toBeTruthy());

    const flatList = UNSAFE_getByType(FlatList);

    // Trigger loadMore explicitly
    await waitFor(() => flatList.props.onEndReached());

    // Now loadingMore is true; spinner should appear
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();

    // Wait for loading to finish (spinner disappears)
    await waitFor(() => expect(getByText('No Image Product™')).toBeTruthy());
  });

  it('renders empty message when no products are returned', async () => {
    (searchProducts as jest.Mock).mockResolvedValue({ products: [] });

    const { getByText } = render(
      <ProductListScreen navigation={{} as any} route={{} as any} />,
    );

    await waitFor(() => {
      expect(
        getByText('No products found. Please try a different search query.'),
      ).toBeTruthy();
    });
  });

  it('displays an alert on API error', async () => {
    (searchProducts as jest.Mock).mockResolvedValue({ error: 'API Error' });

    render(<ProductListScreen navigation={{} as any} route={{} as any} />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'API Error');
    });
  });
});
