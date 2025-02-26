import React, { useState, useEffect } from 'react';
import {
  Alert,
  View,
  Text,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';

import { styles } from './styles';
import LargeLoadingSpinner from '../../../components/common/LargeLoadingSpinner';
import ProductImage from '../../../components/common/ProductImage';
import ReviewView from '../../../components/products/review/ReviewView';
import SkuCard from '../../../components/skus/SkuCard';
import { DetailProps } from '../../../navigation/RootStackParamList';
import { getProductDetails } from '../../../services/products';
import { Product } from '../../../types/Product';
import { Sku } from '../../../types/Sku';
import { calculateDynamicImageHeight } from '../../../utils/calculateDynamicImageHeight';
import { decodeTrademarkSymbols } from '../../../utils/decodeTrademarkSymbols';
import { mapProductOptionsToSkus } from '../../../utils/mapProductOptionstoSkus';

export default function ProductDetail({ route }: DetailProps) {
  const { id, name, shortDescription, largeImageSize } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [skus, setSkus] = useState<Sku[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const results = await getProductDetails(id);
      if (results.error) {
        Alert.alert('Error', results.error);
      } else {
        setProduct(results);
        setSkus(mapProductOptionsToSkus(results));
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScrollView style={styles.container}>
      {largeImageSize ? (
        <ProductImage
          skuImage={largeImageSize.url}
          largeImage={true}
          width={screenWidth}
          height={calculateDynamicImageHeight(
            largeImageSize.width,
            largeImageSize.height,
            screenWidth,
          )}
        ></ProductImage>
      ) : null}

      <View style={styles.detailsContainer}>
        <Text style={styles.productName}>{decodeTrademarkSymbols(name)}</Text>
        <Text style={styles.shortDescription}>
          {decodeTrademarkSymbols(shortDescription)}
        </Text>

        {loading ? (
          <LargeLoadingSpinner fullScreen={false} marginTop={30} />
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
