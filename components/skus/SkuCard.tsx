import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Sku } from "../../types/Sku";
import { decodeTrademarkSymbols } from "../../utils/decodeTrademarkSymbols";
import { styles } from "./styles";

const SkuCard: React.FC<{ sku: Sku }> = ({ sku }) => {
  const skuImage = sku.images.length > 0 
    ? sku.images[0].sizes[0].url 
    : "https://via.placeholder.com/200";

  return (
    <TouchableOpacity style={styles.skuCard}>
      <Image source={{ uri: skuImage }} style={styles.skuImage} contentFit="cover" />
      
      <View style={styles.skuDetails}>
        <Text numberOfLines={2} style={styles.skuName}>{decodeTrademarkSymbols(sku.name)}</Text>
        <Text numberOfLines={1}  style={styles.skuPrice}>{sku.priceString}</Text>
        <View style={[styles.skuStatus, sku.inventoryStatus === "IN_STOCK" ? styles.inStock : styles.outOfStock]}>
          <Text numberOfLines={1}  style={styles.skuStatusText}>
            {sku.inventoryStatus === "IN_STOCK" ? "In Stock" : "Not Available"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SkuCard;
