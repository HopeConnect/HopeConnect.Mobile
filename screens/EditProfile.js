import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default EditProfile = () => {
  const [surname, setSurname] = useState('');
  const [userData, setUserData] = useState({
    fullName: '',
    country: '',
    city: '',
    age: '',
    email: '',
    firebaseId: '',
    userImageName: '',
    userImageUrl: '',
  });
  const navigation = useNavigation();

  const handleUpdateProfile = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    var response = await axios.put('http://hopeconnect.somee.com/api/User/UpdateProfile', {
      fullName: userData.fullName,  
      country: userData.country,
      city: userData.city,
      age: userData.age
    }, 
    {
      headers: {
        'Authorization': 'Bearer ' + userToken
      }
    });
    console.log(response);
    if (response.data.responseCode === 200) {
      navigation.navigate('Tabs');
    }
    else {
      alert('Error', response.data.message);
    }
  };

  const handleGetUser = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const response = await axios.get('http://hopeconnect.somee.com/api/User/GetUserByUserFirebaseId', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        const user = response.data.data;
        setUserData(user);
      }
    } catch{
      alert('Error fetching user data');
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      handleGetUser();
    });
  }, []);

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
          placeholder='Full Name'
          value={userData.fullName}
          onChangeText={text => setUserData({...userData, fullName: text})}
        />    
       
        <TextInput
          style={styles.input}
          placeholder='Country'
          value={userData.country}
          onChangeText={text => setUserData({...userData, country: text})}
        />    
        <TextInput
          style={styles.input}      
          placeholder='City'
          value={userData.city}
          onChangeText={text => setUserData({...userData, city: text})}
        />
        <TextInput
          style={styles.input}
          placeholder='Age'
          value={userData.age}
          onChangeText={text => setUserData({...userData, age: text})}
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
