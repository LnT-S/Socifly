import React, {useState} from 'react';
import {StyleSheet, View, Pressable, Text, SafeAreaView} from 'react-native';
import LinearGradients from '../atoms/LinearGradients';
import global from '../styles/global';
import TextinputA from '../atoms/TextinputA';
import ButtonA from '../atoms/ButtonA';
import {LINKS} from '../styles/colors';

// import { isEmailValid } from "../utils/validation/formValidation";
import {validateForm} from '../utils/validation/validateForm';

const LoginScreen = props => {
  const [errors, setErrors] = useState({});
  // .....
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setErrors({});

    const formData = {
      name: '',
      email: username,
      phone: '',
      password,
      confirm_password: '',
    };

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true); // Start loading

      console.log(
        'Sending login request with username:',
        username,
        'and password:',
        password,
      );

      //   const userData = await login(username, password);

      setIsLoading(false); // End loading

      //   console.log('Received user data:', userData);

      //   console.log("Login successful:", userData);
      props.navigation.navigate('HomePage');
    } catch (error) {
      setIsLoading(false); // End loading on error

      // Handle login error
      console.error('Login error:', error);
    }
  };

  // ..............

  const handleHome = () => {
    props.navigation.navigate('HomePage');
  };
  const handleNextPage = () => {
    props.navigation.navigate('ForgotPassword');
  };

  const handleNextPageSignUp = () => {
    props.navigation.navigate('SignUpScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradients>
        <Text style={global.title}>WELCOME!</Text>
      </LinearGradients>

      <View style={global.aContainer}>
        {errors.email && <Text style={global.error}>{errors.email}</Text>}
        <TextinputA
          style={styles.pl}
          placeholder="Username or Email"
          value={username}
          onChangeText={text => setUsername(text)}
        />

        {errors.password && <Text style={global.error}>{errors.password}</Text>}
        <TextinputA
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
        />

        <ButtonA
          name={'Log In'}
          // onPress={handleNextPage}
          onPress={handleHome}
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
  backgroundGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    // backgroundColor: "white",
  },
  pl: {
    color: 'grey',
  },

  content: {
    top: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    color: 'white',
    fontSize: 50,
    marginBottom: 20,
  },

  link: {
    color: LINKS,
    textDecorationLine: 'underline',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  createAccount: {
    color: '#121212',
    fontSize: 16,
    marginRight: 5,
  },
});

export default LoginScreen;
