import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { styles } from "./styles";
import { Product } from "../../types/Product";

interface ProductCardProps {
  product: Product;
  navigation: any;
}

const PLACEHOLDER_IMAGE = "";

const ProductCard: React.FC<ProductCardProps> = ({ product, navigation }) => {
    const imageUrl = product.image.sizes.length > 0 ? product.image.sizes[0].url : PLACEHOLDER_IMAGE;
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate("ProductDetail", { id: product.id })}
    >
      {/* Use expo-image for better performance */}
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image} 
        contentFit="cover" 
        transition={200} 
      />
      
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{product.shortDescription}</Text>
        
        <Text style={styles.price}>{product.minimumPriceString == product.maximumPriceString ? product.maximumPriceString : `${product.minimumPriceString} - ${product.maximumPriceString}`}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
