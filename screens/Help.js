
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import {Provider as PaperProvider, Card, } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LeftContent2 = props => <Image source={require("../assets/images/helping-hand.png")} style={{width:70,height:70,marginBottom:10,marginLeft:170,marginTop:10}}  />



const RightContent1 = props => <Text style={styles.txt}>$25</Text>


export default function SignUpScreen({route}) {
  const navigation = useNavigation();
  // const [selectedCard, setSelectedCard] = useState(null);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const handleCardPress = (cardValue) => {
    setDonationAmount(cardValue);
  };
  const handleDonationAdd = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.post('http://www.hopeconnect.somee.com/api/UserActivitiy/UserActivityAdd', {
      name: name,
      surname: surname,
      city: city,
      message: message,
      activityId: parseInt(route.params.Id),
      donationAmount: parseFloat(donationAmount),
      donationType: route.params.type,
    },
    {
      headers: {
        'Authorization': `Bearer ${userToken}`,
      },
    });
    if (response.data.responseCode === 200) {
      console.log(response.data.message);
      navigation.navigate('Tabs');
    }
    else
    {
      console.log('Error', response.data.message);
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
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
      <SafeAreaView style={{ flex: 1, borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: 'white' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.txttop}>Help</Text>
        <Card.Title left={LeftContent2} />
        </View>

        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 8 }}>
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

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20,marginTop:20 }}>
            <TouchableOpacity style={{ 
                padding: 30, 
                backgroundColor: donationAmount === 100 ? '#ff8d20' : '#F3F3F3',
                borderRadius: 20, 
                marginRight: 12 
            }}
                onPress={() => handleCardPress(100)}
            >
            <Text style={styles.moneytxt}>$100</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 30, 
               backgroundColor: donationAmount === 150 ? '#ff8d20' : '#F3F3F3',
                 borderRadius: 20, 
                 marginRight: 12 
                 }}
                 onPress={() => handleCardPress(150)}
                 >
            <Text style={styles.moneytxt}>$150</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 30, 
                textAlign:'center', 
                backgroundColor: donationAmount === 200 ? '#ff8d20' : '#F3F3F3',
                 borderRadius: 20,
            
                 }}
                 onPress={() => handleCardPress(200)}
                 >
              <Text style={styles.moneytxt}>$200</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
           
        </View>
        

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
  <View style={{ flex: 1, height: 0.5, backgroundColor: '#ff8d20', marginRight: 10 }} />
  <Text style={{ fontSize: 25, color: '#ff8d20', fontWeight: 'bold', textAlign: 'center' }}>
    Or
  </Text>
  <View style={{ flex: 1, height: 0.5, backgroundColor: '#ff8d20', marginLeft: 10 }} />
</View>

          
          <TextInput
              style={styles.input}
              placeholder='Enter Price Manually'
              onChangeText={text => setDonationAmount(text)}
            />
            <TouchableOpacity
              style={styles.signUpButton} onPress={() => handleDonationAdd()}
            >
              <Text style={styles.signUpButtonText}>
                SEND
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = {
  backButton: {
    backgroundColor: '#ff8d20',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },

  cardBox:{
    margin:10,
    backgroundColor:'#ff8d20',
    height:100,
    width:100,
    elevation:5,
    shadowColor: 'black',
    borderRadius:30,
    marginTop:15,
  },

  cardBox2:{
    margin:10,
    backgroundColor:'#ff8d20',
    height:100,
    width:100,
    elevation:5,
    shadowColor: 'black',
    borderRadius:30,
    marginTop:15,
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
    color: 'gray',
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
    marginTop:-45
  },

};
