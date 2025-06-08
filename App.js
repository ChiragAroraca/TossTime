import './gesture-handler';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import StackNavigator from './src/navigation/StackNavigator/StackNavigator';

function App() {
  return (
    StackNavigator()
  );
}

const styles = StyleSheet.create({
 backgroundMain:{
  backgroundColor:'white',
  flex:1
 }
});

export default App;
