// App.tsx
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { CartProvider } from './contexts/CartProvider';
import RootNavigationStack from './navigation/RootNavigationStack';

const App = () => (
  <>
    <CartProvider>
      <RootNavigationStack />
    </CartProvider>
    <StatusBar style="auto" />
  </>
);

export default App;
