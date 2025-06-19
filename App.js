import './gesture-handler';
import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import Login from './src/screens/Login/Login';
import Register from './src/screens/Register/Register';
import StackNavigator from './src/navigation/RootNavigator';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { AuthProvider } from './src/context/AuthContext';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  backgroundMain: {
    backgroundColor: 'white',
    flex: 1
  }
});

export default App;
