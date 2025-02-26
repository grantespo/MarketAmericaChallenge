import { mockImage } from './MockImage';
import { Sku } from '../types/Sku';

export const mockSku: Sku = {
  id: '123',
  name: 'Awesome Product®',
  price: 19.99,
  priceString: '$19.99',
  inventoryStatus: 'In Stock',
  images: [mockImage, mockImage],
};

export const skuWithImageInStock: Sku = {
  name: 'Product 1™',
  priceString: '$25',
  inventoryStatus: 'IN_STOCK',
  images: [
    {
      sizes: [
        {
          width: 40,
          height: 40,
          url: 'http://sku-image.jpg',
        },
      ],
    },
  ],
  id: 'SKU124',
  price: 25,
};

export const skuWithoutImageOutOfStock: Sku = {
  name: 'Product 2™',
  priceString: '$30',
  inventoryStatus: 'OUT_OF_STOCK',
  images: [],
  id: 'SKU125',
  price: 30,
};
