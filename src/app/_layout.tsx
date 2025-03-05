import "../../global.css";
import { SplashScreen, Stack } from "expo-router";
import { tokenCache } from "@/cache";

import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Provider } from "react-redux";
import store from "../utils/redux/store/Store";
import { useEffect } from "react";

export default function RootLayout() {
  const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY =
    "pk_test_YXJyaXZpbmctbWFuYXRlZS01OS5jbGVyay5hY2NvdW50cy5kZXYk";

  const publishableKey = EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }
  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  });
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <Provider store={store}>
          <Main />
        </Provider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}

const Main = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};
