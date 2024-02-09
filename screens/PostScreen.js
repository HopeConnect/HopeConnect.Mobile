import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default PostScreen = () => {
  const navigation = useNavigation();
  const data = [
    { label: 'Food', value: 1 },
    { label: 'Clothes', value: 4 },
    { label: 'Education', value: 3 },
    { label: 'Accomodation', value: 2 },
  ]; 
  const [baseImage, setBaseImage] = useState(null);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [fullName, setFullName] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');

  const googleMapApiKey = 'AIzaSyAWxvTpAiI5DXGWdbW54fOkJxqk6TsWLt4'; 
  const getLocationCoordinates = async (locationName) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${locationName}&key=${googleMapApiKey}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { latitude: lat.toString(), longitude: lng.toString()};
      } else {
        throw new Error('Konum bulunamadı');
      }
    } catch (error) {
      console.error('Hata:', error);
      throw error;
    }
  };
  const PickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64 : true
    });
    if (!result.cancelled) {
      setBaseImage(result.assets[0].base64);
    }
  };
  const handleDonationAdd = async () => {
    try{
      var userToken = await AsyncStorage.getItem('userToken');
      const locationCoordinates = await getLocationCoordinates(city);
      var response = await axios.post('http://www.hopeconnect.somee.com/api/Recipient/AddRecipient', {
        base64Image: baseImage,  
        title: title,
        name: fullName,
        location: city,
        description: message,
        recipientType: parseInt(value),
        latitude: locationCoordinates.latitude,
        longitude: locationCoordinates.longitude
      },
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        },
      });
      if (response.data.responseCode == 200)
      {
        setCity(null);
        setFullName(null);
        setMessage(null);
        setTitle(null);
        setValue(null);
        setBaseImage(null);
        navigation.navigate('SecondHome');
      }
      else
      {
        console.log('Error: ', response.data.message);
      }
      console.log(response.data);
    }
    catch (error) {
      console.error('Error: ', error);
    }
  }
  return (
    <View style={styles.container}>
      <SafeAreaView >
          <View style={{ alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.txttop}>Post</Text>  
          </View>
      </SafeAreaView>
      <View style={styles.form}>   
          <TextInput
            style={styles.input}
            placeholder='Title'
            onChangeText={text => setTitle(text)}
          /> 
          <TextInput
            style={styles.input}
            placeholder='Full Name'
            onChangeText={text => setFullName(text)}
          />    
          <TextInput
            style={styles.input}
            placeholder='City'
            onChangeText={text => setCity(text)}
          />
          <TextInput
            style={styles.inputmsg}
            placeholder='Message'
            onChangeText={text => setMessage(text)}
          />
      </View>
      <Dropdown
        style={[styles.dropdown,styles.input,styles.form, isFocus && { borderColor: '#ff8d20' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        containerStyle={styles.dropdownContainer}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select Help Catagory' : '.....'} 
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
      <TouchableOpacity style={styles.signUpButton2} onPress={PickImage}>
        <Text style={styles.signUpButtonText2}>
          <Ionicons name="add"  size={25} color="gray"></Ionicons> Choose File
          </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={() => handleDonationAdd()} >
        <Text style={styles.signUpButtonText}> SEND </Text> 
      </TouchableOpacity>
    </View>  
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    flex:1
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    marginTop:-20,
    borderRadius: 20,
    paddingHorizontal:15,
  },
  dropdownContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop:-15,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
   color:'#ff8d20'
  },
  placeholderStyle: {
    fontSize: 14,
    color:'gray'
  },
  selectedTextStyle: {
    fontSize: 14,
    color:'#ff8d20'
  },
  txt:{
    marginTop:25,
    marginRight:27,
    fontSize:25,
    color:'black',
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    padding: 15,
    backgroundColor: '#F3F3F3',
    color: 'black',
    borderRadius: 20,
    marginBottom: 10,
  
  },
  inputmsg: {
    padding: 15,
    height:90,
    backgroundColor: '#F3F3F3',
    color: 'gray',
    borderRadius: 20,
    marginBottom: 10,
  },
  signUpButton2: {
    backgroundColor: '#ff8d20',
    borderRadius: 20,
    paddingVertical: 15,
    marginTop:-10,
    padding: 15,
    backgroundColor: '#F3F3F3',
    color: 'gray',
  },
  signUpButtonText2: {
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#F3F3F3',
    color: 'gray',
  },
  txttop:{
    marginLeft:20,
    fontSize:40,
    color:'black',
    fontWeight: 'bold',
    textAlign:'center',
    marginTop:20,
    marginBottom:20
  },
  signUpButton: {
    backgroundColor: '#ff8d20',
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 10,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  }
});
