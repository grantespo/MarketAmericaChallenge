// App.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import RootNavigationStack from "./navigation/RootNavigationStack";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <>
      <CartProvider>
        <RootNavigationStack />
      </CartProvider>
      <StatusBar style="auto" />
    </>
  );
}