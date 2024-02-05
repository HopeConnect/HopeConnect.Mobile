import React from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { themeColors } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleRegister = async () => {
    if (email === '' || password === '' || name === '') {
      alert('Please enter your name, email and password.');
      return;
    }
    else{
      var response = await fetch('http://hopeconnect.somee.com/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          fullName: name,
        }),
      });
      var data = await response.json();
      if(data.responseCode === 200){
        navigation.navigate('Login');
        alert("Account created successfully");
      }
      else
      {
        alert(data.message);
      }
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: themeColors.bg }}>
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
          <Image source={require('../assets/images/hopelogo.jpeg')} style={styles.logo} />
        </View>

        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 8 }}>
          <View style={styles.form}>
            <Text style={styles.formText}>Full Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setName(text)}
              placeholder='Please enter your name'
            />
            <Text style={styles.formText}>Email Address</Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              placeholder='Please enter your email address'
              keyboardType='email-address'
              
            />
            <Text style={styles.formText}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              placeholder='Please enter your password'
            />
            <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
              <Text style={styles.signUpButtonText}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={{marginTop:19, flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
  <View style={{ flex: 1, height: 0.5, backgroundColor: '#ff8d20', marginRight: 10 }} />
  <Text style={{ fontSize: 25, color: '#ff8d20', fontWeight: 'bold', textAlign: 'center' }}>
    Or
  </Text>
  <View style={{ flex: 1, height: 0.5, backgroundColor: '#ff8d20', marginLeft: 10 }} />
</View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
            <TouchableOpacity style={styles.iconContainer}>
              <Image source={require('../assets/icons/google.png')} style={styles.icon} />
            </TouchableOpacity>
         
            <TouchableOpacity style={styles.iconContainer}>
              <Image source={require('../assets/icons/facebook.png')} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <View style={styles.loginTextContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}> Login</Text>
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
  iconContainer: {
    padding: 10,
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    marginRight: 12,
  },
  icon: {
    width: 40,
    height: 40,
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
};
