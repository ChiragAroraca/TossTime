import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../screens/Login/Login';
import Register from '../../screens/Register/Register';
import StepOnePlayer from '../../screens/Register/Player/StepOnePlayer';
import StepOneFacility from '../../screens/Register/FacilityManager/StepOneFacility';
import SubscriptionScreen from '../../screens/SubscriptionScreen/SubscriptionScreen';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='StepOnePlayer' component={StepOnePlayer} />
      <Stack.Screen name='StepOneFacility' component={StepOneFacility} />
      <Stack.Screen name='SubscriptionScreen' component={SubscriptionScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack