import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { CartIcon } from "../components/CartIcon";
import ProductListScreen from "../screens/products/ProductListScreen";
import ProductDetailScreen from "../screens/products/details/ProductDetailScreen";
import { RootStackParamList } from "./RootStackParamList";
import CartScreen from "../screens/cart/CartScreen";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Products">
        <Stack.Screen
          name="Products"
          component={ProductListScreen}
          options={({ navigation }) => ({
            title: "Products",
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={({ navigation }) => ({
            title: "",
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: "Cart" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
