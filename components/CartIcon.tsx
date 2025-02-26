import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useCart } from '../contexts/CartProvider';

export const CartIcon = () => {
  const { cartItems } = useCart();

  const totalQuantity = cartItems.reduce((sum, [_, qty]) => sum + qty, 0);
  const navigation: any = useNavigation();

  return (
    <TouchableOpacity
      testID="cart-icon"
      onPress={() => navigation.navigate('Cart')}
      style={{ marginRight: 15 }}
    >
      <View>
        <Ionicons name="cart-outline" size={24} color="black" />
        {cartItems.length > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -5,
              top: -5,
              backgroundColor: 'red',
              borderRadius: 10,
              width: 18,
              height: 18,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
              {totalQuantity}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
