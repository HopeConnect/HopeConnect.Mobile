import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';

export default function FindScreen() {
  return (
    <View style={styles.container}>
    
      <StatusBar style='auto' />
      <MapView style={styles.map}/>

    </View>
  )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },

  map:{
    width:"100%",
    height:"100%"
  },

});