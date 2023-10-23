import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  TextInput,
  SafeAreaView,
  BackHandler,
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
import Icon from 'react-native-vector-icons/AntDesign';

const ForgotPassword = props => {
  const { localState, localDispatch } = useLocal()
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState('email'); // 'email' or 'phone'
  const [validationError, setValidationError] = useState('');
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false)
  const { navigation } = props;
 
  const [modal, setModal] = useState({
    visible: false,
    message: '',
    navigationPage: '',
    onClose: null
  })

  const handleInputValueChange = (text) => {
    setErrors({})
    setInputValue(text);
  };

  const handleLogin = () => {
    let inputValid = true;

    // Validate based on inputType
    if (inputType === 'email') {
      if (!inputValue.trim()) {
        setValidationError(stringsoflanguages.emailRequired);
        inputValid = false;
      } else if (!isEmailValid(inputValue)) {
        setValidationError(stringsoflanguages.emailError);
        inputValid = false;
      }
    } else {
      if (!inputValue.trim()) {
        setValidationError(stringsoflanguages.phoneNoRequired);
        inputValid = false;
      } else if (!isPhoneNumberValid(inputValue)) {
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
      sendEmailOTP(inputValue);
    } else {
      sendPhoneOTP(inputValue);
    }
    // Navigate to the next screen
    props.navigation.navigate('OtpScreen');
  };



  // Placeholder functions for sending OTP data
  const sendEmailOTP = async (email) => {
    // Send email OTP logic here
    let { data, status } =await  FETCH(
      'GET',
      '/auth/reset-password',
      { email: email },
    )
    console.log('***', data, status)
    if (status === 200) {
      await AsyncStorage.setItem('userId', data.userId);
      localDispatch({
        type: 'USERID',
        payload: data.userId
      })
      let a = setModal({
        visible: true,
        message: data.message,
        navigationPage: 'OtpScreen',
        onClose: ()=>{setShowModal(false)}
      })
      setShowModal(true)
    } else {
      let a = setModal({
        visible: true,
        message: data.message,
        navigationPage: 'ForgotPassword',
        onClose: () => { setShowModal(false) }
      })
      setShowModal(true)
    }
    // console.log('***',data)
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', ()=>{navigation.goBack(); return true});
    return () => backHandler.remove();
  }, []);

  const sendPhoneOTP = (phoneNumber) => {
    // Send phone OTP logic here
  };

  const toggleInputType = () => {
    setInputType(inputType === 'email' ? 'phone' : 'email');
    // Clear the input values and validation error when toggling
    // setEmail('');
    // setPhoneNumber('');
    setValidationError('');
  };

  const inputStyle = {
    borderColor: validationError ? 'red' : 'grey',
    borderWidth: 1,
  };


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradients customStyle={styles.loginGradient}>
      <Pressable onPress={() => navigation.goBack()}>
      <Text style={styles.headertop}>
      <Icon name="arrowleft" style={styles.header1}/> {/* Adjust size and color as needed */}
      </Text>
      </Pressable>
        <Text style={styles.title2}>{stringsoflanguages.resetPassword}</Text>
      </LinearGradients>
      {showModal ? <CustomModal visible={modal.visible} message={modal.message} navigationPage={modal.navigationPage} onClose={modal.onClose} /> : ''}
      <View style={global.aContainer}>
        {inputType === 'email' ? (
          <TextinputA
            style={[styles.pl, inputStyle]}
            placeholder={stringsoflanguages.enterEmailId}
            onChangeText={(text) => handleInputValueChange(text)}
            value={inputValue}
            onFocus={() => setValidationError('')} // Clear error when focused
            onBlur={() => { }}

          />

        ) : (
          <TextinputA
            style={[styles.pl, inputStyle]}
            placeholder={stringsoflanguages.enterPhoneNo}
            onChangeText={(text) => handleInputValueChange(text)}
            value={inputValue}
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
  headertop:{
    right:"40%",
    bottom:105,
  },
  header1: {
    color: "#ffffff",
    fontSize:25,
    fontWeight: "bold",
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