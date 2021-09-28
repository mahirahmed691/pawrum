import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { storage } from './Firebase/firebase';
import ListImageItem from './ListImageItem';
import { styles } from "../css/styles.js";

const ImagesList = () => {
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
    <View style={{marginBottom:100}}>
      <FlatList
      style={{marginTop:0, marginBottom:40}}
        data={urlsUploadedImages}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <ListImageItem uri={item} />}
      />
    </View>
  );
};

export default ImagesList;
