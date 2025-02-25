import { decodeTrademarkSymbols } from "../utils/decodeTrademarkSymbols";
import { Image } from "./Image";
import { Sku } from "./Sku";

export interface Product {
    id: string;
    name: string;
    minimumPrice: number;
    minimumPriceString: string;
    maximumPrice: number;
    maximumPriceString: string;
    shortDescription: string;
    image: Image,
    reviewData?: {
        count: string,
        rating: number
    },
    options?: {
        sku: string,
        name: string,
        price: number,
        priceString: string,
        inventoryStatus: string,
        images: Image[]
    }[]
  }

  export function mapProductOptionsToSkus(product: Product | null): Sku[] {
    return product?.options ? product.options.map(option => ({
        id: option.sku,
        name: decodeTrademarkSymbols(option.name),
        price: option.price,
        priceString: option.priceString,
        inventoryStatus: option.inventoryStatus,
        images: option.images
    })) : [];
}