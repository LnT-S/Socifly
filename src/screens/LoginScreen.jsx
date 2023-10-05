import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Pressable, Text, SafeAreaView } from 'react-native';
import LinearGradients from '../atoms/LinearGradients';
import global from '../styles/global';
import TextinputA from '../atoms/TextinputA';
import TextinputB from '../atoms/TextinputB';
import ButtonA from '../atoms/ButtonA';
import {BLACK, LINKS} from '../styles/colors';
import {getResponsiveValue} from '../styles/responsive';
import stringsoflanguages from '../utils/ScreenStrings';
import { validate2 } from '../utils/validation/validate2';
import {FETCH} from '../services/fetch';
import CustomModal from '../atoms/CustomModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { useLocal , useProfile} from '../context/ProfileContext';

const LoginScreen = props => {
  const {profileState, dispatch} = useProfile()
  const {localState, localDispatch} = useLocal()
  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  // .....
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [modal, setModal] = useState({
    visible : false,
    message : '',
    navigationPage : '',
    onClose : null
  })

  const handleLogin = async () => {
    console.log('LOG : Login Launched');
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
      // console.log('VAlue is', { formData1 });

      let {status , data} = await FETCH(
        'POST',
        '/auth/create-session',
        '',
        formData1,
      );
      if(status!==400 && status!==500 && status!== 401){
        // console.log('LOG : Status is not 400');
        if(data.data.token){
          console.log('LOG : Token is Found')
          await AsyncStorage.setItem('token' , data.data.token)
        }
        setModal(prev=>({
          ...prev ,
          visible : true,
          message : data.message,
          navigationPage : 'LanguagesScreen'
        }))
        setShowModal(true)
        setTimeout(()=>{setShowModal(false);navigation.navigate('LanguagesScreen');},2000)
      }else{
        setModal(prev=>({
          ...prev ,
          visible : true,
          message : data.message || 'Invalid Login Attempt',
          navigationPage : 'SignUpScreen',
          onClose : ()=>{setShowModal(false)}
        }))
        setShowModal(true)
      }
    } catch (error) {
      setIsLoading(false); // End loading on error
      console.error('Login error:', error);
    }
  };

  const handleNextPage = () => {
    props.navigation.navigate('ForgotPassword');
  };

  const handleNextPageSignUp = () => {
    props.navigation.navigate('SignUpScreen');
  };
  // const handleNextLang = () => {
  //   navigation.navigate('LanguagesScreen', { returnTo: 'LoginScreen' });
  // };

  const logs = async ()=>{
    let token = await AsyncStorage.getItem('token')
    let lang = await AsyncStorage.getItem('selectedLanguage')
    if(!lang){
      await AsyncStorage.setItem('selectedLanguage','english')
      lang = 'english'
    }
    localDispatch({
      type : "LANG",
      payload : lang
    })
    console.log('LOG : Language is ',lang)
    if(token){
      console.log('Token Exists Redirecting to the home page');
      let {status,data} =await FETCH(
        'GET',
        '/profile/get-info',
        ''
      )
      if(status === 401){
        let a = setModal({
          visible: true,
          message: 'Login Expired',
          navigationPage: 'LoginScreen',
          onClose: () => { setShowModal(false) }
        })
        
        setShowModal(true)
        await AsyncStorage.clear()
      }else{
        dispatch()
        props.navigation.navigate('HomePage')
      }
    }else{
      console.log('TOken Not Found Enter your Details')
      setUsername('')
      setPassword('')
    }
  }


  useEffect(()=>{
    try {
     logs().then().catch(err=>console.log('EFFECT ERROR 0',err))
     if(profileState.email){
      setUsername(profileState.email)
     }
   } catch (error) {
    console.log('ERROR',error)
   }
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradients customStyle={styles.loginGradient}>
        <Text style={global.title}>{stringsoflanguages.welcome}</Text>
      </LinearGradients>

      <View style={global.aContainer}>

      
      <TextinputA
      style={[
        styles.input,
        errors.email ? styles.inputError : null
      ]}
      placeholder={stringsoflanguages.emailOrPhone}
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
          placeholder={stringsoflanguages.password}
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
        name={stringsoflanguages.login}
        // onPress={handleNextPage}
        onPress={handleLogin}
        disabled={isLoading}
        />
        
        <View style={styles.content}>
        <Pressable onPress={handleNextPage}>
        <Text style={styles.link}>{stringsoflanguages.forgotPassword}</Text>
        </Pressable>
        <View style={styles.signupContainer}>
        <Text style={styles.createAccount}>{stringsoflanguages.noAccount}</Text>
        <Pressable onPress={handleNextPageSignUp}>
        <Text style={styles.link}>{stringsoflanguages.signUp}</Text>
        </Pressable>
        </View>
        {showModal?<CustomModal visible={modal.visible} message={modal.message} navigationPage={modal.navigationPage} onClose={modal.onClose} />:''}
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
    top: getResponsiveValue("4%","4%"),
    justifyContent: 'center',
    alignItems: 'center',
  },

  link: {
    color: LINKS,
    textDecorationLine: 'underline',
    fontSize: getResponsiveValue(16,12),
    marginTop: getResponsiveValue("2%","2%"),
    marginBottom: getResponsiveValue("2%","2%"),
    // marginBottom: 10,
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
  lang:{
    color:"grey",
    borderWidth:getResponsiveValue(1,1),
   paddingHorizontal:"2%",
   paddingVertical:"1%",
    borderRadius:getResponsiveValue(5,5),
    fontSize:getResponsiveValue(16,12),
  },
  langBtn:{
    top:getResponsiveValue("30%","30%"),
  },
});

export default LoginScreen;
