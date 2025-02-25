import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  ScrollView, 
  Dimensions
} from "react-native";
import { Image } from "expo-image";
import { getProductDetails } from "../../../services/products";
import { DetailProps } from "../../../types/RootStackParamList";
import { mapProductOptionsToSkus, Product } from "../../../types/Product";
import { styles } from "./styles";
import SkuCard from "../../../components/skus/SkuCard";
import { Sku } from "../../../types/Sku";
import { decodeTrademarkSymbols } from "../../../utils/decodeTrademarkSymbols";
import { calculateDynamicImageHeight } from "../../../utils/calculateDynamicImageHeight";
import ReviewView from "../../../components/products/review/ReviewView";

export default function ProductDetail({ route }: DetailProps) {
  const { id, name, shortDescription, largeImageSize } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [skus, setSkus] = useState<Sku[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductDetails(id);
      setProduct(data);
      setSkus(mapProductOptionsToSkus(data))
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
      {
        largeImageSize ? (
          <Image  source={{ uri: largeImageSize.url }} style={{...styles.productImage, height: calculateDynamicImageHeight(largeImageSize.width, largeImageSize.height, screenWidth)}} contentFit="cover" />
        ) : (null)
      }

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{decodeTrademarkSymbols(name)}</Text>
        <Text style={styles.shortDescription}>{decodeTrademarkSymbols(shortDescription)}</Text>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator style={{marginTop: 30}} size="large" color="#007AFF" />
          </View>
        ) : (
          <>
            <ReviewView reviewData={product?.reviewData}></ReviewView>
            <FlatList
              data={skus}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <SkuCard sku={item} />}
              scrollEnabled={false} // Disable scrolling, let the parent ScrollView handle it
            />
          </>
        )}
      </View>
    </ScrollView>
  );
}
