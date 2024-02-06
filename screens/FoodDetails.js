import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, TouchableOpacity ,Text, View, Image, BackHandler } from 'react-native';
import {Provider as PaperProvider, Card, } from 'react-native-paper';
import React , { useEffect }from "react";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { Avatar, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeftContent1 = props => <Image source={require("../assets/images/meal.png")} style={{marginTop:50,width:80,height:80}}  />
const RightContent1 = props => <Text style={styles.txt}>Food</Text>


const LeftContent2 = props => <Image source={require("../assets/images/clothing.png")} style={{marginTop:50,width:80,height:80}}  />
const RightContent2 = props => <Text style={styles.txt}>Clothes</Text>


const LeftContent3 = props => <Image source={require("../assets/images/education.png")} style={{marginTop:50,width:80,height:80}}  />
const RightContent3 = props => <Text style={styles.txt}>Education</Text>

const LeftContent4 = props => <Image source={require("../assets/images/accomodation.png")} style={{marginTop:50,width:90,height:90}}  />
const RightContent4 = props => <Text style={styles.txt}>Accomodation</Text>

/*const handleCardPress = () => {
  // Kart basıldığında yapılacak işlemler buraya gelecek
  console.log("Karta basıldı!");
  // İstenirse başka bir sayfaya geçiş yapılabilir
 

};
*/

// const LeftContent = props => <Image source={require("../assets/images/user.png")} style={{marginTop:15,width:60,height:60}}  />
const LeftContent = ({ imageUrl }) => (
  <Image source={{ uri: imageUrl }} style={{ marginTop: 40, width: 100, height: 100, borderRadius: 15 }} />
);
export default function App({route}) {
  const navigation = useNavigation();
  const [food, setFood] = React.useState([{}]);
  const getFoodHelp = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    console.log(route.params.id);
    const response = await axios.get('http://hopeconnect.somee.com/api/Recipient/GetRecipientByRecipientType?recipientType=' + route.params.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    });
    if (response.data.responseCode === 200) {
      setFood(response.data.data);
    }
    else
    {
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    getFoodHelp();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFoodHelp();
    });
    return unsubscribe;
  }, []);

  return (
    <PaperProvider>
     <ScrollView style={styles.container}>
        <SafeAreaView style={{ flex: 0}}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ backgroundColor: '#ff8d20', padding: 10, borderRadius: 50, marginLeft: 10 }}>
              <ArrowLeftIcon size={23}  color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <Text style={styles.txttop}>Food</Text>
        {food && food.map((foodItem, index) => (
        <Card style={styles.cardBox} key={index}>
          <Card.Title left={() => <LeftContent imageUrl={foodItem.imageUrl} />} />
          <Card.Content>
            <Text variant="titleLarge" style={styles.txt} key={index}>
              {foodItem.title} ____________________________
            </Text>
          </Card.Content>
          <Text variant="bodyMedium" style={styles.txtdetail} >Name: {foodItem.name} </Text>
          <Text variant="bodyMedium" style={styles.txtdetail2} >Location: {foodItem.location}</Text>
          <Text style={styles.details}>
            {foodItem.description}
          </Text> 
          <TouchableOpacity  
          onPress={() => navigation.navigate('Help', {Id: foodItem.id, type: 'Food'})}
          style={{ backgroundColor: '#ff8d20', borderRadius: 30, marginBottom:10, paddingVertical: 10, marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
              HELP
            </Text>
          </TouchableOpacity>  
        </Card>
        ))}
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  cardBox:{
    margin:10,
    backgroundColor:'white',
  },
  txt:{
    marginTop:-40,
    textAlign:'center',
    fontSize:18,
    color:'black',
    fontWeight: 'bold',
    marginLeft:110
     
  },
  txttop:{
    marginLeft:20,
    fontSize:40,
    color:'black',
    marginBottom:20,
    fontWeight: 'bold',
    textAlign:'center',
    color:'black'
  },
  txtdetail:{
    fontSize:18,
    marginTop:39,
    marginLeft:10,
    fontWeight:'bold',
    color:'#ff8d20',
  },
  txtdetail2:{
    fontSize:15,
    fontWeight:'bold',
    marginTop:10,
    marginLeft:10,
    // fontWeight:'bold',
    // textAlign:'right',
    // marginRight:100
  },
  details:{
    marginTop:11,
    textAlign:'center',
    padding:12
  }
});

