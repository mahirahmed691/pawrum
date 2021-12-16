import React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { styles } from "../../css/styles";
import { Card } from "react-native-paper";
import { View } from "react-native";
import { StyleSheet } from "react-native";

export default function MapJourney() {
  return (
    <View style={styles.map}>
      <MapView
        initialRegion={{
          latitude: 53.483959,
          longitude: -2.244644,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        mapType={Platform.OS == "android" ? "none" : "standard"}
        provider={MapView.PROVIDER_GOOGLE}
        style={{ ...StyleSheet.absoluteFillObject }}
        showsMyLocationButton={true}
        followsUserLocation
        zoomControlEnabled={true}
        showsUserLocation={true}
        showsPointsOfInterest={true}
        showsBuildings
        showsIndoorsmoveOnMarkerPress
        showsScale={true}
        zoomEnabled={true}
        minZoomLevel={18}
        maxZoomLevel={20}
        showsCompass={true}
        loadingEnabled={true}
        userLocationUpdateInterval={100}
      />
    </View>
  );
}
