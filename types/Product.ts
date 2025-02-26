import { Image } from './Image';

export interface Product {
  id: number;
  name: string;
  minimumPrice: number;
  minimumPriceString: string;
  maximumPrice: number;
  maximumPriceString: string;
  shortDescription?: string;
  image?: Image;
  reviewData?: {
    count: string;
    rating: number;
  };
  options?: {
    sku: string;
    name: string;
    price: number;
    priceString: string;
    inventoryStatus: string;
    images: Image[];
  }[];
}
