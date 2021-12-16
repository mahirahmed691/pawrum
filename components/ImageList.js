import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  RefreshControl,
  Image,
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { storage } from "./Firebase/firebase";
import ListImageItem from "./ListImageItem";
import { styles } from "../css/styles.js";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function ImagesList(props) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
    setURLsToFilesInBucket();
  }, []);

  function showEmptyListView() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{
            width: 120,
            height: 120,
            alignSelf: "center",
            borderRadius: 60,
          }}
          source={{
            uri: "https://i.pinimg.com/originals/86/f5/e8/86f5e80df5da3b112dc7fe56156b454c.png",
          }}
        />
        <Text
          style={{
            fontFamily: "Dosis_800ExtraBold",
            textAlign: "center",
            marginTop: 20,
            fontSize: 20,
          }}
        >
          Your feed is empty
        </Text>
      </View>
    );
  }

  const [urlsUploadedImages, setURLsUploadedImages] = useState(null);

  useEffect(() => {
    setURLsToFilesInBucket();
  }, []);

  const setURLsToFilesInBucket = async () => {
    const imageRefs = await storage.ref().listAll();
    const urls = await Promise.all(
      imageRefs.items.map((ref) => ref.getDownloadURL())
    );
    setURLsUploadedImages(urls);
  };

  return (
    <View>
      <FlatList
        style={{ marginTop: 45, marginBottom: 45 }}
        data={urlsUploadedImages}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <ListImageItem uri={item} />}
        ListEmptyComponent={showEmptyListView()}
        refreshControl={
          <RefreshControl
            title="Loading new posts"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
}
