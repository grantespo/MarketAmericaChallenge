import * as LocalAuthentication from 'expo-local-authentication';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

import styles from './styles';
import CartSkuCard from '../../components/cart/CartSkuCard';
import { useCart } from '../../contexts/CartProvider';
import { CartProps } from '../../navigation/RootStackParamList';

export default function CartScreen({ navigation }: CartProps) {
  const { cartItems, clearCart } = useCart();

  const totalPrice = cartItems
    .reduce((sum, [sku, qty]) => sum + sku.price * qty, 0)
    .toFixed(2);
  const totalQty = cartItems.reduce((sum, [_, qty]) => sum + qty, 0);

  const handlePurchase = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Authenticate to purchase items',
    });

    if (result.success) {
      Alert.alert('Success!', 'Purchase successful!');
      clearCart();
      navigation.pop();
    } else {
      Alert.alert('Purchase Failed', 'Could not verify your identity.');
    }
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Cart is empty</Text>
        </View>
      ) : (
        <>
          <FlatList
            style={{ marginTop: 12 }}
            data={cartItems}
            keyExtractor={(item, index) => `${item[0].id}-${index}`}
            renderItem={({ item }) => <CartSkuCard sku={item[0]} />}
          />
          {totalQty > 0 ? (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buyButton}
                onPress={handlePurchase}
              >
                <Text
                  style={styles.buyButtonText}
                >{`Buy ($${totalPrice})`}</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </>
      )}
    </View>
  );
}
