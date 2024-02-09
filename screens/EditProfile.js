import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default EditProfie = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const navigation = useNavigation();

  const handleUpdateProfile = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    var response = await axios.put('http://hopeconnect.somee.com/api/User/UpdateProfile', {
      fullName: name + ' ' + surname,
      country: country,
      city: city,
      age: age
    }, 
    {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    });
    if (response.responseCode === 200) {
      navigation.navigate('Profile');
    }
    else {
      alert('Error', response.data.message);
    }
  };

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

      <SafeAreaView>
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
        style={styles.signUpButton}
        onPress={() => handleUpdateProfile()}
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
    flex: 1,
  },
  backButton: {
    backgroundColor: '#ff8d20',
    padding: 10,
    borderRadius: 50,
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
  txttop: {
    marginLeft: 20,
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: '#ff8d20',
    borderRadius: 20,
    paddingVertical: 15,
    marginTop: 20,
  },
  signUpButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});