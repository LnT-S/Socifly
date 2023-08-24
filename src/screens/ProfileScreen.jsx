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
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {getResponsiveValue} from '../styles/responsive';
import {launchImageLibrary} from 'react-native-image-picker';
import defaultProfileImage from '../assets/images/Profile.png';
import SettingsScreen from './Settings';

const ProfileScreen = props => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Your Name');
  const [email, setEmail] = useState('your-email@email.com');
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [phoneNumber, setPhoneNumber] = useState('9876543210');

  const handleNextPage = () => {
    props.navigation.navigate('HomePage');
  };
  const handleNextPage2 = () => {
    props.navigation.navigate('Settings');
  };

  const selectImage = () => {
    console.log('Selecting image...');
    const options = {
      mediaType: 'photo', // Specify media type: 'photo' or 'video'
      maxWidth: 500, // Maximum width of the image
      maxHeight: 500, // Maximum height of the image
      quality: 1, // Image quality: 0 to 1
      includeBase64: false, // Set to true if you want to get base64 data
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        const source = {uri: selectedImage.uri};
        setProfileImage(source);
      }
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    if (isEditing) {
    }

    toggleEdit();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <LinearGradients customStyle={styles.loginGradient}>
          <View style={styles.header}>
            <Pressable onPress={handleNextPage} style={styles.iconWrapper}>
              <Icon name="home" style={styles.icon}></Icon>
            </Pressable>
            <Pressable onPress={handleNextPage2} style={styles.iconWrapper}>
              <MaterialIconsIcon name="settings" style={styles.icon} />
            </Pressable>
          </View>
          <View style={styles.middleContainer}>
            <Pressable onPress={selectImage}>
              <Image source={profileImage} style={styles.profileImage} />
            </Pressable>

            {isEditing ? (
              <TextInput
                style={styles.editableField}
                value={name}
                onChangeText={setName}
              />
            ) : (
              <Text style={styles.yourName}>{name}</Text>
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
            <ButtonA name={'SAVE'} onPress={saveChanges} />
          ) : (
            <ButtonA name={'EDIT PROFILE'} onPress={toggleEdit} />
          )}
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
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
    color: 'white',
    fontSize: getResponsiveValue(40, 30),
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getResponsiveValue(0, 10),
  },
  icon3: {
    color: '#fff',
    fontSize: getResponsiveValue(240, 120),
  },
  yourName: {
    color: '#fff',
    fontSize: getResponsiveValue(30, 24),
    marginTop: 10,
    fontWeight: 'bold',
    marginBottom: getResponsiveValue(5, 5),
  },
  yourEmail: {
    color: '#fff',
    fontSize: getResponsiveValue(20, 16),
    marginBottom: getResponsiveValue(10, 5),
  },
  profileImage: {
    width: getResponsiveValue(240, 120),
    height: getResponsiveValue(240, 120),
    borderRadius: getResponsiveValue(120, 60),
    marginBottom: getResponsiveValue(15, 15),
  },
  editableField: {
    color: '#fff',
    fontSize: getResponsiveValue(20, 16),
    // marginTop: getResponsiveValue(0, 0),
    marginBottom: getResponsiveValue(5, 5),
    fontWeight: 'bold',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    width: '80%',
    textAlign: 'center',
    position: 'relative',
    bottom: getResponsiveValue(40, 30),
  },
});

export default ProfileScreen;
