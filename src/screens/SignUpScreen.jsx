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

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleChange(valObj) {
    // console.log('Logging changed values',valObj)
    setValue(prev => ({...prev, [valObj.field]: valObj.value}));
  }

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
        <LinearGradients>
          <Text style={global.title}>SIGN UP</Text>
        </LinearGradients>

        <View style={global.bContainer}>
          <ScrollView
            style={styles.scrollView}
            ref={scrollViewRef}
            contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
            keyboardShouldPersistTaps="handled">
            {errors.name && <Text style={global.error}>{errors.name}</Text>}
            <TextinputA
              placeholder="Enter Full Name"
              value={value?.name}
              // onFocus={() => scrollViewRef.current.scrollToEnd({ animated: true })}
              onChangeText={v => {
                handleChange({field: 'name', value: v});
              }}
              error={errors.fullName}
            />
            {errors.email && <Text style={global.error}>{errors.email}</Text>}
            <TextinputA
              placeholder="Enter Email Id"
              value={value?.email}
              keyboardType="email-address"
              // onFocus={() => scrollViewRef.current.scrollToEnd({ animated: true })}
              onChangeText={v => handleChange({field: 'email', value: v})}
            />
            {errors.phone && <Text style={global.error}>{errors.phone}</Text>}
            <TextinputA
              placeholder="Enter Phone No"
              value={value?.phone}
              keyboardType="numeric"
              maxLength={10}
              // onFocus={() => scrollViewRef.current.scrollToEnd({ animated: true })}
              onChangeText={v => handleChange({field: 'phone', value: v})}
            />

            {errors.password && (
              <Text style={global.error}>{errors.password}</Text>
            )}
            <TextinputA
              placeholder="Password"
              secureTextEntry
              onFocus={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }
              onChangeText={v => handleChange({field: 'password', value: v})}
            />

            {errors.confirm_password && (
              <Text style={global.error}>{errors.confirm_password}</Text>
            )}
            <TextinputA
              placeholder="Confirm Password"
              value={value?.confirm_password}
              secureTextEntry
              onFocus={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }
              onChangeText={v =>
                handleChange({field: 'confirm_password', value: v})
              }
            />

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
