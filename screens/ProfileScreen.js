import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                

                <View style={{ alignSelf: "center" }}>
                    <View style={styles.profileImage}>
                        <Image source={require("../assets/images/hopelogo.jpeg")} style={styles.image} resizeMode="center"></Image>
                    </View>
                    
                  
                    <View style={styles.add}>
                        <Ionicons name="ios-add" size={48} color="white" style={{ marginTop: 2, marginLeft: 3,fontWeight:'bold' }}></Ionicons>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>Julie Wick</Text>
  
                </View>

                

                <View style={styles.statsContainer}>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>483</Text>
                        <Text style={[styles.text, styles.subText]}>Posts</Text>
                    </View>
                    <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                        <Text style={[styles.text, { fontSize: 24 }]}>45,844</Text>
                        <Text style={[styles.text, styles.subText]}>Helps</Text>
                    </View>
                    <View style={styles.statsBox}>
                        <Text style={[styles.text, { fontSize: 24 }]}>302</Text>
                        <Text style={[styles.text, styles.subText]}>Comment</Text>
                    </View>
                </View>

                
                <View style={styles.infoContainer2}>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 20, marginLeft:10,marginTop:10,color:'#ff8d20' }]}>Country: <Text style={{color:'#52575D'}}>Norway</Text> </Text>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 20, marginLeft:10,marginTop:10 }]}>City: Oslo</Text>
                    <Text style={[styles.text, { fontWeight: "200", fontSize: 20, marginLeft:10,marginTop:10}]}>Age: 23</Text>
                </View>

                <TouchableOpacity
                        
                        style={{ paddingVertical: 10, backgroundColor: '#ff8d20', marginHorizontal: 7, borderRadius: 20,marginTop:30  }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                        <Ionicons name="create-outline"  size={24} color="white"></Ionicons>
                        
                            Edit Profile
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        
                        style={{ paddingVertical: 10, backgroundColor: '#ff8d20', marginHorizontal: 7, borderRadius: 20,marginTop:10  }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                        <Ionicons name="close-outline"   size={24} color="white"></Ionicons>
                       
                            Delete Account
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        
                        style={{ paddingVertical: 10, backgroundColor: '#ff8d20', marginHorizontal: 7, borderRadius: 20,marginTop:10  }}
                    >
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
        borderRadius: 100,
        overflow: "hidden",
        marginTop:50
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