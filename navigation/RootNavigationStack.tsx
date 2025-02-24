// src/navigation/Navigation.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/products/HomeScreen";
import ProductDetailScreen from "../screens/products/details/ProductDetailScreen";
import { RootStackParamList } from "../types/RootStackParamList";

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigationStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}