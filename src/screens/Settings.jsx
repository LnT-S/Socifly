import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  Animated,
} from 'react-native';
import React, { useState } from 'react';
import global from '../styles/global';

import {getResponsiveValue} from '../styles/responsive';

import defaultProfileImage from '../assets/images/Profile.png';
import {BLACK, WHITE} from '../styles/colors';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

const Settings = props => {
  const handleAboutPage = () => {
    props.navigation.navigate('AboutUsScreen');
  };
  const [isTextContainerPressed, setIsTextContainerPressed] = useState(false);
  const textContainerScaleValue = new Animated.Value(1);

  const handleTextContainerPressIn = () => {
    setIsTextContainerPressed(true);
    Animated.spring(textContainerScaleValue, {
      toValue: 0.75, // Zoom out effect
      useNativeDriver: true,
    }).start();
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
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainRect}>
        <View style={styles.rect1}>
          <View style={styles.innerRect1}>
            <Image source={defaultProfileImage} style={styles.profileImage} />
            <Pressable
            onPressIn={handleTextContainerPressIn}
            onPressOut={handleTextContainerPressOut}
          >
            <Animated.View
              style={[styles.textContainer, animatedTextContainerStyles]}
            >
              <Text style={styles.text1}>Your Name</Text>
              <Text style={styles.text2}>your_email123@isEmail.com</Text>
              <Text style={styles.text2}>+91 1234567890</Text>
              </Animated.View>
            </Pressable>
              
          </View>
        </View>
        <View style={styles.rect2}>
        <Pressable  style={({ pressed }) => [
          { opacity: pressed ? 0.6 : 0.9 },
          styles.iconWrapper,
          styles.row,
        ]}>
            <MaterialCommunityIconsIcon
              name="comment-question-outline"
              style={styles.icon}></MaterialCommunityIconsIcon>

            <Text style={styles.text3}>Contact Us</Text>
          </Pressable>
          <View style={styles.divider}></View>
          <Pressable  style={({ pressed }) => [
            { opacity: pressed ? 0.6 : 0.9 },
            styles.iconWrapper,
            styles.row,
          ]}>
            <FeatherIcon name="info" style={styles.icon}></FeatherIcon>
            <Text style={styles.text3} onPress={handleAboutPage}>About Us</Text>
          </Pressable>
          <View style={styles.divider}></View>
          <Pressable  style={({ pressed }) => [
            { opacity: pressed ? 0.6 : 0.9 },
            styles.iconWrapper,
            styles.row,
          ]}>
            <MaterialCommunityIconsIcon
              name="logout"
              style={styles.icon}></MaterialCommunityIconsIcon>

            <Text style={styles.text3}>Logout</Text>
          </Pressable>
        </View>

        <View style={styles.rect3}>
          <View style={styles.footer}>
            <Pressable>
              <Text style={styles.text4}>Privacy & Policy</Text>
            </Pressable>
          </View>
          <View style={styles.vertical}></View>
          <View style={styles.footer}>
            <Pressable>
              <Text style={styles.text4}>Terms & Condition</Text>
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
  mainRect: {
    top: getResponsiveValue(60, 40),
    alignItems: 'center',
  },
  rect1: {
    paddingHorizontal: getResponsiveValue(30, 20),
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
    fontSize: getResponsiveValue(24, 16),
    fontWeight: 'bold',
  },
  text2: {
    color: BLACK,
    fontSize: getResponsiveValue(16, 12),
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
    height: '50%',
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
  rect3: {
    // position: 'relative',
    top: getResponsiveValue('25%', '35%'),
    // flexDirection:"column-reverse",
    bottom: 0,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text4: {
    color: 'grey',
    fontSize: getResponsiveValue(12, 10),
  },
  footer: {
    bottom: '0',
  },
  vertical: {
    width: '0.4%',
    height: '100%',
    backgroundColor: 'grey',
  },
});

export default Settings;
