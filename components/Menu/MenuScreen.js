import React from "react";
import { auth } from "../Firebase/firebase";
import { SafeAreaView, View, Image, Text } from "react-native";
import { Card, IconButton, Title, Switch } from "react-native-paper";
import { List } from "react-native-paper";
import { styles } from "../../css/styles.js";
import header from "../header";
import navBar from "../navBar";

export default function HomeScreen(props) {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const [isDarkOn, setIsDarkOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  const onToggleSwitchDark = () => setIsDarkOn(!isDarkOn);

  return (
    <SafeAreaView style={[styles.container1]}>
      <View style={{ flexDirection: "row" }}>
        <IconButton style={{ marginRight: 0 }} icon="cog" />
        <Title style={{ alignSelf: "center", fontWeight: "bold" }}>
          Settings
        </Title>
      </View>
      <Card
        style={{ margin: 20, marginTop: 0, borderRadius: 20, height: "auto" }}
      >
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
          <Text
            style={{
              color: "black",
              fontFamily: "Dosis_700Bold",
              fontSize: 20,
              margin: 10,
              alignSelf: "center",
            }}
          >
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
        <List.Section title="Account Settings">
          <List.Item
            title="Edit Profile"
            right={(props) => (
              <List.Icon {...props} color="black" icon="chevron-right" />
            )}
            onPress={() => props.navigation.navigate("EditProfile")}
          />
          <List.Item
            title="Change Password"
            right={(props) => (
              <List.Icon {...props} color="black" icon="chevron-right" />
            )}
          />
          <List.Item
            title="Add Payment Method"
            right={(props) => (
              <List.Icon {...props} color="black" icon="plus" />
            )}
          />
          <List.Item
            title="Push Notifications"
            right={(props) => (
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            )}
          />
          <List.Item
            title="Dark Mode"
            right={(props) => (
              <Switch value={isDarkOn} onValueChange={onToggleSwitchDark} />
            )}
          />
        </List.Section>
        <List.Section title="More">
          <List.Item
            title="About Us"
            right={(props) => (
              <List.Icon {...props} color="black" icon="chevron-right" />
            )}
          />
          <List.Item
            title="Privacy Policy"
            right={(props) => (
              <List.Icon {...props} color="black" icon="chevron-right" />
            )}
          />
        </List.Section>
      </Card>
      {navBar(props)}
    </SafeAreaView>
  );
}
