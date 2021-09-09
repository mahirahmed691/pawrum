import React from 'react';
import { IconButton, Provider as PaperProvider } from "react-native-paper";
import { View, Image, StyleSheet } from 'react-native';
const iconColor = "black"

const ListImageItem = ({ uri }) => {
  return (
    
    <View>
      <Image source={{ uri }} style={styles.image} />
      <View style={{ flexDirection:"row", justifyContent:'space-around'}}>
      <IconButton
          icon={"comment-outline"}
          color={iconColor}
          size={22}
          onPress={() =>
            props.navigation.navigate("Store")
          }
        ></IconButton>
      <IconButton
          icon={"heart-outline"}
          color={iconColor}
          size={22}
        ></IconButton>
        <IconButton
          icon={"send"}
          color={iconColor}
          size={22}
        ></IconButton>
      </View>
    </View>  
    
    );
};

export default ListImageItem;

const styles = StyleSheet.create({
  image: {
    marginBottom: 2,
    width: "100%",
    height: 350,
    alignSelf:'center',
  },
});