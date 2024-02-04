import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'

export default function WelcomeScreen() {
    const navigation = useNavigation();
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
            <View style={{ flex: 1, justifyContent: 'around', marginTop: 4 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 34, textAlign: 'center',marginTop:50 }}>
                    Let's Get Started!
                </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center',marginTop:30 }}>
                    <Image 
                        source={require("../assets/images/hopelogo.jpeg")}
                        style={{ width: 350, height: 350 }} 
                    />
                </View>
                <View style={{ marginTop: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        style={{ paddingVertical: 10, backgroundColor: '#ff8d20', marginHorizontal: 7, borderRadius: 20,marginTop:30  }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: 'white' }}>
                            SIGN UP
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold',marginTop:5 }}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={{ fontWeight: 'bold', color: '#ff8d20',marginLeft:5,marginTop:5,  }}> Log In</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </SafeAreaView>
    );
}
