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
          "https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/265523225_1295313694320980_9200439423975109236_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=825194&_nc_ohc=OzlWJ8qqj5oAX8I74cn&tn=i2yh3e133jVzKLpB&_nc_ht=scontent-lhr8-1.xx&oh=b117c186726be2d26c840e2529e47d06&oe=61BAB683",
          "https://scontent-lhr8-1.xx.fbcdn.net/v/t39.30808-6/266705376_641944913657663_8763318956946393343_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=825194&_nc_ohc=O6RL3MUkDDcAX-9UyOu&_nc_ht=scontent-lhr8-1.xx&oh=00_AT_nmEk3uG4JzSMwQLgsrNX5AC3wNH94mzhn_83ioOwfxg&oe=61BC80ED",
          "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/266186787_4616677371746020_995480370587329793_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=b9115d&_nc_ohc=VvRQvXWtBlUAX81Q7r8&_nc_ht=scontent-lhr8-2.xx&oh=89fddffbc672b168fcd45963b5642b5b&oe=61BB8078",
          "https://scontent-lhr8-2.xx.fbcdn.net/v/t39.30808-6/264426467_2731761250462457_856292605954201534_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=b9115d&_nc_ohc=Vs-RocujBtEAX9PXIQL&_nc_ht=scontent-lhr8-2.xx&oh=1e4f22f9c4b0391e7bcf76c8477e03e1&oe=61BC0D00",
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
