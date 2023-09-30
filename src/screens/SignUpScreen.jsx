import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  
} from 'react-native';
import ButtonA from '../atoms/ButtonA';
import TextinputA from '../atoms/TextinputA';
import TextinputB from '../atoms/TextinputB';
import LinearGradients from '../atoms/LinearGradients';
import global from '../styles/global';
import {FETCH} from '../services/fetch';
import {getResponsiveValue} from '../styles/responsive';
import {validateForm} from '../utils/validation/validateForm';
import stringsoflanguages from '../utils/ScreenStrings';
import CustomModal from '../atoms/CustomModal';
import DialogueBox from '../common/DialogueBox';
import DateTimePicker from '@react-native-community/datetimepicker'; 


const SignUpScreen = props => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
    bday: '', 
  });

  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState({
    visible : false,
    message : '',
    navigationPage : '',
    onClose : null
  })
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleChange = (field, text) => {
    setValue((prev) => ({ ...prev, [field]: text }));
    setErrors((prev) => ({ ...prev, [field]: '' })); // Clear the error when typing
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the date picker
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format the selected date as needed
      handleChange('bday', formattedDate); // Update the 'birthdate' field in your state
    }
  };

  const renderDatePicker = () => {
    if (showDatePicker) {
      return (
        <DateTimePicker
          value={value.bday ? new Date(value.bday) : new Date('1990-01-01')} // Set the initial date value
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      );
    }
    return null;
  };
  

  const scrollViewRef = useRef(null);

  const handleSignUp = async () => {
    console.log('LOG : Submiiting Form',value)
    const validationErrors = validateForm(value);
    console.log('LOG : Validation Status',validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set the validation errors in state
      return;
    }

    try {
      setIsLoading(true); // Start loading
      let formData = new FormData();
      formData.append('data', value);
      // console.log('VAlue is', { value });
      let {status , data} = await FETCH(
        'POST',
        '/auth/signup',
        '',
        value,
      );
      setIsLoading(false); // End loading
      if(status!==400 && status!==500){
        console.log('LOG : Status is not 400');
        let a = setModal({
          visible : true,
          message : data.message,
          navigationPage : 'LoginScreen'
        })
        console.log('hihi',modal)
        setShowModal(true)
      }else{
        let a = setModal({
          visible : true,
          message : data.message,
          navigationPage : 'SignUpScreen',
          onClose : ()=>{setShowModal(false)}
        })
        console.log('hihi2',modal)
        setShowModal(true)
      }
    } catch (error) {
      setIsLoading(false); // End loading on error
      console.error('Sign up error:', error);
    }
  };

  // ...

  useEffect(() => {
    // console.log('In SingUp Page');
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <LinearGradients customStyle={styles.loginGradient}>
          <Text style={global.title}>{stringsoflanguages.signUp}</Text>
        </LinearGradients>

        <View style={global.bContainer}>
          <ScrollView
            style={styles.scrollView}
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            keyboardShouldPersistTaps="handled">

            {showModal?<CustomModal visible={modal.visible} message={modal.message} navigationPage={modal.navigationPage} onClose={modal.onClose} />:''}

            <TextinputA
            // style={[
            //   styles.input,
            //   errors.name ? styles.inputError : null,
            // ]}
              placeholder={stringsoflanguages.enterFullName}
              value={value?.name}
              onChangeText={(text) => handleChange('name', text)}
              error={errors.name}
              
            />
            {errors.name && <Text style={global.error}>{errors.name}</Text>}
            
         
            
            
            <TextinputA
              placeholder={stringsoflanguages.enterEmailId}
              value={value?.email}
              keyboardType="email-address"
              onChangeText={(text) => handleChange('email', text)}
              error={errors.email}
            />
            {errors.email && <Text style={global.error}>{errors.email}</Text>}
            <TextinputA
              placeholder={stringsoflanguages.enterPhoneNo}
              value={value?.phone}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(numeric) => handleChange('phone', numeric)}
              error={errors.phone}
            />
            {errors.phone && <Text style={global.error}>{errors.phone}</Text>}
            <Pressable
              onPress={() => setShowDatePicker(true)} // Show the date picker when pressed
            >
              <TextinputA
                placeholder={stringsoflanguages.enterBirthdate}
                value={value?.bday}
                editable={false} // Disable manual input
                error={errors.birthdate}
              />
            </Pressable>

            {errors.birthdate && (
              <Text style={global.error}>{errors.birthdate}</Text>
            )}

            {/* Render the date picker */}
            {renderDatePicker()}

           
            <TextinputB
              placeholder={stringsoflanguages.password}
              secureTextEntry
              onChangeText={(text) => handleChange('password', text)}
              error={errors.password}
            />
            
            {errors.password && (
              <Text style={global.error}>{errors.password}</Text>
            )}

            
            <TextinputB
              placeholder={stringsoflanguages.confirmPassword}
              value={value?.confirm_password}
              secureTextEntry={!showPassword1}
              onFocus={() =>
                scrollViewRef.current.scrollToEnd({ animated: true })
              }
              onChangeText={(text) => handleChange('confirm_password', text)}
              error={errors.confirm_password}
            />
           
            {errors.confirm_password && (
              <Text style={global.error}>{errors.confirm_password}</Text>
            )}

            <View style={styles.buttonS}>
              <ButtonA
                // name={"Sign Up"}
                // onPress={SignUpcheck}
                name={isLoading ? 'Signing Up...' : stringsoflanguages.signUp2}
                onPress={handleSignUp}
                disabled={isLoading}
              />
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  buttonS: {
    alignItems: 'center',
    marginBottom: getResponsiveValue(70, 30),
  },
  scrollView: {
    height: '20%',
    paddingTop: getResponsiveValue(20, 0),
  },
  togglePasswordButton: {
    position: 'absolute',
    right: 15,
    top: "51%", // Adjust the top position as needed 
  },
  togglePasswordButton1: {
    position: 'absolute',
    right: 15,
    top: "68%", // Adjust the top position as needed 
  }
});

export default SignUpScreen;
