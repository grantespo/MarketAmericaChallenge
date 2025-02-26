import { Image } from './Image';

export interface Sku {
  id: string;
  name: string;
  price: number;
  priceString: string;
  inventoryStatus: string;
  images: Image[];
}
