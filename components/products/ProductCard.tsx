import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { styles } from "./styles";
import { Product } from "../../types/Product";
import { decodeTrademarkSymbols } from "../../utils/decodeTrademarkSymbols";

interface ProductCardProps {
  product: Product;
  navigation: any;
}

const PLACEHOLDER_IMAGE = "";

const ProductCard: React.FC<ProductCardProps> = ({ product, navigation }) => {
    const imageURL = product.image.sizes.length > 0 ? product.image.sizes[0].url : PLACEHOLDER_IMAGE;
    const largeImageSize = product.image.sizes.length > 0 ? product.image.sizes[product.image.sizes.length - 1] :undefined
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate("ProductDetail", { 
        id: product.id,
        largeImageSize,
        name: product.name,
        shortDescription: product.shortDescription,
     })}
    >
      <Image 
        source={{ uri: imageURL }} 
        style={styles.image} 
        contentFit="cover" 
        transition={200} 
      />
      
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{decodeTrademarkSymbols(product.name)}</Text>
        <Text style={styles.description} numberOfLines={2}>{decodeTrademarkSymbols(product.shortDescription)}</Text>
        <Text style={styles.price} numberOfLines={1}>{product.minimumPriceString == product.maximumPriceString ? product.maximumPriceString : `${product.minimumPriceString} - ${product.maximumPriceString}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
