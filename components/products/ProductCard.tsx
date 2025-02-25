import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Product } from "../../types/Product";
import { decodeTrademarkSymbols } from "../../utils/decodeTrademarkSymbols";
import ProductImage from "../common/ProductImage";

interface ProductCardProps {
  product: Product;
  navigation: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, navigation }) => {
    const imageURL = product.image.sizes.length > 0 ? product.image.sizes[0].url : null
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
      <ProductImage skuImage={imageURL}/>
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{decodeTrademarkSymbols(product.name)}</Text>
        <Text style={styles.description} numberOfLines={2}>{decodeTrademarkSymbols(product.shortDescription)}</Text>
        <Text style={styles.price} numberOfLines={1}>{product.minimumPriceString == product.maximumPriceString ? product.maximumPriceString : `${product.minimumPriceString} - ${product.maximumPriceString}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
