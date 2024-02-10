import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, TouchableOpacity ,Text, View, Image, BackHandler } from 'react-native';
import {Provider as PaperProvider, Card, } from 'react-native-paper';
import React, {useEffect} from "react";
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
export default function App() {
  const navigation = useNavigation();
  const [donationArchive, setDonationArchive] = React.useState([{}]);
  const getDonationArchive = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.get('http://hopeconnect.somee.com/api/UserActivitiy/GetUserDonationArchive', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    });
    if (response.data.responseCode === 200) {
      setDonationArchive(response.data.data);
      console.log(response.data.data);
    }
    else
    {
      console.log(response.data.message);
    }
  };
  useEffect(() => {
    getDonationArchive();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDonationArchive();
    });
    return unsubscribe;
}, []);

return (
  <PaperProvider>
    <ScrollView style={styles.container}>
      <Text style={styles.txttop}>Archive</Text>
      {donationArchive && donationArchive.length > 0 ? (
        donationArchive.map((donationArchiveItem, index) => (
          <Card style={styles.cardBox} key={index}>
            <Card.Title left={() => <LeftContent imageUrl={donationArchiveItem.imageUrl} />} />
            <Card.Content>
              <Text variant="titleLarge" style={styles.txt}>
              {donationArchiveItem.title} __
              </Text>
              <Text variant="bodyMedium" style={styles.txtdetail} >Name: {donationArchiveItem.name}</Text>
              <Text variant="bodyMedium" style={styles.txtdetail2} >Location: {donationArchiveItem.location}</Text>
              <Text variant="bodyMedium" style={styles.txtdetail} >Recipient Type: {donationArchiveItem.recipientType}</Text>
              <Text variant="bodyMedium" style={styles.txtdetail2} >Date: {donationArchiveItem.donationDate}</Text>
              <Text style={styles.details}>
                {donationArchiveItem.description}
              </Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Card style={styles.cardBox}>
          <Card.Content>
            <Text style={styles.txtdetail3}>You haven't made any donations yet!</Text>
          </Card.Content>
        </Card>
      )}
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
    marginTop:43,
    fontWeight: 'bold',
    textAlign:'center',
    color:'black'
  },


  txtdetail:{
    fontSize:18,
    marginTop:35,
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

  txtdetail3:{
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    color:'#ff8d20'
  },


  details:{
    marginTop:11,
    textAlign:'center',
    padding:12
  }

});

