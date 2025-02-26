import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Sku } from "../../types/Sku";
import { decodeTrademarkSymbols } from "../../utils/decodeTrademarkSymbols";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { useCart } from "../../contexts/CartProvider";
import ProductImage from "../common/ProductImage";

const SkuCard: React.FC<{ sku: Sku }> = ({ sku }) => {
  const {addToCart} = useCart()
  const skuImage = sku.images.length > 0
    ? sku.images![0].sizes![0].url 
    : null;

    const handleAddToCart = async () => {
      addToCart(sku)
    }

  return (
    <View style={styles.skuCard}>
      <View style={styles.imageContainer}>
        <ProductImage skuImage={skuImage}/>
      </View>      
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
              testID="add-button"
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
