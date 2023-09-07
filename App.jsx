import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/static/SplashScreen.jsx';
import LoginScreen from './src/screens/LoginScreen.jsx';
import SignUpScreen from './src/screens/SignUpScreen.jsx';
import ProfileScreen from './src/screens/ProfileScreen.jsx';
import HomePage from './src/screens/HomePage.jsx';
import CreatePage from './src/screens/CreatePage.jsx';
import ForgotPassword from './src/screens/ForgotPassword.jsx';
import Settings from './src/screens/static/Settings.jsx';
import OtpScreen from './src/screens/OtpScreen.jsx';
import Edit from './src/screens/editScreens/Edit.jsx';
import PrivacyPolicy from './src/screens/static/PrivacyPolicy.jsx';
import TermsCondition from './src/screens/static/TermsCondition.jsx';
import ContactUs from './src/screens/ContactUs.jsx';
import AboutUs from './src/screens/static/AboutUs.jsx';
import BirthdayEdit from './src/screens/editScreens/BIrthdayEdit.jsx';
// import { store } from './src/store';
// import { Provider } from 'react-redux';
import {ProfileProvider} from './src/context/ProfileContext.jsx';
import NewEdit from './src/screens/editScreens/NewEdit.jsx';
import ChangeLanguage from './src/screens/static/ChangeLanguage.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stringsoflanguages from './src/utils/ScreenStrings.jsx';
import { LanguageProvider } from './src/context/LanguageContext.js';

const Stack = createNativeStackNavigator();
function App() {
  useEffect(() => {
    // Load the selected language from AsyncStorage and set it as the initial language
    AsyncStorage.getItem('selectedLanguage').then((value) => {
      if (value) {
        stringsoflanguages.setLanguage(value);
      }
    });
  }, []);
  
  return (
    <ProfileProvider>
    <LanguageProvider>
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#8b0e68" />
      <Stack.Navigator>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
         <Stack.Screen
          name="ChangeLanguage"
          component={ChangeLanguage}
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
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OtpScreen"
          component={OtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit"
          component={Edit}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicy}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TermsCondition"
          component={TermsCondition}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BirthdayEdit"
          component={BirthdayEdit}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NewEdit"
          component={NewEdit}
          options={{headerShown: false}}
        />
       
      </Stack.Navigator>
    </NavigationContainer>
    </LanguageProvider>
     </ProfileProvider>

  );
}

export default App;
