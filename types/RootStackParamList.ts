import { StackScreenProps } from "@react-navigation/stack";
import { ImageSize } from "./Image";

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { 
    id: number,
    largeImageSize: ImageSize | undefined,
    name: string,
    shortDescription: string
   };
};

export type DetailProps = StackScreenProps<RootStackParamList, "ProductDetail">;
export type HomeProps = StackScreenProps<RootStackParamList, "Home">;