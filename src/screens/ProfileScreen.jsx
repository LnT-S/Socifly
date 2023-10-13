import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ButtonA from '../atoms/ButtonA';
import LinearGradients from '../atoms/LinearGradients';
import global from '../styles/global';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from "react-native-vector-icons/FontAwesome";
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {getResponsiveValue} from '../styles/responsive';
import {ImagePicker ,launchImageLibrary} from 'react-native-image-picker';
// import { openCropper } from 'react-native-image-crop-picker';
import CroppedImagePicker from 'react-native-image-crop-picker';
import defaultProfileImage from '../assets/images/Profile.png';
// import SettingsScreen from './Settings';
import { useProfile } from '../context/ProfileContext'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import stringsoflanguages from '../utils/ScreenStrings';
import { WHITE } from '../styles/colors';
//import InterstitialAds from '../common/Ads/InterstitialAds';
 import RewardedAds from '../common/Ads/RewardedAds';
import { FETCH, MULTIPART_FETCH } from '../services/fetch';
import CustomModal from '../atoms/CustomModal';
import { useLocal } from '../context/ProfileContext';


const ProfileScreen = props => {
  const {localState, localDispatch} = useLocal()
  const [showModal, setShowModal] = useState(false)
  const [imagePickerResponse, setPickedImage] = useState()
  const [modal, setModal] = useState({
    visible: false,
    message: '',
    navigationPage: '',
    onClose: null
  })
  const { profileState, dispatch } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProfileImage, setSelectedProfileImage] = useState(
    profileState.profileImage
  );
  const [value , SetValue] = useState({
    name : profileState.name || '',
    email : profileState.email || '',
    phone : profileState.phone || '',
  })
  const [avatar , setAvatar] = useState(profileState.avatar || '')

  const handleChange = ({field , text})=>{
    // console.log({field , text})
    SetValue(prev=>({
      ...prev , [field] : text
    }))
  }

  // const handleNextPage = () => {
  //   props.navigation.navigate('HomePage');
  // };
  const handleNextPage2 = () => {
    props.navigation.navigate('Settings');
  };

  const selectImage = async () => {
    let selectedImage = {
      fileName : `Socifly${new Date().getTime()}`,
      fileSize : 0,
      height : 0,
      type : "image/png",
      uri : '',
      width : 0
    }
    if (isEditing) {
     try {
       const response = await CroppedImagePicker.openPicker({
         mediaType: 'photo',
         cropping: true, // Enable cropping
         cropperCircleOverlay: false, // Set to true if you want a circular crop overlay
         freeStyleCropEnabled: true, // Enable free-style cropping
         aspectRatio: [1, 1], // Set the aspect ratio for cropping (1:1 in this example)
         includeBase64: true,
         multiple: false, // Set to true if you want to allow multiple selection
         cropperToolbarTitle: 'Crop Image',
       });
      //  console.log(response)
       selectedImage.fileSize = response.size,
       selectedImage.height = response.cropRect.height,
       selectedImage.width = response.cropRect.width,
       selectedImage.type = response.mime,
       selectedImage.uri  = response.path
       selectedImage.data = response.data
      //  console.log(selectedImage)
       setPickedImage(selectedImage)
       setSelectedProfileImage(selectedImage.uri);
     } catch (error) {
      if(error){
        console.log('ERROR  : Error Picking Image',error)
      }
     }
    }
  };
  // const selectImage = async () => {
  //   if (isEditing) {
  //     const response = await launchImageLibrary({
  //       mediaType: 'photo',
  //       includeBase64: false,
  //       selectionLimit: 1,
  //     });
  //     console.log(response.assets[0])
  //     setPickedImage(response.assets[0])
  //     setSelectedProfileImage(response.assets[0].uri);
  //   }
  // };
  
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const updateContext = ()=>{
    dispatch({
      type : 'USER_NAME',
      payload : value.name
    })
    dispatch({
      type : 'EMAIL',
      payload :value.email
    })
    dispatch({
      type : 'PHONE',
      payload : value.phone
    })
    dispatch({
      type : 'AVATAR',
      payload : avatar
    })
  }

  const loadProfileData = async () => {
    try {
      console.log('Updating the changes')
     let {data , status} =await  FETCH(
      'GET',
      '/profile/get-info',
      ''
     )
     if(status === 200){
      // console.log(data)
      SetValue(data.data)
      setAvatar(data.data.image)
      // updateContext()
      dispatch({
        type : 'USER_NAME',
        payload : data.data.name
      })
      dispatch({
        type : 'EMAIL',
        payload :data.data.email
      })
      dispatch({
        type : 'PHONE',
        payload : data.data.phone
      })
      dispatch({
        type : 'AVATAR',
        payload : data.data.image
      })
     }else{
      let a = setModal({
        visible: true,
        message: 'Service Error',
        navigationPage: 'LoginScreen',
        onClose : ()=>{setShowModal(false)}
      })
      
      setShowModal(true)
     }
    } catch (error) {
      console.log('Error loading profile data:', error);
    }
  };

  async function updateInfo(){
    const formData = new FormData();
    if(imagePickerResponse){
      formData.append('avatar', {
        name: imagePickerResponse.fileName,
        type: imagePickerResponse.type ,
        uri:
            Platform.OS === "android"
                ? imagePickerResponse.uri
                : imagePickerResponse.uri.replace("file://", "")
    });
    }
  formData.append('name',value.name)
  formData.append('email',value.email)
  formData.append('phone',value.phone)
    // let {data , status} = MULTIPART_FETCH(
    //   'POST',
    //   '/auth/edit-profile',
    //   '',
    //   value
    // )
    let token = await AsyncStorage.getItem('token')
    const url = 'http://16.171.251.116:8000/v1/auth/edit-profile'
  try {
      const response = await fetch(url,{
        method : 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body : formData
      })
      const data = await response.json()
      console.log('LOG : Updated Report',response.status,data)
      if(response.status === 200){
        let a = setModal({
          visible: true,
          message: 'Profile Updated successfully',
          navigationPage: 'HomePage',
          onClose : ()=>{setShowModal(false)}
        })
        setShowModal(true)
       }else{
        let a = setModal({
          visible: true,
          message: 'Cannot Update',
          navigationPage: 'LoginScreen',
          onClose : ()=>{setShowModal(false)}
        })
        setShowModal(true)
      }

  } catch (error) {
    console.log('Error',error)
  }
  loadProfileData().then().catch(err=>console.log('EFFECT ERROR',err))
    toggleEdit()
  }
  
  useEffect(() => {
    loadProfileData().then().catch(err=>console.log('EFFECT ERROR 5',err))
    setSelectedProfileImage('')
  },[avatar]);

 

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <LinearGradients customStyle={styles.loginGradient}>
      {showModal ? <CustomModal visible={modal.visible} message={modal.message} navigationPage={modal.navigationPage} onClose={modal.onClose} /> : ''}
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
                // source={
                //   (selectedProfileImage || avatar)
                //     ? { uri:`data:${imagePickerResponse?.type};base64,${imagePickerResponse?.data}` || profileState.server + avatar }
                //      : defaultProfileImage
                // }
                source={
                  selectedProfileImage ? { uri:`data:${imagePickerResponse.type};base64,${imagePickerResponse.data}`} : avatar ? {uri : profileState.server + avatar}  : defaultProfileImage
                }
                style={styles.profileImage}
              />
              {isEditing ?(<Icon2 name="edit" style={styles.iconF} />):("")}


            </Pressable>
        

            {isEditing ? (
              <TextInput
                style={styles.editableField}
                value={value.name}
                onChangeText={(v)=>{handleChange({field :'name' , text : v})}}
                placeholder={value.name ? '' : 'User Name'}
              />
            ) : (
              <Text   placeholder={'User Name'}  style={styles.yourName}>{profileState.name}</Text>
            )}
            {isEditing ? (
              <TextInput
                style={styles.editableField}
                value={value.email}
                onChangeText={(v)=>{handleChange({field :'email' , text : v})}}
              />
            ) : (
              <Text style={styles.yourEmail}>{profileState.email}</Text>
            )}
            {isEditing ? (
              <TextInput
                style={styles.editableField}
                value={`${value.phone}`}
                onChangeText={(v)=>{handleChange({field :'phone' , text : v})}}
                keyboardType="numeric"
                maxLength={10}
              />
            ) : (
              <Text style={styles.yourEmail}>{profileState.phone}</Text>
            )}
          </View>
        </LinearGradients>
        <View style={global.dContainer}>
          {isEditing ? (
            <ButtonA name={stringsoflanguages.save} onPress={updateInfo}/>
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

