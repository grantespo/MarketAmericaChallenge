import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { RootStackParamList } from './RootStackParamList';
import { CartIcon } from '../components/CartIcon';
import CartScreen from '../screens/cart/CartScreen';
import ProductListScreen from '../screens/products/ProductListScreen';
import ProductDetailScreen from '../screens/products/details/ProductDetailScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigationStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Products"
        component={ProductListScreen}
        options={({ navigation }) => ({
          title: 'Products',
          headerRight: () => <CartIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ navigation }) => ({
          title: '',
          headerRight: () => <CartIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Cart' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default RootNavigationStack;
