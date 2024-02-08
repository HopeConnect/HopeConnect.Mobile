import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const data = [
  { label: 'Food', value: '1' },
  { label: 'Clothes', value: '2' },
  { label: 'Education', value: '3' },
  { label: 'Accomodation', value: '4' },
];


export default DropdownComponent = () => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);



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


            <TouchableOpacity
              style={styles.signUpButton2} onPress={() => handleDonationAdd()}
            >
              <Text style={styles.signUpButtonText2}>
              <Ionicons name="add"  size={25} color="gray"></Ionicons>
                Choose File
              </Text>
            </TouchableOpacity>


          <TouchableOpacity
              style={styles.signUpButton} onPress={() => handleDonationAdd()}
            >
              <Text style={styles.signUpButtonText}>
                SEND
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
    marginLeft: 10,
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
  
  
  txttop:{
    marginLeft:20,
    fontSize:60,
    color:'black',
    fontWeight: 'bold',
    textAlign:'center',
    marginTop:-100
  },
 

  txt:{
    marginTop:25,
    marginRight:27,
    fontSize:25,
    color:'black',
    fontWeight: 'bold',
  },

  moneytxt:{
    fontSize:25,
    color:'black',
    fontWeight: 'bold',
  },


  logo: {
    width: 175,
    height: 175,
   borderRadius:200,
   marginBottom:-10
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

  inputmsg: {
    padding: 15,
    height:90,
    backgroundColor: '#F3F3F3',
    color: 'gray',
    borderRadius: 20,
    marginBottom: 10,
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
  },
  signUpButton2: {
    backgroundColor: '#ff8d20',
    borderRadius: 20,
    paddingVertical: 15,
    marginTop:-10,
    padding: 15,
    marginBottom:90,
    backgroundColor: '#F3F3F3',
    color: 'gray',
  },
  signUpButtonText2: {
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: '#F3F3F3',
    color: 'gray',
  },
  orText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  
  loginTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: 'gray',
    fontWeight: 'bold',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#ff8d20',
    marginLeft:5,
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
  },
 
});
