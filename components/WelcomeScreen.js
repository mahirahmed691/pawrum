import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text,View, SafeAreaView, Dimensions } from 'react-native';
import {Button} from 'react-native-paper';
import { Icon } from 'react-native-elements'
import { styles } from "../css/styles";
export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>              
            <View style={styles.topContainer}>
                <Icon style={styles.logo} size={40} color="black" name="paw" type="fontisto"></Icon>
            </View>

            <View style={{alignSelf:'center'}}>
                    <Text style={{textAlign:'justify', fontFamily:"Avenir", fontWeight:'bold', fontSize:30, color:"black"}}>Experience the {"\n"}real pet care</Text>
            </View>


            <View style={styles.bottomContainer}>       
                <Button style={styles.button} mode="contained"  onPress={() => navigation.navigate("Home")}>Lets get started</Button>
                <Button style={styles.button} mode="contained"  onPress={() => navigation.navigate("Login")}>Sign In</Button>
            </View>
    </SafeAreaView>
  );
}


