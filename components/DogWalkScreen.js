import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Alert, StyleSheet, ScrollView, Text, LogBox, Image, TouchableHighlight, } from 'react-native';
import * as Location from 'expo-location';
import { Chip, IconButton, TextInput, Button, } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RBSheet from "react-native-raw-bottom-sheet";
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
const GOOGLE_PLACES_API_KEY = 'AIzaSyCfI3SqEF5DQP_lWV3vp9AM-tefK5tuYb0';

import { styles } from '../css/styles';
import binData from '../components/binData.json'


const mapStyle = [{
  "featureType": "administrative",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#ffffff"
    }
  ]
},
{
  "featureType": "administrative",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#fffff"
    }
  ]
},
{
  "featureType": "administrative",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#fffff"
    }
  ]
},
{
  "featureType": "administrative.neighborhood",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "lightness": 25
    }
  ]
},
{
  "featureType": "landscape.man_made",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#ffffff"
    }
  ]
},
{
  "featureType": "landscape.man_made",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#cfd4d5"
    }
  ]
},
{
  "featureType": "landscape.natural",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#ffffff"
    }
  ]
},
{
  "featureType": "landscape.natural",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#7492a8"
    }
  ]
},
{
  "featureType": "landscape.natural.terrain",
  "stylers": [
    {
      "visibility": "off"
    }
  ]
},
{
  "featureType": "poi",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#dde2e3"
    }
  ]
},
{
  "featureType": "poi",
  "elementType": "labels.icon",
  "stylers": [
    {
      "saturation": -100
    }
  ]
},
{
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#588ca4"
    }
  ]
},
{
  "featureType": "poi.park",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#98e3bf"
    }
  ]
},
{
  "featureType": "poi.park",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#98e3bf"
    }
  ]
},
{
  "featureType": "poi.sports_complex",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#c6e8b3"
    }
  ]
},
{
  "featureType": "poi.sports_complex",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#bae6a1"
    }
  ]
},
{
  "featureType": "road",
  "elementType": "labels.icon",
  "stylers": [
    {
      "saturation": -45
    },
    {
      "lightness": 10
    },
    {
      "visibility": "on"
    }
  ]
},
{
  "featureType": "road",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#41626b"
    }
  ]
},
{
  "featureType": "road.arterial",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#ffffff"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#c1d1d6"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [
    {
      "color": "#111111"
    }
  ]
},
{
  "featureType": "road.highway",
  "elementType": "labels.icon",
  "stylers": [
    {
      "visibility": "on"
    }
  ]
},
{
  "featureType": "road.highway.controlled_access",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#222222"
    }
  ]
},
{
  "featureType": "road.local",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#111111"
    }
  ]
},
// {
//   "featureType": "transit",
//   "elementType": "labels.icon",
//   "stylers": [
//     {
//       "saturation": -70
//     }
//   ]
// },
{
  "featureType": "transit.line",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#111111"
    }
  ]
},
{
  "featureType": "transit.line",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#111111"
    }
  ]
},
{
  "featureType": "transit.station",
  "elementType": "labels.text.fill",
  "stylers": [
    {
      "color": "#008cb5"
    }
  ]
},
// {
//   "featureType": "transit.station.airport",
//   "elementType": "geometry.fill",
//   "stylers": [
//     {
//       "saturation": -100
//     },
//     {
//       "lightness": -5
//     }
//   ]
// },
{
  "featureType": "water",
  "elementType": "geometry.fill",
  "stylers": [
    {
      "color": "#98e2e3"
    }
  ]
},
{
  featureType: "transit",
  stylers: [
    {
      visibility: "off"
    }
  ]
}
]

