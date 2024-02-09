import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";



export default EditProfile = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [city, setAge] = React.useState('');
  

  const navigation = useNavigation();

  return (
 
    
    <View style={styles.container}>

<SafeAreaView style={{ flex: 0 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeftIcon size={23} color="white" />
          </TouchableOpacity>
          
        </View>
  
      </SafeAreaView>
    
    <SafeAreaView >
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.txttop}>Edit Profile</Text>  
        </View>
    </SafeAreaView>
      
      

          <View style={styles.form}>   
          <TextInput
              style={styles.input}
              placeholder='Name'
              onChangeText={text => setName(text)}
            />    
            <TextInput
              style={styles.input}      
              placeholder='Surname'
              onChangeText={text => setSurname(text)}
            />
            <TextInput
              style={styles.input}
              placeholder='Country'
              onChangeText={text => setCountry(text)}
            />    
            <TextInput
              style={styles.input}      
              placeholder='City'
              onChangeText={text => setCity(text)}
            />
            <TextInput
              style={styles.input}
              placeholder='Age'
              onChangeText={text => setAge(text)}
            />
           
          </View>
      
     




          <TouchableOpacity
              style={styles.signUpButton} onPress={() => handleDonationAdd()}
            >
              <Text style={styles.signUpButtonText}>
                SAVE
              </Text>
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
  backButton: {
    backgroundColor: '#ff8d20',
    padding: 10,
    borderRadius: 50,
    
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
  

  form: {
    marginBottom: 20,
  },
  formText: {
    color: 'gray',
    marginLeft: 10,
  },
  input: {
    padding: 15,
    backgroundColor: '#F3F3F3',
    color: 'black',
    borderRadius: 20,
    marginBottom: 10,
  
  },
  
  txttop:{
    marginLeft:20,
    fontSize:40,
    color:'black',
    fontWeight: 'bold',
    textAlign:'center',
    marginBottom:40
  },
  signUpButton: {
    backgroundColor: '#ff8d20',
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 150,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
 
});
