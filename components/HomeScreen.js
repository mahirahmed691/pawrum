import React, { useEffect, useState} from 'react';
import * as Location from 'expo-location';
import { styles } from "../css/styles.js";
import header from "./header.js";
import navBar from "./navBar.js";
import {
  SafeAreaView,
  View,
  Text, 
  Alert
} from 'react-native';
import ImagesList from '../components/ImageList';
import { Title } from 'react-native-paper';
import { Card, Icon } from 'react-native-elements';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function HomeScreen(props) {

  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    'Wait, we are fetching you location...'
  );
  

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const GetCurrentLocation = async () => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
  
    if (status !== 'granted') {
      Alert.alert(
        'Permission not granted',
        'Allow the app to use location service.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
  
    let { coords } = await Location.getCurrentPositionAsync();
  
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });
  
      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
  
        setDisplayCurrentAddress(address);
      }
    }
  };

  const CheckIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        'Location Service not enabled',
        'Please enable your location services to continue',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
        <Title style={{marginTop:120, padding:10, fontFamily:'Avenir-Book', fontWeight:'bold'}}>Home</Title>
        <Text style={{color:"black"}}>{displayCurrentAddress}</Text>
        <Icon style={{marginTop:120, padding:10,}} name="direction" type="entypo" />
        
     </View> 
      <ImagesList />
      {navBar(props)}
      {header(props)}
    </SafeAreaView>
  );
}