export default function DogWalk(props) {

  const GOOGLE_MAPS_APIKEY = 'AIzaSyCfI3SqEF5DQP_lWV3vp9AM-tefK5tuYb0';
  const URL = `https://maps.google.com/maps/api/geocode/json?key=${GOOGLE_MAPS_APIKEY}&latlng=`;
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
 
  const origin = {latitude:53.47919152707387, longitude: -2.2520463571423157}
  const destination = {latitude:54.47919152707387, longitude: -2.2520463571423157}

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const refRBSheet = useRef();


  const [isStopwatchStart, setIsStopwatchStart] = useState(false);
  const [resetStopwatch, setResetStopwatch] = useState(false);

  const options = {
    container: {
      padding: 2,
      borderRadius: 5,
      width: 150,
      margin: 20,
      alignItems: 'center',
    },
    text: {
      fontSize: 25,
      color: '#111',
      fontWeight: 'bold'
    },
  };


  useEffect(() => {

    CheckIfLocationEnabled();


    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);



  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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

    <SafeAreaView style={styles.container1} >
      <View style={{ zIndex: 2, position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: 'white', marginVertical: 0, paddingTop: 50, }}>
        <View
          style={{ flexDirection: 'row' }}
        >
          <GooglePlacesAutocomplete
            styles={{
              predefinedPlacesDescription: {
                color: '#111111',
              },
              textInput: {
                fontFamily: 'Avenir'
              },
              separator: {
                height: 0.3,
                backgroundColor: '#9595ff',
              },
            }}
            currentLocation
            enableHighAccuracyLocation={true}
            placeholder='Where to?'
            returnKeyType={'default'}
            fetchDetails={true}
            minLength={2}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data)
            }}
            query={{
              key: GOOGLE_PLACES_API_KEY,
              language: 'en',
            }}
          />
          <IconButton icon="walk" onPress={() => refRBSheet.current.open()} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
            icon="chevron-left" color="black"

            onPress={() => props.navigation.goBack()}

          />
          <ScrollView horizontal contentContainerStyle={{ justifyContent: 'space-between', marginLeft: 0, alignItems: 'center', paddingRight: 40 }}>
            <IconButton icon="trending-up" color="#111" />
            <IconButton icon="trophy" color="#111" />
            <Chip height={30} style={{ marginRight: 10 }} >Dog Cafe</Chip>
            <Chip height={30} style={{ marginRight: 10 }} >Vets</Chip>
            <Chip height={30} style={{ marginRight: 10 }} >Dog Meet</Chip>
          </ScrollView>
        </View>

      </View>

      <MapView
        mapType={Platform.OS == "android" ? "none" : "standard"}
        provider={MapView.PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
        style={{ ...StyleSheet.absoluteFillObject }}
        showsMyLocationButton={true}
        followsUserLocation
        zoomControlEnabled={true}
        showsUserLocation={true}
        showsPointsOfInterest={true}
        showsBuildings
        showsIndoorsmoveOnMarkerPress
        showsScale={true}
        showsScale={true}
        zoomEnabled={true}
        minZoomLevel={6}
        maxZoomLevel={15}
        showsCompass={true}
        loadingEnabled={true}
        userLocationUpdateInterval={100}
        mapPadding={{ top: 200, right: 0, left: 0, bottom: 50 }}

      >
        <MapViewDirections

          apikey={GOOGLE_PLACES_API_KEY}
          strokeWidth={3}
          strokeColor="orange"
          origin={origin}
          destination={destination}
        />

        {binData.map((data, i) => {
          return (
            <Marker
              key={i}
              coordinate={{
                latitude: data.geometry.longtitude,
                longitude: data.geometry.latitude,
              }}
              description={data.properties.location}
              title={data.properties.Street + " " + data.properties.Location + "\n" + data.properties.Location}
              pinColor="red"
            >
              <Image source={require('../assets/bin.png')} style={{ height: 20, width: 20, }} />
            </Marker>
          )
        }

        )}

      </MapView>
      <View>
        <RBSheet

          ref={refRBSheet}
          height={400}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "#000"
            }
          }}
        >

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, padding: 5, alignItems: 'center' }}>
            <TextInput color="whitesmoke" placeholder="Add a bin" style={{ height: 40, width: '85%', backgroundColor: 'transparent' }} />
            <IconButton icon="radar" style={{ width: '15%', }} />
          </View>

          <IconButton
            icon="refresh"
            onPress={() => {
              setIsStopwatchStart(false);
              setResetStopwatch(true);
            }}>
          </IconButton>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold', fontFamily: "Avenir" }}>Duration</Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold', fontFamily: "Avenir" }}>Distance(Mi)</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent:'flex-start', alignItems:'center' }}>

 
     
                <Stopwatch
                  laps
                  start={isStopwatchStart}
                  // To start
                  reset={resetStopwatch}
                  // To reset
                  options={options}
                  // Options for the styling
                  getTime={(time) => {
                  }}
                />
         

              <Text 
                style={{position:'absolute', left:"70 %", fontSize: 25, color: '#111',fontWeight: 'bold'}} >
                
                 1.2
              </Text>
   
                  

          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <Button
              style={{ borderRadius: 20, padding: 5 }}
              mode="contained"
              width={200}
              color="#111"
              onPress={() => {
                setIsStopwatchStart(!isStopwatchStart);
                setResetStopwatch(false);
              }}>
              <Text>
                {!isStopwatchStart ? 'START' : 'STOP'}
              </Text>
            </Button>
          </View>
        </RBSheet>

      </View>
    </SafeAreaView>
  )
}