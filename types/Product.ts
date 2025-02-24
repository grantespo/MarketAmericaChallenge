export interface Product {
    id: string;
    name: string;
    minimumPriceString: string;
    maximumPriceString: string;
    shortDescription: string;
    image: {
      sizes: { url: string }[];
    };
  }