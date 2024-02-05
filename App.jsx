import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import { ProfileProvider, Loca } from './src/context/ProfileContext.jsx';
import NewEdit from './src/screens/editScreens/NewEdit.jsx';
import ChangeLanguage from './src/screens/static/ChangeLanguage.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stringsoflanguages from './src/utils/ScreenStrings.jsx';
import { LanguageProvider } from './src/context/LanguageContext.js';
import NewPassword from './src/screens/NewPassword.jsx';
import LanguagesScreen from './src/screens/static/LanguagesScreen.jsx';
import VideoArray from './src/common/postArrays/VIdeoArray.jsx';


const Stack = createNativeStackNavigator();

function App() {
  const [token, setToken] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  let isTokenPresent = async () => {
    let t = await AsyncStorage.getItem('token')
    if (t !== undefined) {
      return true
    }
    else {
      return false
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false when the loading task is complete
    }, 2500); // Simulate loading for 2 seconds, replace this with your actual loading logic
  }, []);
  useEffect(() => {
    console.log('APP Token PResent ? ', token)
    setToken(isTokenPresent())

  }, [])
  useEffect(() => {
    // Load the selected language from AsyncStorage and set it as the initial language
    AsyncStorage.getItem('selectedLanguage').then((value) => {
      if (value) {
        stringsoflanguages.setLanguage(value);
      }
    })
    .catch(err=>{
      console.log('err asyn c storage',err)
    });
  }, []);

  return (
    <ProfileProvider>
      <LanguageProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#8b0e68" />
          {isLoading ? (
            <SplashScreen />
          ) : (<Stack.Navigator initialRouteName={token ? "HomePage" : "LoginScreen"}>
            <Stack.Screen
              name="ChangeLanguage"
              component={ChangeLanguage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LanguagesScreen"
              component={LanguagesScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              options={{ headerShown: false }}
            />
            {token && <Stack.Screen
              name="HomePage"
              component={HomePage}
              options={{ headerShown: false, TOKEN: token }}
            />}
            {token && <Stack.Screen
              name="CreatePage"
              component={CreatePage}
              options={{ headerShown: false }}
            />}
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OtpScreen"
              component={OtpScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Edit"
              component={Edit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicy}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="TermsCondition"
              component={TermsCondition}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ContactUs"
              component={ContactUs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AboutUs"
              component={AboutUs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BirthdayEdit"
              component={BirthdayEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewEdit"
              component={NewEdit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VideoArray"
              component={VideoArray}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>)}
        </NavigationContainer>
      </LanguageProvider>
    </ProfileProvider>

  );
}

export default App;
