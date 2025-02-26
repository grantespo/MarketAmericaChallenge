// App.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import RootNavigationStack from "./navigation/RootNavigationStack";
import { CartProvider } from "./contexts/CartProvider";

const App = () => (
  <>
    <CartProvider>
      <RootNavigationStack />
    </CartProvider>
    <StatusBar style="auto" />
  </>
);

export default App;
