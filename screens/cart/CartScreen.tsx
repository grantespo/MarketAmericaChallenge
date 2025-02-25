import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useCart } from "../../contexts/CartContext";
import styles from "./styles";
import { CartProps } from "../../types/RootStackParamList";
import * as LocalAuthentication from "expo-local-authentication";
import CartSkuCard from "../../components/cart/CartSkuCard";

export default function CartScreen({ navigation }: CartProps) {
  const { cartItems, clearCart } = useCart();

  const handlePurchase = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to purchase items",
    });

    if (result.success) {
      Alert.alert("Success!", "Purchase successful!");
      clearCart()
      navigation.pop()
    } else {
      Alert.alert("Purchase Failed", "Could not verify your identity.");
    }
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No items have been added to cart</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => `${item[0].id}-${index}`}
            renderItem={({ item }) => <CartSkuCard sku={item[0]} />}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buyButton} onPress={handlePurchase}>
              <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
