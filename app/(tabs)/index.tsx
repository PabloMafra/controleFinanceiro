import React from "react";
import { AuthProvider } from "@/src/context/AuthProvider";
import AppNavigator from "@/src/components/AppNavigator";

export default function App(): React.JSX.Element {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
