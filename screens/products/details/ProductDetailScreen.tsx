import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { getProductDetails } from "../../../services/products";
import { Product } from "../../../types/Product";
import { DetailProps } from "../../../types/RootStackParamList";

export default function ProductDetailScreen({ route }: DetailProps) {
  /*const { id } = route.params;
  const [product, setProduct] = useState<Product>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const details = await getProductDetails(id);
      setProduct(details);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <Text>Loading...</Text>;

  return (
    <View style={{ padding: 20 }}>
      <Image source={{ uri: product.imageUrl }} style={{ width: 200, height: 200 }} />
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
    </View>
  );*/

  return (<></>)
}