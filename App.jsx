import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen  from './src/common/SplashScreen.jsx';
import LoginScreen  from './src/common/LoginScreen.jsx';
import SignUpScreen  from './src/common/SignUpScreen.jsx';
import ProfileScreen from './src/common/ProfileScreen.jsx';
import CategoryPage from './src/common/CategoryPage.jsx';
import HomePage from './src/common/HomePage.jsx';
import CreatePage from './src/common/CreatePage.jsx';
import ForgotPassword from './src/common/ForgotPassword.jsx';
import Settings from './src/common/Settings.jsx';

// import { store } from './src/store';
// import { Provider } from 'react-redux';


const Stack = createNativeStackNavigator();
function App() {

  return (
    
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#8b0e68" />
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CategoryPage" component={CategoryPage} options={{ headerShown: false }} />
        <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
        <Stack.Screen name="CreatePage" component={CreatePage} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={Settings} options={{ headerShown: true }} />

      </Stack.Navigator>
      </NavigationContainer>
   
  );
}

export default App;
