import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  IconButton,
  TextInput,
  TextInputMask,
  List,
  Button,
  Text,
} from "react-native-paper";
import { styles } from "../css/styles.js";
import * as firebase from "../components/Firebase/firebase";
import { ActivityIndicator, Image, SafeAreaView, View } from "react-native";
import { storage } from "./Firebase/firebase";
import { ScrollView } from "react-native-gesture-handler";
// import { LarkCompat } from "react-native-image-filter-kit";

import uuid from "uuid";

const arrayOfObjects = [
  { mode: "Normal" },
  { mode: "Clarendon" },
  { mode: "Gingham" },
  { mode: "Moon" },
  { mode: "Lark" },
  { mode: "Reyes" },
];

export default function ImageUploader(props) {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    getPermission();
    getUserData();
  }, []);

  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setImageUri(result.uri);
      console.log(result.uri);
    }
  };

  const getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
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
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", imageUri, true);
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
      props.navigation.goBack();
    }
  };

  function showImageFilters() {
    if (imageUri) {
      return arrayOfObjects.map(({ mode }) => (
        <View>
          <Text
            style={{ marginBottom: 0, marginTop: 10, marginLeft: 10 }}
            key={mode}
          >
            {mode}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: imageUri }}
              style={{
                height: 100,
                width: 100,
                margin: 5,
                resizeMode: "fit",
                border: "solid",
                borderWidth: 0.5,
                borderColor: "#9F87D3",
              }}
            />
          </View>
        </View>
      ));
    }
  }

  return (
    <SafeAreaView style={styles.container1}>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-end",
        }}
      >
        <IconButton icon="camera" color="black" onPress={openCamera} />
        <IconButton icon="image" color="black" onPress={pickImage} />
      </View>

      {!imageUri ? (
        <Image
          source={{
            uri: "https://media.istockphoto.com/vectors/camera-photo-upload-icon-on-isolated-white-background-eps-10-vector-vector-id1248723171?k=20&m=1248723171&s=612x612&w=0&h=K3Cv1zo_db-6LAqCJYCMiiPJdOEgjY89bnrxmV7fPDY=",
          }}
          style={{ width: "100%", height: 400, marginTop: 40 }}
        />
      ) : (
        <Image
          source={{ uri: imageUri }}
          style={{ width: "100%", height: 400, marginTop: 40 }}
        />
      )}

      {!imageUri ? (
        <></>
      ) : (
        <ScrollView horizontal>{showImageFilters()}</ScrollView>
      )}
      <TextInput
        multiline
        placeholder="Write a caption"
        left={<TextInput.Icon name="pencil" />}
      />

      {uploading ? (
        <View>
          <ActivityIndicator color="red" />
        </View>
      ) : (
        <Button
          style={{ width: "60%", alignSelf: "center", marginTop: 20 }}
          disabled={!imageUri}
          mode="contained"
          color="black"
          onPress={uploadImageToBucket}
        >
          Upload
        </Button>
      )}
      <Button
        style={{ width: "60%", alignSelf: "center", marginTop: 20 }}
        mode="contained"
        color="#2CCC9D"
        labelStyle={{
          color: "white",
        }}
        onPress={() => props.navigation.goBack()}
      >
        Cancel
      </Button>
    </SafeAreaView>
  );
}
