import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../components/HomeScreen";
import StoreScreen from "../components/Store";
import ProfileScreen from "../components/ProfileScreen";
import EditProfileScreen from "../components/EditProfileScreen";
import ImageUploaderScreen from "../components/ImageUploader";
import DogWalkScreen from "../components/DogWalkScreen";
import MenuScreen from "../components/Menu/MenuScreen";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Store" component={StoreScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ImageUpload" component={ImageUploaderScreen} />
      <Stack.Screen name="DogWalk" component={DogWalkScreen} />
      <Stack.Screen name="Menu" component={MenuScreen} />
    </Stack.Navigator>
  );
}
