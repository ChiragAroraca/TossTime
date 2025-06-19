import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import Profile from '../../screens/Profile/Profile';
import Chat from '../../screens/Chat/Chat';
import Icon from 'react-native-vector-icons/Ionicons';
import Bookings from '../../screens/Bookings/Bookings';
import { Poppins } from '../../constants/fonts';
import { colors } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import SessionsCreated from '../../screens/Sessions/Sessions';
import CustomLoader from '../../components/CustomLoader';
import { getPlayerProfile } from '../../redux/store/slices/userSlice';


const HomeStack = () => {
  const user=useSelector((state)=>state.user)
  const dispatch=useDispatch()
  const Tab = createBottomTabNavigator();

  const fetchProfile=async()=>{
     dispatch(getPlayerProfile({}))
     .unwrap()
    .then(async(res) => {
      console.log('Fetched Profile:', res);
    })
    .catch((err) => {
      console.log('Login error:', err?.message);
      Toast.show(err?.message, Toast.SHORT)
      // You can also show a toast or banner using another slice
    });

  }
  useEffect(()=>{
    fetchProfile()
  },[])

  return (
    user.status=='loading'?
    <View style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:colors.white}}>
      <CustomLoader color={colors.theme} size={40}/>
    </View>
    :
    user?.role=='player'?
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          else if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          }
          else if (route.name === 'Chat') {
            iconName = focused ? 'chatbubble' : 'chatbubble-outline';
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: colors.theme,
        tabBarInactiveTintColor: colors.lightGray,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: Poppins.medium,
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 60,
          borderTopColor: colors.lighestGray,
          borderTopWidth: 1,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Bookings" 
        component={Bookings}
        options={{
          tabBarLabel: 'Bookings',
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={Chat}
        options={{
          tabBarLabel: 'Messages',
          tabBarBadge: 3,
          tabBarBadgeStyle: {
            backgroundColor: colors.theme,
            color: colors.white,
            fontSize: 10,
            fontFamily: Poppins.semiBold,
          }
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
    :
     <Tab.Navigator 
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          else if (route.name === 'Sessions') {
            iconName = focused ? 'timer' : 'timer-outline';
          }
          return <Icon name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: colors.theme,
        tabBarInactiveTintColor: colors.lightGray,
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: Poppins.medium,
          marginBottom: 4,
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          height: 60,
          borderTopColor: colors.lighestGray,
          borderTopWidth: 1,
        },
        tabBarItemStyle: {
          paddingVertical: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
       <Tab.Screen 
        name="SessionsCreated" 
        component={SessionsCreated}
        options={{
          tabBarLabel: 'Sessions',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeStack

