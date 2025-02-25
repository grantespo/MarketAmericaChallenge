import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Sku } from "../../types/Sku";
import { decodeTrademarkSymbols } from "../../utils/decodeTrademarkSymbols";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../contexts/CardProvider";
import { styles } from "./styles";
import ProductImage from "../common/ProductImage";

const CartSkuCard: React.FC<{ sku: Sku }> = ({ sku }) => {
  const { addToCart, removeFromCart, cartItems } = useCart();

  const cartItem = cartItems.find(([item]) => item.id === sku.id);
  const quantity = cartItem ? cartItem[1] : 0;

  const skuImage: string | null =
    sku.images.length > 0 ? sku.images[0].sizes[0].url : null

    const totalPrice = ((cartItem?.[0].price ?? 0) * quantity)
    .toFixed(2)

  return (
    <View style={styles.skuCard}>
      <View style={styles.imageContainer}>
        <ProductImage skuImage={skuImage}/>
      </View>  
      <View style={styles.skuDetails}>
        <Text numberOfLines={2} style={styles.skuName}>
          {decodeTrademarkSymbols(sku.name)}
        </Text>
        <View style={styles.footerContainer}>
          <View>
            <Text numberOfLines={1} style={styles.skuPrice}>
              {"$" + totalPrice}
            </Text>
            <View style={styles.qtyView}>
              <TouchableOpacity
                style={styles.qtyButton}
                onPress={() => removeFromCart(sku, false)}
                disabled={quantity < 0}
              >
                <Ionicons name="remove" size={18} color={quantity === 0 ? "#aaa" : "black"} />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity style={styles.qtyButton} onPress={() => addToCart(sku)}>
                <Ionicons name="add" size={18} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(sku, true)}>
            <Ionicons name="cart" size={20} color="white" />
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartSkuCard;
