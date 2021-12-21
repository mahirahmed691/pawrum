import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  useColorScheme,
} from "react-native";
import navBar from "./navBar.js";
import { styles } from "../css/styles.js";
import { Button, Title, IconButton, Badge } from "react-native-paper";

const ITEM_WIDTH = Dimensions.get("window").width;
const COLUMNS = 2;

let iconColor = "#222";
let badgeColor = "#222";

export default function Store(props) {
  const colorScheme = useColorScheme();
  const [count, setCount] = useState(0);

  const themeTextStyle =
    colorScheme === "light"
      ? styles.lightShopThemeText
      : styles.darkShopThemeText;
  const themePriceStyle =
    colorScheme === "light"
      ? styles.lightShopPriceThemeText
      : styles.darkShopPriceThemeText;
  const themeHeaderTextStyle =
    colorScheme === "light"
      ? styles.lightHeaderThemeText
      : styles.darkHeaderThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.container : styles.containerDark;
  const iconColorTheme =
    colorScheme === "light" ? (iconColor = "black") : (iconColor = "white");
  const badgeColorTheme =
    colorScheme === "light" ? (badgeColor = "red") : (badgeColor = "#9595ff");

  return (
    <SafeAreaView style={[styles.container, themeContainerStyle]}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          icon="chevron-left"
          color={iconColor}
          onPress={() => props.navigation.goBack()}
        />

        <View>
          <IconButton color={iconColor} icon="basket" type="feather" />
          <Badge
            size={15}
            style={{
              backgroundColor: badgeColor,
              position: "absolute",
              bottom: 20,
              left: 25,
            }}
          >
            {count}
          </Badge>
        </View>
      </View>

      <ScrollView margin={10} horizontal>
        <Button
          style={{
            marginRight: 10,
            marginBottom: 5,
            height: 35,
            borderRadius: 20,
          }}
          color={iconColor}
          mode="contained"
          icon="filter"
        >
          Sort by
        </Button>
        <Button
          style={{
            marginRight: 10,
            marginBottom: 5,
            height: 35,
            borderRadius: 20,
          }}
          color={iconColor}
          mode="contained"
        >
          Treats
        </Button>
      </ScrollView>

      <ScrollView>
        <View
          style={{
            height: "50%",
            alignItems: "center",
          }}
        >
          <FlatList
            numColumns={2}
            data={[
              {
                title: "Pizzles",
                image: require("../assets/pizzles.jpeg"),
                category: "Treat",
                price: "7.99",
              },
              {
                title: "Jerky",
                image: require("../assets/jerky.jpeg"),
                category: "Treat",
                price: "4.99",
              },
              {
                title: "Animal Ears",
                image: require("../assets/animal-ears.jpeg"),
                category: "Treat",
                price: "12.99",
              },
              {
                title: "Bones",
                image: require("../assets/bone.jpeg"),
                category: "Treat",
                price: "10.99",
              },
              {
                title: "Hooves",
                image: require("../assets/hooves.jpeg"),
                category: "Treat",
                price: "9.99",
              },
              {
                title: "Cookies",
                image: require("../assets/cookies.jpeg"),
                category: "Treat",
                price: "3.99",
              },
            ]}
            renderItem={({ item }) => {
              return (
                <View style={{}}>
                  <Image
                    style={{
                      resizeMode: "contain",
                      width: ITEM_WIDTH / 2 - 20,
                      height: 300,
                      margin: 10,
                      borderRadius: 30,
                      backgroundColor: "white",
                    }}
                    source={item.image}
                  />
                  <IconButton
                    icon="shopping"
                    color="black"
                    style={{
                      backgroundColor: "white",
                      position: "absolute",
                      borderBottomWidth: 3,
                      right: 0,
                      bottom: 0,
                      zIndex: 2,
                    }}
                    onPress={() => setCount(count + 1)}
                    animated={true}
                  />
                  <IconButton
                    icon="heart-outline"
                    color="#9595ff"
                    style={{
                      position: "absolute",
                      right: 10,
                      top: 10,
                      zIndex: 2,
                    }}
                    onPress={() => console.log(item.title)}
                    animated={true}
                  />
                  <Title style={[styles.lightShopThemeText, themeTextStyle]}>
                    {item.title}
                  </Title>
                  <Text
                    style={[styles.lightShopPriceThemeText, themePriceStyle]}
                  >
                    £{item.price}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(index) => {
              return index.title;
            }}
          />
        </View>
        <View style={{ marginTop: 20 }}>
          <Title style={[styles.lightHeaderThemeText, themeHeaderTextStyle]}>
            Top Sales
          </Title>
        </View>
      </ScrollView>
      {navBar(props)}
    </SafeAreaView>
  );
}
