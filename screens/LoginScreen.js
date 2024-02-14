import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

export default function LoginScreen() {
 
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleLogin = async () => {
    try {
      if (email === '' || password === '') {
        alert('Please enter your username and password.');
        return;
      }
      else{
        const response = await axios.post('http://hopeconnect.somee.com/api/Auth/Login', {
          email: email,
          password: password,
          returnSecureToken: true,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.data.responseCode === 200) {
          await AsyncStorage.setItem('userToken', response.data.data);
          console.log(response.data.data);
          navigation.navigate('Tabs');
        }
        else
        {
          console.log(response.data.message)
          alert("Error! " + response.data.message);
        }
      }
    }
    catch (error) {
      console.log('Error! :', error);
    }
  };
  const checkUserToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
      if (userToken) {
        const decodedToken = jwtDecode(userToken);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken && decodedToken.exp && decodedToken.exp < currentTimestamp) {
          await AsyncStorage.removeItem('userToken');
          navigation.navigate('Login');
        } else {
          navigation.navigate('Tabs');
        }
      }
      navigation.navigate('Login');
  }
  useEffect(() => {
    // checkUserToken();
  }, []);
  
  return (
    <View style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <SafeAreaView style={{ flex: 0}}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: '#ff8d20', padding: 10, borderRadius: 50, marginLeft: 10 }}>
            <ArrowLeftIcon size={23}  color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <SafeAreaView style={{ flex: 1, borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: 'white' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
          <Image source={require('../assets/images/hopelogo.jpeg')} style={{ width: 190, height: 190,borderRadius:200 }} />
        </View>

        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={{ marginBottom: 10 }}>
            <Text style={{ color: 'black', marginLeft: 10 }}>Email Address</Text>
            <TextInput
              style={{ padding: 15, backgroundColor: '#F3F3F3', color: 'black', borderRadius: 20, marginBottom: 10 }}
              placeholder="john@gmail.com"
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text style={{ color: 'black', marginLeft: 10 }}>Password</Text>
            <TextInput
              style={{ padding: 15, backgroundColor: '#F3F3F3', color: 'black', borderRadius: 20 }}
              secureTextEntry
              placeholder="test12345"
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
              <Text style={{ color: 'black', marginBottom: 10 }}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity  
            onPress={() => handleLogin()}
            style={{ backgroundColor: '#ff8d20', borderRadius: 20, paddingVertical: 15, marginTop: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop:21, flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
  <View style={{ flex: 1, height: 0.5, backgroundColor: '#ff8d20', marginRight: 10 }} />
  <Text style={{ fontSize: 25, color: '#ff8d20', fontWeight: 'bold', textAlign: 'center' }}>
    Or
  </Text>
  <View style={{ flex: 1, height: 0.5, backgroundColor: '#ff8d20', marginLeft: 10 }} />
</View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#F3F3F3', borderRadius: 20, marginRight: 12 }}>
              <Image source={require('../assets/icons/google.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          
            <TouchableOpacity style={{ padding: 10, backgroundColor: '#F3F3F3', borderRadius: 20 }}>
              <Image source={require('../assets/icons/facebook.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ color: 'gray',  marginTop:-5}}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{ fontWeight: 'bold', color: '#ff8d20',marginLeft:5,marginTop:-5, }}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
