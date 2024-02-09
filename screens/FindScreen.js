import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import MapView, { Marker, GoogleProvider  } from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function FindScreen() {
  const navigation = useNavigation();
  const [markers, setMarkers] = useState([{
    latitude: 37.78825,
    longitude: -122.4324,
    title: 'Test Title',
    description: 'Test Description'
  }]);

  const GetRecipientLatitudeAndLongitude = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.get('http://hopeconnect.somee.com/api/Recipient/GetRecipientLatitudeAndLongitude', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken
      },
    });
    console.log(response.data);
    if (response.data.responseCode === 200) {
      const parsedMarkers = response.data.data.map(coord => ({
        latitude: parseFloat(coord.latitude),
        longitude: parseFloat(coord.longitude),
        title: coord.title,
        description: coord.description
      }));
      setMarkers(parsedMarkers);
    } else {
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    GetRecipientLatitudeAndLongitude();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      GetRecipientLatitudeAndLongitude();
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style='auto' />
      <MapView style={styles.map} provider="google">
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude
            }}
            title={marker.title}
            description={marker.description}
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