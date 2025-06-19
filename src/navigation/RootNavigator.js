import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; // ✅ import context
import Splash from '../screens/Splash/Splash';
import AppStack from './AppStack/AppStack';
import AuthStack from './AuthStack/AuthStack';

const RootNavigator = () => {
  const { isLoading, isAuthenticated } = useAuth(); // ✅ use context values

  if (isLoading) {
    return <Splash />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
