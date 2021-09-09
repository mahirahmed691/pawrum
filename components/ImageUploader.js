
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {IconButton} from 'react-native-paper';
import { styles } from "../css/styles.js";
import * as firebase from '../components/Firebase/firebase'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  View
} from 'react-native';
import uuid from 'uuid';
import { storage } from './Firebase/firebase';

export default function ImageUploader(props) {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getPermission();
    pickImage();
    getUserData();
  }, []);

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const getUserData = async () => {
    await firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserData(documentSnapshot.data());
        }
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);
    }

    if (result.cancelled) {
      props.navigation.goBack()
    }
  };

  const getPictureBlob = (uri) => {
    // https://github.com/expo/expo/issues/2402#issuecomment-443726662
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imageUri, true);
      xhr.send(null);
    });
  };

  const uploadImageToBucket = async () => {
    let blob;
    try {
      setUploading(true);
      blob = await getPictureBlob(imageUri);

      const ref = await storage.ref().child(uuid.v4());
      const snapshot = await ref.put(blob);

      return await snapshot.ref.getDownloadURL();
    } catch (e) {
      alert(e.message);
    } finally {
      blob.close();
      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container1}>
      {uploading ? (
        <View style={{position:"absolute", top:"50%"}}>
          <ActivityIndicator color="red" />
        </View>
      ) : (
        <IconButton  style={{position:'absolute', top:50, right:20}} icon='upload' color='white' onPress={uploadImageToBucket} />
      )}
      <Image source={{ uri: imageUri }} style={{ width: "100%", height: 400, marginTop:60, }} />
      <IconButton style={{position:'absolute', top:50, right:60}} icon="camera" color='white' onPress={pickImage} />

    </SafeAreaView>
  );
}
