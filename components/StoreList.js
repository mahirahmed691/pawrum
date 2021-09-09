import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { storage } from './Firebase/firebase';
import { styles } from "../css/styles.js";
import ListImageItem from './ListImageItem';

const StoreList = () => {
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
    <View style={styles.container}>
      <FlatList
      style={{marginTop:50, marginBottom:40}}
        data={urlsUploadedImages}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <ListImageItem uri={item} />}
      />
    </View>
  );
};

export default StoreList;
