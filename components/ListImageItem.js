import React, { useState } from "react";
import { Input } from "react-native-elements";
import {
  user,
  uid,
  logout,
  auth,
  verifyEmail,
} from "../components/Firebase/firebase";
import { IconButton, Provider as PaperProvider } from "react-native-paper";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Appearance,
  useColorScheme,
} from "react-native";
import { styles } from "../css/styles";

const heartColor = "#9F87D3";
const commentColor = "#2CCC9D";
const refreshColor = "orange";

const generateRandomNumber = () => {
  var randomNumber = Math.floor(Math.random() * 1000) + 1;
  return randomNumber;
};

const ListImageItem = ({ uri }) => {
  const inputAccessoryViewID = "uniqueID";
  const initialText = "";
  const [text, setText] = useState(initialText);
  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{
            width: 40,
            height: 40,
            margin: 10,
            borderRadius: 40 / 2,
            borderColor: "white",
            borderWidth: 2,
            borderColor: "#9F87D3",
          }}
          source={require("../assets/profile.jpeg")}
        />
        <Text
          style={{
            color: "#9F87D3",
            fontFamily: "Dosis_800ExtraBold",
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          {auth.currentUser
            ? auth.currentUser.email.split("@")[0]
            : "unknown user"}{" "}
        </Text>
      </View>
      <Image source={{ uri }} style={styles.image} />
      <View
        style={{ flexDirection: "row", backgroundColor: "black", padding: 5 }}
      >
        <IconButton
          icon={"heart-outline"}
          color={heartColor}
          size={22}
        ></IconButton>
        <IconButton
          icon={"comment-quote"}
          color={commentColor}
          size={22}
        ></IconButton>

        <IconButton icon={"share"} color={refreshColor} size={22}></IconButton>
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={[styles.lightThemeText, themeTextStyle]}>
          <Text
            style={{
              color: "#9F87D3",
              fontFamily: "Dosis_800ExtraBold",
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            {auth.currentUser
              ? auth.currentUser.email.split("@")[0]
              : "unknown user"}
            {": "}
          </Text>
          Enjoying some quality time
        </Text>
      </View>
      <Text
        style={{
          marginLeft: 10,
          marginTop: 10,
          color: "grey",
          fontFamily: "GillSans-Light",
        }}
      >
        View all {generateRandomNumber()} comments
      </Text>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={{
            width: 30,
            height: 30,
            margin: 10,
            borderRadius: 40 / 2,
            borderColor: "white",
            borderWidth: 0.5,
          }}
          source={require("../assets/profile.jpeg")}
        />

        <Input
          placeholder="Add comment"
          leftIcon={{
            type: "material-community",
            name: "comment-quote-outline",
          }}
          containerStyle={{ width: "80%" }}
          fontSize={12}
        />
      </View>
    </View>
  );
};

export default ListImageItem;
