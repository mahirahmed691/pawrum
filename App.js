import React from "react";
import Providers from "./navigation";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { useFonts, Raleway_200ExtraLight } from "@expo-google-fonts/raleway";
import { Dosis_700Bold, Dosis_800ExtraBold } from "@expo-google-fonts/dosis";

export default function App() {
  let [fontsLoaded, error] = useFonts({
    Raleway_200ExtraLight,
    Dosis_700Bold,
    Dosis_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <StripeProvider
      publishableKey="pk_test_51JCSNwFq0BelEmNBPXXfm57fpHbpmplV5ooAuNE8vDQthLaQnm476rysDFjhw6TqiYca1v4WNWSC78NP2iGXolGv00gA83e9WZ"
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}"
    >
      <Providers />
      <StatusBar />
    </StripeProvider>
  );
}
