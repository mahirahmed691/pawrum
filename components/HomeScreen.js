import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { styles } from "../css/styles.js";
import header from "./header.js";
import navBar from "./navBar.js";
import Stories from "./Stories.js";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  Appearance,
  useColorScheme,
} from "react-native";
import ImagesList from "../components/ImageList";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen(props) {
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "One moment, fetching your location..."
  );

  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.container : styles.containerDark;

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await await Location.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.city}`;

        setDisplayCurrentAddress(address);
      }
    }
  };

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Service not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };
  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <StatusBar />
      <Text
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          zIndex: 2,
          color: "#2CCC9D",
          backgroundColor: "black",
          fontSize: 12,
          fontFamily: "Dosis_800ExtraBold",
          textAlign: "right",
          paddingRight: 5,
          fontWeight: "bold",
        }}
      >
        {displayCurrentAddress}
      </Text>

      <ImagesList />
      {navBar(props)}
      {header(props)}
    </SafeAreaView>
  );
}
