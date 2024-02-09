import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import EditProfile from "./EditProfile";

export default function App() {
    const navigation = useNavigation();
    const [baseImage, setBaseImage] = useState(null);
    const [user, setUser] = useState([]);
    const [donationCount, setDonationCount] = useState([0]);
    const [helpNotificationCount, setHelpNotificationCount] = useState([0]);
    const EditProfile = async () => {
        
        navigation.navigate('EditProfile');
    };
    const handleGetUser = async () => {
        var userToken = await AsyncStorage.getItem('userToken');
        try 
        {
            var response = await axios.get('http://hopeconnect.somee.com/api/User/GetUserByUserFirebaseId', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            });
            if (response.data.responseCode === 200) {
                setUser(response.data.data);
            }
            else
            {
                console.log("Response: ", response.data.data);
            }
        }
        catch (error) 
        {
            console.log(error);
        }
            
    };
    const handleSignOut = async () => {
        await AsyncStorage.removeItem('userToken');
        navigation.navigate('Login');
    };
    const handeDeleteAccount = async () => {
        var userToken = await AsyncStorage.getItem('userToken');
        try 
        {
            var response = await axios.delete('http://hopeconnect.somee.com/api/Auth/Delete', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            });
            if (response.data.responseCode === 200) {
                await AsyncStorage.removeItem('userToken');
                navigation.navigate('Login');
            }
            else
            {
                console.log(response.data.responseMessage);
            }
        }
        catch (error) 
        {
            console.log(error);
        }
    };
    const handleGetDonationCount = async () => {
        var userToken = await AsyncStorage.getItem('userToken');
        try 
        {
            var response = await axios.get('http://hopeconnect.somee.com/api/UserActivitiy/GetDonationCount', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            });
            if (response.data.responseCode === 200) {
                setDonationCount(response.data.data);
                navigation.navigate('Tabs');
            }
            else
            {
                console.log(response.data.message);
            }
        }
        catch (error) 
        {
            console.log(error);
        }
    };
    const handeGetUserHelpNtificationCount = async () => {
        var userToken = await AsyncStorage.getItem('userToken');
        try{
            var response = await axios.get('http://www.hopeconnect.somee.com/api/UserActivitiy/GetUserHelpNotificationCount', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            });
            if (response.data.responseCode === 200) {
                setHelpNotificationCount(response.data.data);
            }
            else
            {
                console.log(response.data.responseMessage);
            }
        }
        catch (error) 
        {
            console.log(error);
        }
    }
    const handleProfileImageUpload = async () => {
        var userToken = await AsyncStorage.getItem('userToken');
        console.log("User Token: ", userToken);
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
            base64: true
        });
        if (!result.cancelled) {
            setBaseImage(result.assets[0].base64);
            var response = await axios.put('http://www.hopeconnect.somee.com/api/User/UpdateUserImage', 
            {
                imageBase64: baseImage
            }, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`,
                }
            });
            if (response.data.responseCode === 200) {
                // setUser({...user, userImageUrl: result.assets[0].uri});
                handleGetUser();
                console.log("Response: ", response.data.message);
            }
            else
            {
                console.log("Response: ", response.data.message);
            }
        }
        else{
            console.log("Cancelled");
        }
    };
    useEffect(() => {
        handleGetUser();
        handleGetDonationCount();
        handeGetUserHelpNtificationCount();
    }, []);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleGetUser();
            handleGetDonationCount();
            handeGetUserHelpNtificationCount();
        });
        return unsubscribe;
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={{uri: user.userImageUrl}} style={styles.image} resizeMode="center"></Image>
                    </View>
                    <TouchableOpacity style={styles.add} onPress={handleProfileImageUpload}>
                        <Ionicons name="ios-add" size={48} color="white" style={{ marginTop: 2, marginLeft: 3,fontWeight:'bold' }}></Ionicons>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 28 }]}>{user.fullName}</Text>
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{helpNotificationCount}</Text>
                        <Text style={[styles.text, styles.subText]}>Help Notification</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>{donationCount}</Text>
                        <Text style={[styles.text, styles.subText]}>Helps</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                        <Text style={[styles.text, styles.subText]}>Comment</Text>
                    </View>
                </View>
                <View style={styles.infoContainer2}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 20, marginLeft:10,marginTop:10,color:'#ff8d20' }]}>Country: <Text style={{color:'#52575D'}}>{user.country}</Text> </Text>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 20, marginLeft:10,marginTop:10, color:'#ff8d20'}]}>City:  <Text style={{color:'#52575D'}}>{user.city}</Text></Text>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 20, marginLeft:10,marginTop:10, color:'#ff8d20'}]}>Age: <Text style={{color:'#52575D'}}>{user.age}</Text></Text>
                </View>
                <TouchableOpacity onPress={EditProfile}
                style={{ paddingVertical: 10, backgroundColor: '#ff8d20', marginHorizontal: 7, borderRadius: 20,marginTop:40  }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                        <Ionicons name="create-outline"  size={24} color="white"></Ionicons>
                        Edit Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handeDeleteAccount}
                style={{paddingVertical: 10, backgroundColor: '#ff8d20', marginHorizontal: 7, borderRadius: 20,marginTop:10  }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                        <Ionicons name="close-outline"   size={24} color="white"></Ionicons>
                        Delete Account
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignOut}
                style={{ paddingVertical: 10, backgroundColor: '#ff8d20', marginHorizontal: 7, borderRadius: 20,marginTop:10  }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                        <Ionicons name="log-out-outline"   size={24} color="white"></Ionicons>
                         Sign Out
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#ff8d20",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 200,
        overflow: "hidden",
       marginTop:25
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
  
    add: {
        backgroundColor: "gray",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        fontWeight:'bold',
        
        
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },

    infoContainer2: {
      alignSelf: "left",
      alignItems: "left",
      marginTop: 30
  },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
  
 
 
});