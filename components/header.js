import React, { useState, useEffect } from "react";
import { styles } from "../css/styles.js";
import {
  IconButton,
  Badge,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  View,
  SafeAreaView,
  Text,
  Button,
  Appearance,
  useColorScheme,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Tooltip } from "react-native-elements";

export default function header(props) {
  let stockColor = "#222";

  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === "light" ? (stockColor = "black") : (stockColor = "white");
  const themeContainerStyle =
    colorScheme === "light" ? styles.header : styles.headerDark;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <SafeAreaView style={[styles.header, themeContainerStyle]}>
      <View
        style={{ marginTop: 40, flexDirection: "row", alignItems: "center" }}
      >
        <IconButton
          icon={"account-outline"}
          color={stockColor}
          size={22}
          onPress={() => props.navigation.navigate("Profile")}
        ></IconButton>
      </View>
      <View style={{ marginTop: 40, flexDirection: "row" }}>
        <Text
          style={{
            fontFamily: "BradleyHandITCTT-Bold",
            fontSize: 30,
            color: stockColor,
          }}
        >
          Pawrum
        </Text>
      </View>
      <View style={{ marginTop: 40, flexDirection: "row" }}>
        <IconButton
          icon={"plus-box-outline"}
          color={stockColor}
          size={22}
          onPress={() => props.navigation.navigate("ImageUpload")}
        ></IconButton>
        <IconButton
          icon={"heart"}
          color={stockColor}
          size={22}
          onPress={() => props.navigation.navigate("Store")}
        ></IconButton>
        <IconButton icon={"bell"} color={stockColor} size={22}></IconButton>
      </View>
    </SafeAreaView>
  );
}
