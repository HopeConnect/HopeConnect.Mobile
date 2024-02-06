import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FindScreen() {
  const [markers, setMarkers] = useState([{
    latitude: 40.774021,
    longitude: 29.918631,
  }]);

  const GetRecipientLatitudeAndLongitude = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.get('http://hopeconnect.somee.com/api/Recipient/GetRecipientLatitudeAndLongitude', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
      },
    });
    if (response.data.responseCode === 200) {
      const parsedMarkers = response.data.data.map(coord => ({
        latitude: parseFloat(coord.latitude),
        longitude: parseFloat(coord.longitude)
      }));
      setMarkers(parsedMarkers);
    } else {
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    GetRecipientLatitudeAndLongitude();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <MapView style={styles.map}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
          />
        ))}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    width: "100%",
    height: "100%"
  },
});