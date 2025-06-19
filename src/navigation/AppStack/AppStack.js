import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/Home/Home';
import Profile from '../../screens/Profile/Profile';
import Chat from '../../screens/Chat/Chat';
import Icon from 'react-native-vector-icons/Ionicons';
import Bookings from '../../screens/Bookings/Bookings';
import { createStackNavigator } from '@react-navigation/stack';
import HomeStack from '../HomeStack/HomeStack';
import FacilityDetail from '../../screens/FacilityDetail/FacilityDetail';
import CreateSession from '../../screens/CreateSession/CreateSession';
import SessionListing from '../../screens/SessionListing/SessionListing';

// Import your assets
const colors = {
    white:'rgba(255, 255, 255, 1)',
    black:'rgba(0,0,0,1)',
    theme:'#FF6B35',
    greenishBlue:'#4ECDC4',
    lightBlue:'#4A90E2',
    yellow:'#FFE66D',
    bluishGray:'#8B9DC3',
    gray:'#2C3E50',
    lighestGray:'#D1D5DB',
    lightGray:'#7F8C8D',
    darkGray:'#0F1419',
}

const Poppins = {
    black: 'PoppinsBlack',
    bold: 'PoppinsBold',
    light: 'PoppinsLight',
    medium: 'PoppinsMedium',
    regular: 'PoppinsRegular',
    semiBold: 'PoppinsSemiBold'
}

const AppStack = () => {
const Stack=createStackNavigator()  
  return (
     <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='HomeStack' component={HomeStack}/>
      <Stack.Screen name='FacilityDetail' component={FacilityDetail}/>
      <Stack.Screen name='SessionListing' component={SessionListing}/>
      <Stack.Screen name='CreateSession' component={CreateSession}/>
    </Stack.Navigator>
  )
}
export default AppStack

const styles = StyleSheet.create({
  customTabBar: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderTopColor: colors.lighestGray,
    borderTopWidth: 1,
  },
  
  // Alternative floating tab bar style
  floatingTabBar: {
    backgroundColor: colors.white,
    borderRadius: 25,
    marginHorizontal: 20,
    marginBottom: 20,
    position: 'absolute',
    elevation: 8,
    shadowColor: colors.gray,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    height: 65,
  }
})