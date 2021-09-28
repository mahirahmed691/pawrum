import React from "react";
import { styles } from "../css/styles.js";
import { IconButton, Provider as PaperProvider } from "react-native-paper";
import { View, Button } from "react-native";

export default function navBar(props) {
  const navColor = "#a9a9a8";

  return (
    <View style={styles.navBar}>
      <View>
        <IconButton
          icon={"home"}
          style={styles.navButton}
          size={22}
          color={navColor}
          onPress={() =>
            props.navigation.navigate("Home")
          }
        ></IconButton>
      </View>
      

      <View>
        <IconButton
          icon={"shopping"}
          color={navColor}
          size={22}
          style={styles.navButton}
          onPress={() =>
            props.navigation.navigate("Store")
          }
        ></IconButton>
      </View>
      <View>
        <IconButton
          icon={"menu"}
          style={styles.navButton}
          size={22}
          color={navColor}
          onPress={() =>
            props.navigation.navigate("Home")
          }
        ></IconButton>
      </View>
    </View>
  );
}
