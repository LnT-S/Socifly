import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  SafeAreaView,
} from 'react-native';
import LinearGradients from '../atoms/LinearGradients';
import global from '../styles/global';
import TextinputA from '../atoms/TextinputA';
import ButtonA from '../atoms/ButtonA';
import { BLACK, LINKS } from '../styles/colors';
import stringsoflanguages from '../utils/ScreenStrings';
import { getResponsiveValue } from '../styles/responsive';
import {
  isEmailValid,
  isPhoneNumberValid,
} from '../utils/validation/formValidation';

const ForgotPassword = (props) => {
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inputType, setInputType] = useState('email'); // 'email' or 'phone'
  const [validationError, setValidationError] = useState('');
  

  const handleInputValueChange = (text) => {
    // Update the input value based on inputType
    if (inputType === 'email') {
      setEmail(text);
    } else {
      setPhoneNumber(text);
    }

    // Clear the validation error
    setValidationError('');
  };
  const handleLogin = () => {
    let inputValid = true;
  
    // Validate based on inputType
    if (inputType === 'email') {
      if (!email.trim()) {
        setValidationError(stringsoflanguages.emailRequired);
        inputValid = false;
      } else if (!isEmailValid(email)) {
        setValidationError(stringsoflanguages.emailError);
        inputValid = false;
      }
    } else {
      if (!phoneNumber.trim()) {
        setValidationError(stringsoflanguages.phoneNoRequired);
        inputValid = false;
      } else if (!isPhoneNumberValid(phoneNumber)) {
        setValidationError(stringsoflanguages.phoneNoError);
        inputValid = false;
      }
    }
  
    // Check if the input is valid before proceeding
    if (!inputValid) {
      return;
    }
  
    // Send OTP logic here
    if (inputType === 'email') {
      sendEmailOTP(email);
    } else {
      sendPhoneOTP(phoneNumber);
    }
  
    // Navigate to the next screen
    props.navigation.navigate('OtpScreen');
  };
  
  

  // Placeholder functions for sending OTP data
  const sendEmailOTP = (email) => {
    // Send email OTP logic here
  };

  const sendPhoneOTP = (phoneNumber) => {
    // Send phone OTP logic here
  };

  const toggleInputType = () => {
    // Clear the input values and validation error when toggling
    setEmail('');
    setPhoneNumber('');
    setValidationError('');
    setInputType(inputType === 'email' ? 'phone' : 'email');
  };

  const inputStyle = {
    borderColor: validationError ? 'red' : 'grey',
    borderWidth: 1,
    // Add other styles as needed
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradients customStyle={styles.loginGradient}>
        <Text style={styles.title2}>{stringsoflanguages.resetPassword}</Text>
      </LinearGradients>
      <View style={global.aContainer}>
        {inputType === 'email' ? (
         <TextinputA
  style={[styles.pl, inputStyle]}
  placeholder={stringsoflanguages.enterEmailId}
  onChangeText={(text) => handleInputValueChange(text)}
  value={email}
  onFocus={() => setValidationError('')} // Clear error when focused
  onBlur={() => {}} 
  
/>

        ) : (
          <TextinputA
  style={[styles.pl, inputStyle]}
  placeholder={stringsoflanguages.enterPhoneNo}
  onChangeText={(text) => handleInputValueChange(text)}
  value={phoneNumber}
  keyboardType="numeric"
  maxLength={10}
/>

        )}
        {validationError ? <Text style={global.error}>{validationError}</Text> : null}
        <ButtonA name={stringsoflanguages.sendOtp} onPress={handleLogin} />
        <Pressable onPress={toggleInputType}>
          <Text style={styles.toggleType}>
            {inputType === 'email'
              ? stringsoflanguages.usePhoneNumber
              : stringsoflanguages.useEmail}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginGradient: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
  container: {
    flex: 1,
  },
  pl: {
    color: 'grey',
  },
  title2: {
    top: 20,
    color: 'white',
    fontSize: getResponsiveValue(50, 30),
    marginBottom: 20,
  },
  toggleType: {
    color: LINKS,
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;