import React, {useState, useEffect} from "react";
import { styles } from "../css/styles.js";
import { IconButton, Provider as PaperProvider } from "react-native-paper";
import { View, SafeAreaView, Text, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';


export default function header(props) {
  let stockColor = "black";

  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      
    }
  };

  return (
    <SafeAreaView  style={styles.header}>
      <View style={{marginTop:40, flexDirection:'row', alignItems:'center'}}>
      <IconButton
          icon={"account-outline"}
          color={stockColor}
          size={22}
          onPress={() =>
            props.navigation.navigate("Profile")
          }
        ></IconButton>
      </View>
      <View style={{marginTop:40, flexDirection:'row', alignItems:'center'}}>
        <Text style={{fontFamily:'BradleyHandITCTT-Bold', fontSize:30,color:"black"}}>Pawrum</Text>
      </View>
      <View style={{marginTop:40, flexDirection:"row"}}>
      <IconButton
          icon={"plus"}
          color={stockColor}
          size={22}
          onPress={() =>
            props.navigation.navigate("ImageUpload")
          }
        ></IconButton>
      <IconButton
          icon={"heart"}
          color={stockColor}
          size={22}
          onPress={() =>
            props.navigation.navigate("Store")
          }
        ></IconButton>
        <IconButton
          icon={"bell"}
          color={stockColor}
          size={22}
        ></IconButton>
      </View>
    </SafeAreaView>
  );
}
