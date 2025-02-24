// App.tsx
import React from "react";
import { StatusBar } from "expo-status-bar";
import RootNavigationStack from "./navigation/RootNavigationStack";

export default function App() {
  return (
    <>
      <RootNavigationStack />
      <StatusBar style="auto" />
    </>
  );
}