import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text, SafeAreaView } from 'react-native';
import LinearGradients from '../atoms/LinearGradients';
import global from '../styles/global';
import TextinputA from '../atoms/TextinputA';
import TextinputB from '../atoms/TextinputB';
import ButtonA from '../atoms/ButtonA';
import { LINKS, PRIMARY } from '../styles/colors';
import { validate2 } from '../utils/validation/validate2';
import { getResponsiveValue } from '../styles/responsive';

const LoginScreen = props => {
  const [errors, setErrors] = useState({});
  // .....
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  
  const handleLogin = async () => {
    console.log('handleLogin function executed');
    setErrors({});

    // Define the formData object with correct order
    const formData1 = {
      email: username,
      password,

    };

    const validationErrors = validate2(formData1);
    console.log('Validation errors:', validationErrors);
    console.log('formData:', formData1);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true); // Start loading
      console.log(
        'Sending login request with username:',
        username,
        // 'and password:',
        // password,
      );

      // const userData = await login(username, password);

      setIsLoading(false); // End loading

      // console.log('Received user data:', userData);

      // console.log("Login successful:", userData);
      props.navigation.navigate('HomePage');
    } catch (error) {
      setIsLoading(false); // End loading on error

      // Handle login error
      console.error('Login error:', error);
    }
  };

  // ..............

  // const handleHome = () => {
  //   props.navigation.navigate('HomePage');
  // };
  const handleNextPage = () => {
    props.navigation.navigate('ForgotPassword');
  };

  const handleNextPageSignUp = () => {
    props.navigation.navigate('SignUpScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradients customStyle={styles.loginGradient}>
        <Text style={global.title}>WELCOME!</Text>
      </LinearGradients>

      <View style={global.aContainer}>

        <TextinputA
          style={[
            styles.input,
            errors.email ? styles.inputError : null
          ]}

          placeholder="Username or Phone"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrors({ ...errors, email: '' }); // Clear the error when typing
          }}
          error={errors.email}
          onChangeError={(errorText) => setErrors({ ...errors, email: errorText })}
        />
        {errors.email && <Text style={[global.error, styles.errorText]}>{errors.email}</Text>}


        <TextinputB
          style={[
            styles.input,
            errors.password ? styles.inputError : null
          ]}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: '' }); // Clear the error when typing
          }}
          secureTextEntry
          error={errors.password}
          onChangeError={(errorText) => setErrors({ ...errors, password: errorText })}
        />
       
        {errors.password && <Text style={[global.error, styles.errorText1]}>{errors.password}</Text>}

        <ButtonA
          name={'Log In'}
          //  onPress={handleHome}
          onPress={handleLogin}
          disabled={isLoading}
        />

        <View style={styles.content}>
          <Pressable onPress={handleNextPage}>
            <Text style={styles.link}>Forgot Password?</Text>
          </Pressable>
          <View style={styles.signupContainer}>
            <Text style={styles.createAccount}>Don't have an account?</Text>
            <Pressable onPress={handleNextPageSignUp}>
              <Text style={styles.link}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
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
 
  errorText: {
    textAlign: 'right', // Align the error text to the left
    marginRight: "50%", // Add left margin to the error text for spacing
  },
  errorText1: {
    textAlign: 'right', // Align the error text to the left
    marginRight: "44%",
  },

  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  pl: {
    color: 'grey',
  },

  content: {
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  link: {
    color: LINKS,
    textDecorationLine: 'underline',
    fontSize: getResponsiveValue(16, 12),
    marginTop: 10,
    marginBottom: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createAccount: {
    color: '#121212',
    fontSize: getResponsiveValue(16, 12),
    marginRight: 5,
  },
  togglePasswordButton: {
    position: 'absolute',
    right: 50,
    top: "27%", // Adjust the top position as needed
    
  },
});

export default LoginScreen;
