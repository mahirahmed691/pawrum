import React from "react";
import { styles } from "../css/styles.js";
import { IconButton, Provider as PaperProvider } from "react-native-paper";
import { View, Button } from "react-native";

export default function navBar(props) {
  let stockColor = "black";
  let newsColor = "black";
  let searchColor = "black";
  let menuColor = "black";

  return (
    <View style={styles.navBar}>
      <View>
        <IconButton
          icon={"home"}
          style={styles.navButton}
          size={22}
          color={newsColor}
          onPress={() =>
            props.navigation.navigate("Home")
          }
        ></IconButton>
      </View>
      

      <View>
        <IconButton
          icon={"shopping"}
          color={stockColor}
          size={22}
          style={styles.navButton}
          onPress={() =>
            props.navigation.navigate("Store")
          }
        ></IconButton>
      </View>
      <View>
        <IconButton
          icon={"magnify"}
          style={styles.navButton}
          size={22}
          color={searchColor}
          onPress={() =>
            props.navigation.navigate("Search")
          }
        ></IconButton>
      </View>
      <View>
        <IconButton
          icon={"menu"}
          style={styles.navButton}
          size={22}
          color={menuColor}
          onPress={() =>
            props.navigation.navigate("Home")
          }
        ></IconButton>
      </View>
    </View>
  );
}
