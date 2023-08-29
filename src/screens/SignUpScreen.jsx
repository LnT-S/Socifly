import React, {useState, useRef, useEffect} from 'react';
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
import LinearGradients from '../atoms/LinearGradients';
import global from '../styles/global';
import {FETCH} from '../services/fetch';
import {getResponsiveValue} from '../styles/responsive';
import {validateForm} from '../utils/validation/validateForm';

const SignUpScreen = props => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm_password: '',
  });
  
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, text) => {
    setValue((prev) => ({ ...prev, [field]: text }));
    setErrors((prev) => ({ ...prev, [field]: '' })); // Clear the error when typing
  };

  const scrollViewRef = useRef(null);

  const handleSignUp = async () => {
    const validationErrors = validateForm(value);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set the validation errors in state
      return;
    }

    try {
      setIsLoading(true); // Start loading
      let formData = new FormData();
      formData.append('data', value);
      console.log('VAlue is', {value});
      let data = await FETCH(
        'server',
        'POST',
        'http://192.168.1.32:8000/v1/auth/signup',
        '',
        value,
      );
      console.log({data});
      setIsLoading(false); // End loading
      props.navigation.navigate('LoginScreen');
    } catch (error) {
      setIsLoading(false); // End loading on error
      // Handle signup error
      console.error('Sign up error:', error);
    }
  };

  // ...

  useEffect(() => {
    console.log('In SingUp Page');
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <LinearGradients customStyle={styles.loginGradient}>
          <Text style={global.title}>SIGN UP</Text>
        </LinearGradients>

        <View style={global.bContainer}>
          <ScrollView
            style={styles.scrollView}
            ref={scrollViewRef}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            keyboardShouldPersistTaps="handled">
            
            <TextinputA
            style={[
              styles.input,
              errors.name ? styles.inputError : null,
            ]}
              placeholder="Enter Full Name"
              value={value?.name}
              onChangeText={(text) => handleChange('name', text)}
              error={errors.fullName}
              
            />
            {errors.name && <Text style={global.error}>{errors.name}</Text>}
            
            <TextinputA
              placeholder="Enter Email Id"
              value={value?.email}
              keyboardType="email-address"
             
              onChangeText={(text) => handleChange('email', text)}
              error={errors.email}
            />
            {errors.email && <Text style={global.error}>{errors.email}</Text>}
            
            <TextinputA
              placeholder="Enter Phone No"
              value={value?.phone}
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(numeric) => handleChange('phone', numeric)}
              error={errors.phone}
            />
            {errors.phone && <Text style={global.error}>{errors.phone}</Text>}

           
            <TextinputA
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => handleChange('password', text)}
          error={errors.password}
        />
            {errors.password && (
              <Text style={global.error}>{errors.password}</Text>
            )}

            
            <TextinputA
              placeholder="Confirm Password"
              value={value?.confirm_password}
              secureTextEntry
              onFocus={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }
              onChangeText={(text) => handleChange('confirm_password', text)}
          error={errors.confirm_password}
            />{errors.confirm_password && (
              <Text style={global.error}>{errors.confirm_password}</Text>
            )}

            <View style={styles.buttonS}>
              <ButtonA
                // name={"Sign Up"}
                // onPress={SignUpcheck}
                name={isLoading ? 'Signing Up...' : 'Sign Up'}
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
});

export default SignUpScreen;
