import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Sku } from "../../types/Sku";
import { decodeTrademarkSymbols } from "../../utils/decodeTrademarkSymbols";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useCart } from "../../contexts/CartContext";

const SkuCard: React.FC<{ sku: Sku }> = ({ sku }) => {
  const {addToCart} = useCart()
  const skuImage = sku.images.length > 0 
    ? sku.images[0].sizes[0].url 
    : "https://via.placeholder.com/200";

    const handleAddToCart = async () => {
      addToCart(sku)
    }

  return (
    <View style={styles.skuCard}>
      <Image source={{ uri: skuImage }} style={styles.skuImage} contentFit="cover" />
      
      <View style={styles.skuDetails}>
        <Text numberOfLines={2} style={styles.skuName}>{decodeTrademarkSymbols(sku.name)}</Text>
        <View style={styles.footerContainer}>
          <View>
            <Text numberOfLines={1}  style={styles.skuPrice}>{sku.priceString}</Text>
            <View style={[styles.skuStatus, sku.inventoryStatus === "IN_STOCK" ? styles.inStock : styles.outOfStock]}>
              <Text numberOfLines={1} style={styles.skuStatusText}>
                {sku.inventoryStatus === "IN_STOCK" ? "In Stock" : "Not Available"}
              </Text>
            </View>
          </View>
          {sku.inventoryStatus === "IN_STOCK" ? (
            <TouchableOpacity 
              style={{...styles.addButton}} 
              onPress={handleAddToCart}>
                <Ionicons name="cart" size={20} color="white" />
                <Text style={styles.addButtonText}>{"Add"}</Text>
            </TouchableOpacity>
          ) : (null)
          }
        </View>
      </View>
    </View>
  );
};

export default SkuCard;
