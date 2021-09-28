import React, {useState, useEffect} from "react";
import { styles } from "../css/styles.js";
import { IconButton, Provider as PaperProvider } from "react-native-paper";
import { View, SafeAreaView, Text, Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Tooltip} from 'react-native-elements';


export default function header(props) {
  let stockColor = "#222";


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
      <View style={{marginTop:40, flexDirection:'row'}}>
        <Text style={{fontFamily:'BradleyHandITCTT-Bold', fontSize:30,color:stockColor}}>Pawrum</Text>
      </View>
      <View style={{marginTop:40, flexDirection:"row",}}>
          <Tooltip backgroundColor="whitesmoke"
              containerStyle={{height:100}}
              popover={
                <View style={{flexDirection:'', padding:100}}>
                    <IconButton
                    rippleColor="white"
                    animated={true}
                    icon={"camera"}
                    color={stockColor}
                    size={22}
                    onPress={() =>
                      props.navigation.navigate("ImageUpload")
                    }
                  ></IconButton>
                  <IconButton
                  rippleColor="white"
                  icon={"timer"}
                  color={stockColor}
                  size={22}
                  onPress={() =>
                    props.navigation.navigate("DogWalk")
                  }
                  >Dog Walk</IconButton>
              </View>
          }
            >
            <IconButton
              icon={"plus"}
              color={stockColor}
              size={22}
            ></IconButton>
          </Tooltip>
      
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
