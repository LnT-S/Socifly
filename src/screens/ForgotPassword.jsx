import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import LinearGradients from '../atoms/LinearGradients';
import global from '../styles/global';
import TextinputA from '../atoms/TextinputA';
import ButtonA from '../atoms/ButtonA';
import {BLACK, LINKS} from '../styles/colors';

import {getResponsiveValue} from '../styles/responsive';
import {
  isEmailValid,
  isPhoneNumberValid,
} from '../utils/validation/formValidation';

  const ForgotPassword = props => {
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('email'); // 'email' or 'phone'
  const [validationError, setValidationError] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleInputValueChange = text => {
    setValue((prev) => ({ ...prev, [field]: text }));
    setErrors((prev) => ({ ...prev, [field]: '' })); 
  };

  const handleLogin = () => {
    if (inputType === 'email') {
      if (!isEmailValid(inputValue)) {
        setValidationError('Invalid email format');
        return;
      }
      sendEmailOTP(inputValue);
    } else {
      if (!isPhoneNumberValid(inputValue)) {
        setValidationError('Invalid phone number format');
        return;
      }
      sendPhoneOTP(inputValue);
    }

    // Navigate to the next screen
    props.navigation.navigate('OtpScreen');
  };
  // Placeholder functions for sending OTP data
  const sendEmailOTP = email => {
    // Send email OTP logic here
  };

  const sendPhoneOTP = phoneNumber => {
    // Send phone OTP logic here
  };

  const toggleInputType = () => {
    setInputValue('');
    setInputType(inputType === 'email' ? 'phone' : 'email');
    setValidationError('');
  };


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradients customStyle={styles.loginGradient}>
        <Text style={styles.title2}>Reset Password</Text>
      </LinearGradients>
      <View style={global.aContainer}>
       
        {inputType === 'email' ? (
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
            keyboardType="numeric"
            maxLength={10}
          />
        )}
        {validationError ? (
          <Text style={global.error}>{validationError}</Text>
        ) : null}
        <ButtonA name={'Send OTP'} onPress={handleLogin} />
        <Pressable onPress={toggleInputType}>
          <Text style={styles.toggleType}>
            {inputType === 'email' ? 'Use Phone Number' : 'Use Email'}
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
    // Add any other custom styles you want for the LinearGradients in the LoginScreen
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
    fontSize: getResponsiveValue(50, 40),
    marginBottom: 20,
  },
  or: {
    fontSize: getResponsiveValue(18, 16),
    color: BLACK,
    marginBottom: getResponsiveValue(30, 18),
  },
  toggleType: {
    color: LINKS,
    marginTop: 10,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default ForgotPassword;
