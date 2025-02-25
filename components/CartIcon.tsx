import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../contexts/CardProvider";

export const CartIcon = ({ navigation }: { navigation: any }) => {
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce((sum, [_, qty]) => sum + qty, 0);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Cart")}
      style={{ marginRight: 15 }}
    >
      <View>
        <Ionicons name="cart-outline" size={24} color="black" />
        {cartItems.length > 0 && (
          <View
            style={{
              position: "absolute",
              right: -5,
              top: -5,
              backgroundColor: "red",
              borderRadius: 10,
              width: 18,
              height: 18,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
              {totalQuantity}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
