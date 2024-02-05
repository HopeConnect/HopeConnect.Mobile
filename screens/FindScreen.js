import { View, Text,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MapView,{Marker} from 'react-native-maps';
import { StatusBar } from 'expo-status-bar';


export default function FindScreen() {

let [markers, setMarkers] = useState([ 
  {
    lat:40.774021,
    long:29.918631,
  },

  {
    lat:39.933365,
    long:32.859741,
  },

  {
    lat:41.002697,
    long:39.716763,
  },

  {
    lat:52.229675,
    long:21.012230,
  },

  {
    lat:50.087811,
    long:14.420460,
  },

  {
    lat:59.911491,
    long:10.757933,
  },

  {
    lat:55.676098,
    long:12.568337,
  },

  {
    lat:48.864716,
    long:2.349014,
  },

  {
    lat:45.464664,
    long:9.188540,
  },

  {
    lat:44.439663,
    long:26.096306,
  },

  

]);



  return (
    <View style={styles.container}>
    
      <StatusBar style='auto' />
      <MapView style={styles.map}> 
        {
          markers.map((e,i)=>(
            
            <Marker coordinate={{latitude:e.lat, longitude:e.long}} />
          ))
        }
      </MapView>

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