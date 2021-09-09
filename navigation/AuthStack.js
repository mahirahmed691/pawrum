import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../components/WelcomeScreen";
import LoginScreen from "../components/LoginScreen";
import RegisterScreen from "../components/RegisterScreen";
import ForgotPasswordScreen from "../components/ForgotPasswordScreen";
import HomeScreen from "../components/HomeScreen";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown: false
    }}
    initialRouteName="Welcome" >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ResetPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
