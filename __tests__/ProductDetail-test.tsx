import { render, waitFor } from '@testing-library/react-native';
import { FlatList, Alert } from 'react-native';

import { mockProduct } from '../__mocks__/MockProduct';
import ProductDetail from '../screens/products/details/ProductDetailScreen';
import { getProductDetails } from '../services/products';
import { mapProductOptionsToSkus } from '../utils/mapProductOptionstoSkus';

jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
}));

jest.mock('../services/products', () => ({ getProductDetails: jest.fn() }));
jest.mock('../utils/mapProductOptionstoSkus', () => ({
  mapProductOptionsToSkus: jest.fn(),
}));
jest.spyOn(Alert, 'alert');

jest.mock('../components/skus/SkuCard', () => {
  const React = require('react');
  const { Text } = require('react-native');

  const mockSkuCard = jest.fn(({ sku }) => <Text>{sku.id}</Text>);
  return {
    __esModule: true,
    default: mockSkuCard,
  };
});

jest.mock('../components/common/ProductImage', () => () => null);
jest.mock('../components/common/LargeLoadingSpinner', () => () => null);

const mockRoute: any = {
  params: {
    id: Number(mockProduct.id),
    largeImageSize: mockProduct.image!.sizes[0],
    name: mockProduct.name,
    shortDescription: mockProduct.shortDescription,
  },
  name: 'ProductDetail',
  key: 'ProductDetail',
};

describe('ProductDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getProductDetails as jest.Mock).mockResolvedValue(mockProduct);
    (mapProductOptionsToSkus as jest.Mock).mockReturnValue([
      { id: 'sku1' },
      { id: 'sku2' },
    ]);
  });

  it('renders SkuCard components correctly and tests FlatList', async () => {
    const { UNSAFE_getByType } = render(
      <ProductDetail route={mockRoute} navigation={{} as any} />,
    );

    // Wait explicitly for SkuCard to render
    await waitFor(() => {
      expect(Alert.alert).not.toHaveBeenCalled();
      expect(
        require('../components/skus/SkuCard').default,
      ).toHaveBeenCalledTimes(2);
    });

    // Explicitly verify FlatList keyExtractor/renderItem
    const flatList = UNSAFE_getByType(FlatList);

    expect(flatList.props.keyExtractor({ id: 'SKU123' })).toBe('SKU123');

    flatList.props.renderItem({ item: { id: 'SKU123' } });
    expect(flatList.props.renderItem).toBeDefined();
  });

  it('handles API errors explicitly', async () => {
    (getProductDetails as jest.Mock).mockResolvedValue({ error: 'API Error' });

    render(<ProductDetail route={mockRoute} navigation={{} as any} />);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'API Error');
    });
  });
});
