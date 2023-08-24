import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen.jsx';
import LoginScreen from './src/screens/LoginScreen.jsx';
import SignUpScreen from './src/screens/SignUpScreen.jsx';
import ProfileScreen from './src/screens/ProfileScreen.jsx';
import HomePage from './src/screens/HomePage.jsx';
import CreatePage from './src/screens/CreatePage.jsx';
import ForgotPassword from './src/screens/ForgotPassword.jsx';
import Settings from './src/screens/Settings.jsx';
import OtpScreen from './src/screens/OtpScreen.jsx';
import EditScreen from './src/screens/EditScreen.jsx';

// import { store } from './src/store';
// import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#8b0e68" />
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreatePage"
          component={CreatePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
