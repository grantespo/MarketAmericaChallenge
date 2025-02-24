import { StackScreenProps } from "@react-navigation/stack";

export type RootStackParamList = {
  Home: undefined;
  ProductDetail: { id: number };
};

export type DetailProps = StackScreenProps<RootStackParamList, "ProductDetail">;
export type HomeProps = StackScreenProps<RootStackParamList, "Home">;