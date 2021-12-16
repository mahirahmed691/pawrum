import React from "react";
import { auth } from "../Firebase/firebase";
import { SafeAreaView, View, Image, Text, useColorScheme } from "react-native";
import { Card, IconButton, Title, Switch } from "react-native-paper";
import { List } from "react-native-paper";
import { styles } from "../../css/styles.js";
import header from "../header";
import navBar from "../navBar";

let iconColor = "black";

export default function HomeScreen(props) {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isDarkOn, setIsDarkOn] = React.useState(false);

  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === "light"
      ? styles.lightSettingsThemeText
      : styles.darkSettingsThemeText;
  const iconColorStyle =
    colorScheme === "light" ? (iconColor = "black") : (iconColor = "white");
  const themeContainerStyle =
    colorScheme === "light"
      ? styles.tabPageContainer
      : styles.tabPageContainerDark;
  const themeCardStyle =
    colorScheme === "light" ? styles.lightThemeCard : styles.darkThemeCard;

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const onToggleSwitchDark = () => setIsDarkOn(!isDarkOn);

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <View style={{ flexDirection: "row" }}>
        <IconButton style={{ marginRight: 0 }} color={iconColor} icon="cog" />
        <Title style={[styles.lightThemeTextXL, themeTextStyle]}>
          Settings
        </Title>
      </View>
      <Card style={[styles.lightThemeCard, themeCardStyle]}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 40,
              height: 40,
              margin: 10,
              borderRadius: 40 / 2,
              borderColor: "white",
              borderWidth: 2,
              borderColor: "#9F87D3",
              margin: 20,
              marginRight: 0,
            }}
            source={require("../../assets/profile.jpeg")}
          />
          <Text style={[styles.lightThemeTextUser, themeTextStyle]}>
            {auth.currentUser
              ? auth.currentUser.email.split("@")[0]
              : "unknown user"}{" "}
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "whitesmoke",
            borderBottomWidth: 1,
          }}
        />
        <List.Section
          titleStyle={[styles.lightThemeSettingsText, themeTextStyle]}
          title="Account Settings"
        >
          <List.Item
            titleStyle={[styles.lightThemeSettingsText, themeTextStyle]}
            title="Edit Profile"
            right={(props) => (
              <List.Icon {...props} color={iconColor} icon="chevron-right" />
            )}
            onPress={() => props.navigation.navigate("EditProfile")}
          />
          <List.Item
            titleStyle={[styles.lightSettingsThemeTextXL, themeTextStyle]}
            title="Change Password"
            right={(props) => (
              <List.Icon {...props} color={iconColor} icon="chevron-right" />
            )}
          />
          <List.Item
            titleStyle={[styles.lightSettingsThemeTextXL, themeTextStyle]}
            title="Add Payment Method"
            right={(props) => (
              <List.Icon {...props} color={iconColor} icon="plus" />
            )}
          />
          <List.Item
            titleStyle={[styles.lightSettingsThemeText, themeTextStyle]}
            title="Push Notifications"
            right={(props) => (
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            )}
          />
          <List.Item
            titleStyle={[styles.lightSettingsThemeText, themeTextStyle]}
            title="Dark Mode"
            right={(props) => (
              <Switch value={isDarkOn} onValueChange={onToggleSwitchDark} />
            )}
          />
        </List.Section>
        <List.Section
          titleStyle={[styles.lightThemeSettingsText, themeTextStyle]}
          title="More"
        >
          <List.Item
            titleStyle={[styles.lightSettingsThemeText, themeTextStyle]}
            title="About Us"
            right={(props) => (
              <List.Icon {...props} color={iconColor} icon="chevron-right" />
            )}
          />
          <List.Item
            titleStyle={[styles.lightThemeSettingsText, themeTextStyle]}
            title="Privacy Policy"
            right={(props) => (
              <List.Icon {...props} color={iconColor} icon="chevron-right" />
            )}
          />
        </List.Section>
      </Card>
      {navBar(props)}
    </SafeAreaView>
  );
}
