import React from "react";
import Providers from "./navigation";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
   
     return (
        <StripeProvider
        publishableKey="pk_test_51JCSNwFq0BelEmNBPXXfm57fpHbpmplV5ooAuNE8vDQthLaQnm476rysDFjhw6TqiYca1v4WNWSC78NP2iGXolGv00gA83e9WZ"
        merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}"
    
      >
        <Providers />
     </StripeProvider>
  )
}
