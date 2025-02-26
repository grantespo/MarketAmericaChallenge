import { decodeTrademarkSymbols } from './decodeTrademarkSymbols';
import { Product } from '../types/Product';
import { Sku } from '../types/Sku';

export function mapProductOptionsToSkus(product: Product | null): Sku[] {
  return product?.options
    ? product.options.map((option) => ({
        id: option.sku,
        name: decodeTrademarkSymbols(option.name),
        price: option.price,
        priceString: option.priceString,
        inventoryStatus: option.inventoryStatus,
        images: option.images,
      }))
    : [];
}
