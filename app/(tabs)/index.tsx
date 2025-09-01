import React from "react";
import { AuthProvider } from "@/src/context/AuthProvider";
import AppNavigator from "@/src/components/AppNavigator";
import { Provider } from "react-redux";
import { store } from "@/src/store";

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </Provider>
  );
}
