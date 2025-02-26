import { Image } from "expo-image";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { productImageStyle } from "./styles";

type ProductImageProps = {
  skuImage: string | null;
  width?: number;
  height?: number;
  largeImage?: boolean
}

const ProductImage: React.FC<ProductImageProps> = ({
  skuImage,
  width = 80,
  height = 80,
  largeImage = false,
}) => {
    const [loading, setLoading] = useState(skuImage != null);
    const [hasError, setHasError] = useState(false);
  
    return (
      <View testID="image-container" style={{...productImageStyle.imageContainer, width: width, height}}>
        {loading && !hasError && (
          <ActivityIndicator
            testID="activity-indicator" 
            size={largeImage ? "large" : "small"} 
            color="#007AFF" 
            style={productImageStyle.loader} 
          />
        )}
        {skuImage != null && !hasError ? (<Image
          testID="sku-image"
          source={{ uri: skuImage }}
          style={productImageStyle.skuImage}
          contentFit="cover"
          onLoadStart={() => {
            if (skuImage != null)  setLoading(true)
          }}
          onError={(_) => setHasError(true)}
          onLoadEnd={() => setLoading(false)}
        />) : <Ionicons testID="placeholder-icon" name="image" size={width} color="#ccc" />
        }
      </View>
    );
  };
  
  export default ProductImage