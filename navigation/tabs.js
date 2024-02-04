import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";   
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import FindScreen from "../screens/FindScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostScreen from "../screens/PostScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SecondHome from "../screens/SecondHome";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress})=>(
    <TouchableOpacity
        style={{
            top:-35,
            justifyContent:'center',
            alignItems:'center',
            ...styles.shadow
        }}
        onPress={onPress}
    >

        <View style={{
            width:70,
            height:70,
            borderRadius:35,
            backgroundColor:'#ff8d20'
        }}>
            {children}
        </View>        
    </TouchableOpacity>
);

const Tabs = () => {
    return (
        <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#ffffff',
            borderRadius: 20,
            height: 90,
            ...styles.shadow
          },
        }}
      >
            <Tab.Screen name="SecondHome"  component={SecondHome} 
            options={{
                headerShown: false,
                tabBarIcon:({focused}) =>(
                  <View style={{alignItems:'center', justifyContent:'center', top:2}}>
                    <Image
                        source={require('../assets/icons/home.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#ff8d20' : '#748c94'
                        }}
                    />
                    <Text style={{color: focused ? '#ff8d20' : '#748c94', fontSize:12}}>Home</Text>
                  </View>  
                ),
            }} />
            <Tab.Screen name="Find"  component={FindScreen} 
             options={{
                headerShown: false,
                tabBarIcon:({focused}) =>(
                  <View style={{alignItems:'center', justifyContent:'center', top:2}}>
                    <Image
                        source={require('../assets/icons/search.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#ff8d20' : '#748c94'
                        }}
                    />
                    <Text style={{color: focused ? '#ff8d20' : '#748c94', fontSize:12}}>Find</Text>
                  </View>  
                ),
            }} />
            
            
            <Tab.Screen name="Post" component={PostScreen} 
                options={{
                    headerShown: false,
                    tabBarIcon:({focused})=>(
                        <Image
                            source={require('../assets/icons/plus.png')}
                            resizeMode="contain"
                            style={{
                                width:30,
                                height:30,
                                tintColor:'#fff'
                            }}
                        
                        />
                    ),
                    tabBarButton:(props)=>(
                        <CustomTabBarButton {...props}/>
                    )
                }}
            
            />

            <Tab.Screen name="Settings" component={SettingsScreen} 
             options={{
                headerShown: false,
                tabBarIcon:({focused}) =>(
                  <View style={{alignItems:'center', justifyContent:'center', top:2}}>
                    <Image
                        source={require('../assets/icons/archive2.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#ff8d20' : '#748c94'
                        }}
                    />
                    <Text style={{color: focused ? '#ff8d20' : '#748c94', fontSize:12}}>Archive</Text>
                  </View>  
                ),
            }} />
            
            
            <Tab.Screen name="Profile" component={ProfileScreen} 
             options={{
                headerShown: false,
                tabBarIcon:({focused}) =>(
                  <View style={{alignItems:'center', justifyContent:'center', top:2}}>
                    <Image
                        source={require('../assets/icons/user.png')}
                        resizeMode="contain"
                        style={{
                            width:25,
                            height:25,
                            tintColor: focused ? '#ff8d20' : '#748c94'
                        }}
                    />
                    <Text style={{color: focused ? '#ff8d20' : '#748c94', fontSize:12}}>Profile</Text>
                  </View>  
                ),
            }} />
            
        
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow:{
        shadowColor:'black',
        shadowOffset:{
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:7

    }
});

export default Tabs;