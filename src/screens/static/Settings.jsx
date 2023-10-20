import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  Animated,
  BackHandler,
} from 'react-native';
import defaultProfileImage from '../../assets/images/Profile.png';
import { BLACK, WHITE } from '../../styles/colors';
import Icon from "react-native-vector-icons/FontAwesome";
import stringsoflanguages from '../../utils/ScreenStrings';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { getResponsiveValue } from '../../styles/responsive';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DialogueBox from '../../common/DialogueBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocal , useProfile } from '../../context/ProfileContext';
import { useEffect } from 'react';

const Settings = props => {
  const {profileState , dispatch } = useProfile()
  const { localState, localDispatch } = useLocal()
  const navigation = useNavigation();
  const [isTextContainerPressed, setIsTextContainerPressed] = useState(false);
  const textContainerScaleValue = new Animated.Value(1);
  const [isLogoutDialogVisible, setIsLogoutDialogVisible] = useState(false);

  const handleTextContainerPressIn = () => {
    setIsTextContainerPressed(true);
    Animated.spring(textContainerScaleValue, {
      toValue: 0.75, // Zoom out effect
      useNativeDriver: true,
    }).start();
  };

  function handleLogout(){
    setIsLogoutDialogVisible(true)
  }

  const handleYesForLogout = async () => {
    AsyncStorage.removeItem('token')
    navigation.navigate('LoginScreen')
    setIsLogoutDialogVisible(false);
  };

  const handleTextContainerPressOut = () => {
    setIsTextContainerPressed(false);
    Animated.spring(textContainerScaleValue, {
      toValue: 2, // Zoom in effect
      useNativeDriver: true,
    }).start();
    // ... Your navigation logic here
  };

  const animatedTextContainerStyles = {
    transform: [{ scale: textContainerScaleValue }],


  }
  const handleNextPage1 = () => {
    props.navigation.navigate('ContactUs');
  };
  const handleNextPage2 = () => {
    props.navigation.navigate('AboutUs');
  };
  const handleNextPage3 = () => {
    props.navigation.navigate('PrivacyPolicy');
  };
  // const handleNextPage4 = () => {
  //   props.navigation.navigate('TermsCondition');
  // };
  const handleNextPage5 = () => {
    
    props.navigation.navigate('ChangeLanguage', { returnTo: 'Settings' });
    ;
  };
  const handleNextPage = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{navigation.navigate('HomePage'); return true});
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.status}>
        <Icon2
          onPress={handleNextPage}
          name="arrow-back"
          style={styles.icon2}></Icon2>
        <Text style={styles.statusT}> {stringsoflanguages.settings}</Text>
      </View>


      <View style={styles.mainRect}>
        <View style={styles.rect1}>
          <View style={styles.innerRect1}>
            <Image source={profileState.avatar?{uri :profileState.server +  profileState.avatar}:defaultProfileImage} style={styles.profileImage} />
            <Pressable
              onPressIn={handleTextContainerPressIn}
              onPressOut={handleTextContainerPressOut}
            >
              <Animated.View
                style={[styles.textContainer, animatedTextContainerStyles]}
              >
                <View style={styles.textContainer}>
                  <Text style={styles.text1}>{profileState.name}</Text>
                  <Text style={styles.text2}>{profileState.email}</Text>
                  <Text style={styles.text2}>{profileState.phone}</Text>
                </View>
              </Animated.View>
            </Pressable>

          </View>
        </View>


        <View style={styles.rect2}>
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.6 : 0.9 },
              styles.iconWrapper,
              styles.row,
            ]}
            onPress={handleNextPage1}>
            <MaterialCommunityIconsIcon
              name="comment-question-outline"
              style={styles.icon}></MaterialCommunityIconsIcon>

            <Text style={styles.text3}>{stringsoflanguages.contactUs}</Text>
          </Pressable>
          <View style={styles.divider}></View>
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.6 : 0.9 },
              styles.iconWrapper,
              styles.row,
            ]}
            onPress={handleNextPage2}>
            <FeatherIcon name="info" style={styles.icon}></FeatherIcon>
            <Text style={styles.text3}>{stringsoflanguages.aboutUs}</Text>
          </Pressable>
          <View style={styles.divider}></View>
          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.6 : 0.9 },
              styles.iconWrapper,
              styles.row,
            ]}
            onPress={handleNextPage5}>
            <Icon name="language" style={styles.icon}></Icon>
            <Text style={styles.text3}>{stringsoflanguages.changeLanguage}</Text>
          </Pressable>
          <View style={styles.divider}></View>
          <Pressable
            onPress={handleLogout}
            style={({ pressed }) => [
              { opacity: pressed ? 0.6 : 0.9 },
              styles.iconWrapper,
              styles.row,
            ]}>
            <MaterialCommunityIconsIcon
              name="logout"
              style={styles.icon}></MaterialCommunityIconsIcon>

            <Text style={styles.text3}>{stringsoflanguages.logout}</Text>
          </Pressable>

          {isLogoutDialogVisible && (
            <DialogueBox
              isVisible={isLogoutDialogVisible}
              handleYes={handleYesForLogout}
              handleNo = {()=>{setIsLogoutDialogVisible(false)}}
              textContent="Are you sure you want to logout?"
            />
          )}
        </View>

        <View style={styles.rect3}>
          <View style={styles.footer}>
            <Pressable
              style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 0.9 },
                styles.iconWrapper,
                styles.row,
              ]}
              onPress={handleNextPage3}>
              <Text style={styles.text4}>{stringsoflanguages.privacyPolicy}</Text>
            </Pressable>
          </View>
          <View><Text style={styles.text6}>|</Text></View>
          <View style={styles.footer}>
            <Pressable
              style={({ pressed }) => [
                { opacity: pressed ? 0.6 : 0.9 },
                styles.iconWrapper,
                styles.row,
              ]}
              >
              <Text style={styles.text5}>{stringsoflanguages.termsCondition}</Text>
            </Pressable>
          </View>
        </View>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    top: '5%',
    left: getResponsiveValue('20%', '10%'),
    flexDirection: 'column',
  },
  container: {
    flex: 1,
  },
  status: {
    width: '100%',
    backgroundColor: WHITE,
    height: getResponsiveValue(70, 50),
    flexDirection: 'row',

    // justifyContent: 'center',
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },

  statusT: {
    color: BLACK,
    left: getResponsiveValue(30, 20),
    top: getResponsiveValue(20, 14),
  },
  icon2: {
    color: BLACK,
    fontSize: getResponsiveValue(30, 25),
    top: getResponsiveValue(20, 14),
    left: getResponsiveValue(30, 20),
  },

  mainRect: {
    top: getResponsiveValue("2%", "2%"),
    alignItems: 'center',
  },
  rect1: {
    paddingHorizontal: getResponsiveValue(30, 10),
    justifyContent: 'center',

    width: '90%',
    backgroundColor: WHITE,
    height: '20%',
    borderRadius: 10,
    marginBottom: '10%',
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: getResponsiveValue(6, 3),
    },
    elevation: 30,
    shadowOpacity: 0.8,
    shadowRadius: getResponsiveValue(15, 10),
  },
  innerRect1: {
    flexDirection: 'row',
  },
  text1: {
    color: BLACK,
    fontSize: getResponsiveValue(24, 14),
    fontWeight: 'bold',
  },
  text2: {
    color: BLACK,
    fontSize: getResponsiveValue(16, 10),
  },
  text3: {
    color: BLACK,
    left: getResponsiveValue(40, 20),
    fontSize: getResponsiveValue(24, 16),
    fontWeight: 'bold',
  },
  textContainer: {
    top: '5%',
    left: getResponsiveValue('20%', '10%'),
    flexDirection: 'column',

  },
  rect2: {
    width: '90%',
    paddingHorizontal: getResponsiveValue(40, 20),
    // marginVertical:getResponsiveValue(50,40),
    justifyContent: 'space-evenly',
    backgroundColor: WHITE,
    height: '60%',
    borderRadius: 10,
    marginBottom: '5%',
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: getResponsiveValue(6, 3),
    },
    elevation: 30,
    shadowOpacity: 0.8,
    shadowRadius: getResponsiveValue(15, 10),
  },

  profileImage: {
    width: getResponsiveValue(160, 80),
    height: getResponsiveValue(160, 80),
    borderRadius: getResponsiveValue(120, 60),
    backgroundColor: 'grey',
    // marginBottom: getResponsiveValue(10, 15),
  },
  icon: {
    color: BLACK,
    fontSize: getResponsiveValue(45, 24),
  },
  row: {
    flexDirection: 'row',
  },
  divider: {
    height: '0.5%',
    backgroundColor: 'grey',
  },
  
  text4:{
    bottom:"8%",
    right:80,
  },
  text5:{
    bottom:"40%",
    left:90,
  },
  text6:{
    bottom:30,
    textAlign:'center'
  }
 
});

export default Settings;
