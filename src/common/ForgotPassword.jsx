import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  SafeAreaView,
  Dimensions,
} from "react-native";
import LinearGradients from "../atoms/LinearGradients";
import global from "../styles/global";
import TextinputA from "../atoms/TextinputA";
import ButtonA from "../atoms/ButtonA";
import { BLACK, LINKS } from '../styles/colors';

const getResponsiveValue = (tabletValue, mobileValue) =>
  isTablet ? tabletValue : mobileValue;
const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;

const ForgotPassword = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState("email"); // 'email' or 'phone'

  const handleInputValueChange = (text) => {
    setInputValue(text);
  };

  const handleLogin = () => {
    if (inputType === "email") {
        // Send email data to the server
        sendEmailOTP(inputValue);
      } else {
        // Send phone number data to the server
        sendPhoneOTP(inputValue);
      }
  
      // Navigate to the next screen
      props.navigation.navigate('LoginScreen');
 
  };

    // Placeholder functions for sending OTP data
    const sendEmailOTP = (email) => {
        // Send email OTP logic here
      };
    
      const sendPhoneOTP = (phoneNumber) => {
        // Send phone OTP logic here
      };

  const toggleInputType = () => {
    setInputValue("");
    setInputType(inputType === "email" ? "phone" : "email");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradients>
        <Text style={styles.title2}>Reset Password</Text>
      </LinearGradients>
      <View style={global.aContainer}>
        {inputType === "email" ? (
          <TextinputA
            style={styles.pl}
            placeholder="Enter Email Id"
            onChangeText={handleInputValueChange}
            value={inputValue}
          />
        ) : (
          <TextinputA
            style={styles.pl}
            placeholder="Enter Phone Number"
            onChangeText={handleInputValueChange}
            value={inputValue}
          />
        )}
        <ButtonA
          name={"Send OTP"}
          onPress={handleLogin}
        />
        <Pressable onPress={toggleInputType}>
          <Text style={styles.toggleType}>
            {inputType === "email" ? "Use Phone Number" : "Use Email"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  pl: {
    color: "grey",
  },
  title2: {
    top: 20,
    color: "white",
    fontSize: getResponsiveValue(50, 40),
    marginBottom: 20,
    // height:50
  },
  or: {
    fontSize: getResponsiveValue(18, 16),
    color: BLACK,
    marginBottom: getResponsiveValue(30, 18),
  },
  toggleType: {
    color: LINKS,
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default ForgotPassword;
