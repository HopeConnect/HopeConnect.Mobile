import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, TouchableOpacity ,Text, View, Image, BackHandler } from 'react-native';
import {Provider as PaperProvider, Card, } from 'react-native-paper';
import React from "react";
import { useNavigation } from '@react-navigation/native';

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

export default function App() {
  const navigation = useNavigation();

  return (
    <PaperProvider>
     <ScrollView style={styles.container}>

     <Text style={styles.txttop}>Help Categories</Text>

     <TouchableOpacity   activeOpacity={0.5} 
         onPress={() => navigation.navigate('FoodDetails', {id: 1,})}>
      <Card style={styles.cardBox}>
          <Card.Title 
          right={RightContent1} 
          left={LeftContent1} 
          />
        </Card>
      </TouchableOpacity>

    <TouchableOpacity activeOpacity={0.5} 
         onPress={() => navigation.navigate('ClothesDetails', {
          id: 4,
         })}
    >
      <Card style={styles.cardBox}>
        <Card.Title 
        right={RightContent2} 
        left={LeftContent2} />
      </Card>
    </TouchableOpacity>

    <TouchableOpacity activeOpacity={0.5} 
         onPress={() => navigation.navigate('EducationDetails', {
          id: 3,
         })}>
      <Card style={styles.cardBox}>
        <Card.Title 
        right={RightContent3} 
        left={LeftContent3} />
      </Card>
    </TouchableOpacity>
     
     <TouchableOpacity activeOpacity={0.5} 
         onPress={() => navigation.navigate('AccomodationDetails', {
          id: 2,
         })}>
      <Card style={styles.cardBox}>
        <Card.Title right={RightContent4} left={LeftContent4} />
      </Card>
      </TouchableOpacity>
      
     
     
    </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  cardBox:{
    margin:10,
    backgroundColor:'#ff8d20',
    height:120,
    elevation:5,
    shadowColor: 'black',
    borderRadius:30,
    marginTop:15,
   
  },

  txt:{
    marginTop:40,
    marginRight:20,
    fontSize:25,
    color:'black',
    fontWeight: 'bold',
  },

  txttop:{
    marginTop:60,
    marginLeft:20,
    fontSize:30,
    color:'black',
    marginBottom:5,
    fontWeight: 'bold'
  }



});
