import React, { useState } from 'react';
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
import { BLACK, LINKS } from '../styles/colors';
import stringsoflanguages from '../utils/ScreenStrings';
import { getResponsiveValue } from '../styles/responsive';
import {
  isEmailValid,
  isPhoneNumberValid,
} from '../utils/validation/formValidation';
import { FETCH } from '../services/fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../atoms/CustomModal';
import { useLocal } from '../context/ProfileContext';

const ForgotPassword = props => {
  const {localState, localDispatch} = useLocal()
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('email'); // 'email' or 'phone'
  const [validationError, setValidationError] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState({
    visible : false,
    message : '',
    navigationPage : '',
    onClose : null
  })

  const handleInputValueChange = (field, text) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setInputValue(text);
  };

  const handleLogin = () => {
    if (inputType === 'email') {
      if (!isEmailValid(inputValue)) {
        setValidationError(stringsoflanguages.emailRequired);
        return;
      }
      sendEmailOTP(inputValue);
    } else {
      if (!isPhoneNumberValid(inputValue)) {
        setValidationError(stringsoflanguages.phoneNoRequired);
        return;
      }
      sendPhoneOTP(inputValue);
    }

    // Navigate to the next screen
    // props.navigation.navigate('OtpScreen');
  };
  // Placeholder functions for sending OTP data
  const sendEmailOTP = async (email) => {
    // Send email OTP logic here
    let { data, status } = await FETCH(
      'GET',
      '/auth/reset-password',
      { email: email },
    )
    console.log('***', data,status)
    if (status === 200) {
      await AsyncStorage.setItem('userId', data.userId);
      localDispatch({
        type : 'USERID',
        payload : data.userId
      })
      props.navigation.navigate('OtpScreen');
    } else {
      let a = setModal({
        visible : true,
        message : data.message,
        navigationPage : 'ForgotPassword',
        onClose : ()=>{setShowModal(false)}
      })
      setShowModal(true)
    }
    // console.log('***',data)
  };

  const sendPhoneOTP = phoneNumber => {
    // Send phone OTP logic here
  };

  const toggleInputType = () => {
    setInputType(inputType === 'email' ? 'phone' : 'email');
    setValidationError('');
  };


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradients customStyle={styles.loginGradient}>
        <Text style={styles.title2}>{stringsoflanguages.resetPassword}</Text>
      </LinearGradients>
      {showModal?<CustomModal visible={modal.visible} message={modal.message} navigationPage={modal.navigationPage} onClose={modal.onClose} />:''}
      <View style={global.aContainer}>
        {inputType === 'email' ? (
          <TextinputA
            style={styles.pl}
            placeholder={stringsoflanguages.enterEmailId}
            onChangeText={(v) => { handleInputValueChange('email', v) }}
            value={inputValue}
          />
        ) : (
          <TextinputA
            style={styles.pl}
            placeholder={stringsoflanguages.enterPhoneNo}
            onChangeText={(v) => { handleInputValueChange('phone', v) }}
            value={inputValue}
            keyboardType="numeric"
            maxLength={10}
          />
        )}
        {validationError ? (
          <Text style={global.error}>{validationError}</Text>
        ) : null}
        <ButtonA name={stringsoflanguages.sendOtp} onPress={handleLogin} />
        <Pressable onPress={toggleInputType}>
          <Text style={styles.toggleType}>
            {inputType === 'email' ? stringsoflanguages.usePhoneNumber : stringsoflanguages.useEmail}
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
    fontSize: getResponsiveValue(50, 30),
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
  errorText1: {
    textAlign: 'right', // Align the error text to the left
    marginRight: getResponsiveValue("30%", "42%"),
  },
});

export default ForgotPassword;
