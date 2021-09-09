import React from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../utils/colors";

export default function AppTextInput({
  leftIcon,
  width = "80%",
  rightIcon,
  handlePasswordVisibility,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }]}>
      {leftIcon && (
        <MaterialCommunityIcons
          name={leftIcon}
          size={20}
          color={Colors.mediumGrey}
          style={styles.icon}
        />
      )}
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.black}
        {...otherProps}
      />
      {rightIcon && (
        <TouchableOpacity onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons
            name={rightIcon}
            size={20}
            color={Colors.mediumGrey}
            style={styles.rightIconStyles}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgrey",
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    marginVertical: 5,
    alignSelf:'center'
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 1,
    color: "black",
    
  },
  rightIconStyles: {
    alignSelf: "center",
    marginLeft: 10,
  },
});
