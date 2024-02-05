import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SecondHome from '../screens/SecondHome';
import Tabs from './tabs';
import FoodDetails from '../screens/FoodDetails';
import ClothesDetails from '../screens/ClothesDetails';
import EducationDetails from '../screens/EducationDetails';
import AccomodationDetails from '../screens/AccomodationDetails';
import Help from '../screens/Help';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  useEffect(() => {
    checkAuthenticationStatus();
  }, []);
  const checkAuthenticationStatus = async () => 
  {
    try
    {
      const token = await AsyncStorage.getItem('userToken');
      if(token)
      {
        setIsAuthenticated(true);
      }
      else 
      {
        setIsAuthenticated(false);
      }
    }
    catch (error){ console.log('Session status could not be checked', error); }
  }
  if(isAuthenticated){
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Tabs'>
          <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
          <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
          <Stack.Screen name="Tabs" options={{headerShown: false}} component={Tabs}/>
          <Stack.Screen name="SecondHome" options={{headerShown: false}} component={SecondHome}/>
          <Stack.Screen name="FoodDetails" options={{headerShown: false}}  component={FoodDetails}/>
          <Stack.Screen name="ClothesDetails" options={{headerShown: false}}  component={ClothesDetails}/>
          <Stack.Screen name="EducationDetails" options={{headerShown: false}}  component={EducationDetails}/>
          <Stack.Screen name="AccomodationDetails" options={{headerShown: false}}  component={AccomodationDetails}/>
          <Stack.Screen name="Help" options={{headerShown: false}}  component={Help}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  else{
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
        <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
        <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUpScreen} />
        <Stack.Screen name="Tabs" options={{headerShown: false}} component={Tabs}/>
        <Stack.Screen name="SecondHome" options={{headerShown: false}} component={SecondHome}/>
        <Stack.Screen name="FoodDetails" options={{headerShown: false}}  component={FoodDetails}/>
        <Stack.Screen name="ClothesDetails" options={{headerShown: false}}  component={ClothesDetails}/>
        <Stack.Screen name="EducationDetails" options={{headerShown: false}}  component={EducationDetails}/>
        <Stack.Screen name="AccomodationDetails" options={{headerShown: false}}  component={AccomodationDetails}/>
        <Stack.Screen name="Help" options={{headerShown: false}}  component={Help}/>
      </Stack.Navigator>
    </NavigationContainer>
  }
}