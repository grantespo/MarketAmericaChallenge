import { mockImage } from './MockImage';
import { Product } from '../types/Product';

export const mockProduct: Product = {
  options: [
    {
      sku: '123',
      name: 'Awesome Product&reg;',
      price: 19.99,
      priceString: '$19.99',
      inventoryStatus: 'In Stock',
      images: [mockImage, mockImage],
    },
    {
      sku: '456',
      name: 'Another Product&trade;',
      price: 29.99,
      priceString: '$29.99',
      inventoryStatus: 'Out of Stock',
      images: [],
    },
  ],
  id: 1,
  name: 'testName',
  minimumPrice: 10,
  minimumPriceString: '$10',
  maximumPrice: 50,
  maximumPriceString: '$50',
  shortDescription: 'This is a short description',
  image: mockImage,
};

export const mockProductWithoutImage: Product = {
  id: 2,
  name: 'No Image Product™',
  shortDescription: 'No image description®',
  minimumPriceString: '$15',
  maximumPriceString: '$15',
  image: undefined,
  minimumPrice: 15,
  maximumPrice: 15,
};

export const mockProductSearch: Product = {
  id: 3,
  name: 'testName3',
  minimumPrice: 30,
  minimumPriceString: '$30',
  maximumPrice: 50,
  maximumPriceString: '$50',
  shortDescription: 'This is a short description',
  image: mockImage,
};
