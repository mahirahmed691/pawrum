import React, {useState, useEffect, useRef} from 'react';
import { Button } from 'react-native-paper';
import {View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const GOOGLE_PLACES_API_KEY = 'AIzaSyCfI3SqEF5DQP_lWV3vp9AM-tefK5tuYb0';

const GooglePlacesInput = ({coords}) => {

    return (
                    <View>
                        <GooglePlacesAutocomplete
                            placeholder='Where to?'
                            currentLocation={true}
                            returnKeyType={'default'}
                            fetchDetails={true}
                            minLength={2}
                            onPress={(data, details = null) => {
                                // 'details' is provided when fetchDetails = true
                                console.log(data, details);
                            }}
                            query={{
                                key: GOOGLE_PLACES_API_KEY,
                                language: 'en',
                            }}
                        />
                    </View>
  );
};

export default GooglePlacesInput;