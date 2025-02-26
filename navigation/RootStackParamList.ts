import { StackScreenProps } from '@react-navigation/stack';

import { ImageSize } from '../types/Image';

export type RootStackParamList = {
  Products: undefined;
  ProductDetail: {
    id: number;
    largeImageSize: ImageSize | undefined;
    name: string;
    shortDescription: string;
  };
  Cart: undefined;
};

export type DetailProps = StackScreenProps<RootStackParamList, 'ProductDetail'>;
export type ProductListProps = StackScreenProps<RootStackParamList, 'Products'>;
export type CartProps = StackScreenProps<RootStackParamList, 'Cart'>;
