import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ButtonA from '../atoms/ButtonA';

import LinearGradients from '../atoms/LinearGradients';
import global from '../styles/global';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from "react-native-vector-icons/FontAwesome";
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {getResponsiveValue} from '../styles/responsive';
// import {launchImageLibrary} from 'react-native-image-picker';
// import { openCropper } from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-crop-picker';
import defaultProfileImage from '../assets/images/Profile.png';
// import SettingsScreen from './Settings';
import { useProfile } from '../context/ProfileContext'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import stringsoflanguages from '../utils/ScreenStrings';
import { WHITE } from '../styles/colors';
//import InterstitialAds from '../common/Ads/InterstitialAds';
 import RewardedAds from '../common/Ads/RewardedAds';



const ProfileScreen = props => {
  const { profileState, dispatch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profileState.name || 'User Name');
  const [email, setEmail] = useState(profileState.email || 'user@email.com');
  const [phoneNumber, setPhoneNumber] = useState(profileState.phoneNumber || '1234567890');
  const [selectedProfileImage, setSelectedProfileImage] = useState(
    profileState.profileImage
  );

  const [dataLoaded, setDataLoaded] = useState(false);


  // const handleNextPage = () => {
  //   props.navigation.navigate('HomePage');
  // };
  const handleNextPage2 = () => {
    props.navigation.navigate('Settings');
  };

  const selectImage = async () => {
    if (isEditing) {
      const options = {
        mediaType: 'photo', // Specify media type: 'photo' or 'video'
        maxWidth: 500, // Maximum width of the image
        maxHeight: 500, // Maximum height of the image
        quality: 1, // Image quality: 0 to 1
        includeBase64: false, // Set to true if you want to get base64 data
      };
  
      try {
        const response = await ImagePicker.openPicker({
          ...options,
          cropping: true,
          width: 300,
          height: 300,
        });
  
        if (response) {
          setSelectedProfileImage(response.path);
  
          // Save image URI to AsyncStorage
          await AsyncStorage.setItem('profileImageURI', response.path);
        }
      } catch (error) {
        console.log('Error cropping image:', error);
      }
    }
  };
  

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = async () => {
    if (isEditing) {
      dispatch({
        type: 'UPDATE_NAME',
        payload: name,
      });
      dispatch({
        type: 'UPDATE_EMAIL',
        payload: email,
      });
      dispatch({
        type: 'UPDATE_PHONE',
        payload: phoneNumber,
      });
  
      // Save updated profile data to AsyncStorage
    }
    toggleEdit();
  };
  
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('profileName');
        const storedEmail = await AsyncStorage.getItem('profileEmail');
        const storedPhoneNumber = await AsyncStorage.getItem('profilePhoneNumber');
        const storedProfileImage = await AsyncStorage.getItem('profileImage');

        setName(storedName || name);
        setEmail(storedEmail || email);
        setPhoneNumber(storedPhoneNumber || phoneNumber);
        setSelectedProfileImage(storedProfileImage || null);

        setDataLoaded(true);
      } catch (error) {
        console.log('Error loading profile data:', error);
      }
    };

    loadProfileData();
  }, []);

 

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <LinearGradients customStyle={styles.loginGradient}>
          <View style={styles.header}>
          <Pressable 
          onPress={() => {
               
              setTimeout(() => {
                props.navigation.navigate('HomePage'); // Navigate to next page after ad is shown
              }, 1000); // Adjust the timeout duration as needed
            }}  style={({ pressed }) => [
              { opacity: pressed ? 0.8 : 1 },
              styles.iconWrapper,
            ]}>
            
           
              <Icon name="home" style={styles.icon}></Icon>
            </Pressable>
            <Pressable onPress={handleNextPage2}  style={({ pressed }) => [
              { opacity: pressed ? 0.8 : 1 },
              styles.iconWrapper,
            ]}>
              <MaterialIconsIcon name="settings" style={styles.icon} />
            </Pressable>
          </View>
          <View style={styles.middleContainer}>
    
            <Pressable onPress={selectImage}>
              <Image
                source={
                  selectedProfileImage
                    ? { uri: selectedProfileImage }
                    : defaultProfileImage
                }
                style={styles.profileImage}
              />
              {isEditing ?(<Icon2 name="edit" style={styles.iconF} />):("")}


            </Pressable>
        

            {isEditing ? (
              <TextInput
                style={styles.editableField}
                value={name}
                onChangeText={setName}
                placeholder={name ? '' : 'User Name'}
              />
            ) : (
              <Text   placeholder={'User Name'}  style={styles.yourName}>{name}</Text>
            )}
            {isEditing ? (
              <TextInput
                style={styles.editableField}
                value={email}
                onChangeText={setEmail}
              />
            ) : (
              <Text style={styles.yourEmail}>{email}</Text>
            )}
            {isEditing ? (
              <TextInput
                style={styles.editableField}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="numeric"
                maxLength={10}
              />
            ) : (
              <Text style={styles.yourEmail}>{phoneNumber}</Text>
            )}
          </View>
        </LinearGradients>
        <View style={global.dContainer}>
          {isEditing ? (
            <ButtonA name={stringsoflanguages.save} onPress={saveChanges} />
          ) : (
            <ButtonA name={stringsoflanguages.editProfile} onPress={toggleEdit} />
          )}
        </View>
   
      
      </SafeAreaView>

    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  iconWrapper: {
    paddingHorizontal: 10,
  },
  icon: {
    color: 'white',
    fontSize: getResponsiveValue(40, 30),
  },
  loginGradient: {
    flex: getResponsiveValue(2, 1),
    justifyContent: 'center',
    alignItems: 'center',
    height: getResponsiveValue('120%', '50%'),
    // Add any other custom styles you want for the LinearGradients in the LoginScreen
  },
  container: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: getResponsiveValue(20, 20),
    width: '100%',
  },
  iconWrapper: {
    paddingHorizontal: 10,
  },
  icon: {
    color: WHITE,
    fontSize: getResponsiveValue(40, 30),
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getResponsiveValue(0, 10),
  },
  icon3: {
    color: WHITE,
    fontSize: getResponsiveValue(240, 120),
  },
  iconF:{
    color: WHITE,
    fontSize: getResponsiveValue(50, 30),
    position:"absolute",
    left:getResponsiveValue("22%","25%"),
    top:getResponsiveValue("70%","60%"),

  },
  yourName: {
    color: WHITE,
    fontSize: getResponsiveValue(30, 24),
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: getResponsiveValue(5, 5),
  },
  yourEmail: {
    color: WHITE,
    fontSize: getResponsiveValue(20, 16),
    marginBottom: getResponsiveValue(10, 5),
  },
  profileImage: {
    width: getResponsiveValue(240, 120),
    height: getResponsiveValue(240, 120),
    borderRadius: getResponsiveValue(120, 60),
    marginBottom: getResponsiveValue(15, 15),
    borderColor:WHITE,
    borderWidth:getResponsiveValue(4,2),
  },
  editableField: {
    color: WHITE,
    fontSize: getResponsiveValue(20, 16),
    // marginTop: getResponsiveValue(0, 0),
    // marginBottom: getResponsiveValue(5, 5),
    fontWeight: 'bold',
    borderBottomColor: WHITE,
    borderBottomWidth: 1,
    width: '80%',
    textAlign: 'center',
    position: 'relative',
    bottom: getResponsiveValue(5, 5),
  },
});

export default ProfileScreen;

