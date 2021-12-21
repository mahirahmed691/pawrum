import React, { useEffect, useState } from "react";
import { styles } from "../css/styles";
import {
  user,
  uid,
  logout,
  auth,
  verifyEmail,
} from "../components/Firebase/firebase";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  useWindowDimensions,
  Appearance,
  useColorScheme,
} from "react-native";
import { IconButton, Button, Card } from "react-native-paper";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import GridImageView from "react-native-grid-image-viewer";
import { ScrollView } from "react-native-gesture-handler";
import MapJourney from "../components/Maps/MapJourney";
import header from "./header";
import navBar from "./navBar";

let colorScheme = [];

export default function ProfileScreent(props) {
  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light"
      ? styles.tabPageContainer
      : styles.tabPageContainerDark;
  const tabContainerStyle =
    colorScheme === "light" ? styles.tabContainer : styles.tabContainerDark;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const PostsRoute = () => (
    <View style={[styles.tabPageContainer, themeContainerStyle]}>
      <GridImageView
        data={[
          "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1041987488.jpg",
          "https://i.redd.it/tthkpajhwyp61.jpg",
          "https://i.redd.it/g01erl6il1h41.jpg",
          "https://i.pinimg.com/originals/97/4a/1e/974a1e3d3ae653700401e4819df79715.jpg",
        ]}
      />
    </View>
  );

  const MapsRoute = () => (
    <ScrollView style={[styles.tabPageContainer, themeContainerStyle]}>
      <Card>{MapJourney()}</Card>
    </ScrollView>
  );

  const RewardsRoute = () => (
    <View style={[styles.tabPageContainer, themeContainerStyle]} />
  );

  const renderScene = SceneMap({
    Posts: PostsRoute,
    Routes: MapsRoute,
    Rewards: RewardsRoute,
  });
  const [routes] = React.useState([
    { key: "Posts", title: "Posts" },
    { key: "Routes", title: "Routes" },
    { key: "Rewards", title: "Rewards" },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "pink" }}
      style={[styles.tabContainer, tabContainerStyle]}
      labelStyle={[styles.lightText, themeTextStyle]}
    />
  );
  return (
    <SafeAreaView style={[styles.container, tabContainerStyle]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#9F87D3",
        }}
      >
        <IconButton
          icon="chevron-left"
          color="white"
          onPress={() => props.navigation.goBack()}
        />
        <IconButton
          icon="paw"
          color="white"
          onPress={() => props.navigation.navigate("EditProfile")}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#9F87D3",
        }}
      >
        <View>
          <Image
            style={{
              width: 75,
              height: 75,
              alignSelf: "center",
              margin: 10,
              borderRadius: 75 / 2,
              borderColor: "white",
              borderWidth: 0.5,
            }}
            source={require("../assets/profile.jpeg")}
          />
          <Text
            style={{
              color: "white",
              fontFamily: "Avenir",
              fontSize: 20,
              margin: 10,
            }}
          >
            {auth.currentUser
              ? auth.currentUser.email.split("@")[0]
              : "unknown user"}{" "}
          </Text>
        </View>
      </View>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      {navBar(props)}
    </SafeAreaView>
  );
}
