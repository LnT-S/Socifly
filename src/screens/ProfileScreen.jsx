import { SafeAreaView,TouchableOpacity, StyleSheet, View, Text, Pressable, TextInput,Image, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect } from 'react';
import ButtonA from "../atoms/ButtonA";

import LinearGradients from "../atoms/LinearGradients";
import global from "../styles/global";
import Icon from "react-native-vector-icons/Entypo";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import { getResponsiveValue } from '../styles/responsive'; 
import { launchImageLibrary} from 'react-native-image-picker';
import defaultProfileImage from '../assets/images/Profile.png';
import DialogueBox from '../common/DialogueBox';

const ProfileScreen = (props) => {


  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Your Name");
  const [email, setEmail] = useState("your-email@email.com");
  const [profileImage, setProfileImage] = useState(defaultProfileImage);
  const [phoneNumber, setPhoneNumber] = useState("1234567890");
 
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
      maxWidth: 500,      // Maximum width of the image
      maxHeight: 500,     // Maximum height of the image
      quality: 1,         // Image quality: 0 to 1
      includeBase64: false, // Set to true if you want to get base64 data
    };

   launchImageLibrary(options, (response) => {
    if (response.assets && response.assets.length > 0) {
      const selectedImage = response.assets[0];
      const source = { uri: selectedImage.uri };
      setProfileImage(source);
    }
    });
 
   
};




  
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges =  () => {
    if (isEditing) {
     
    }
   
    toggleEdit();
  };
  const openDialogue = () => {
    setIsDialogueVisible(true);
  };

  const closeDialogue = () => {
    setIsDialogueVisible(false);
  };
  const [isDialogueVisible, setIsDialogueVisible] = useState(false);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
    <SafeAreaView style={styles.container}>
      <LinearGradients style={styles.bgG}>
        <View style={styles.header}>
          <Pressable
            onPress={handleNextPage}
            style={styles.iconWrapper}
          >
          <Icon name="home" style={styles.icon}></Icon>
          </Pressable>
          <Pressable
          onPress={handleNextPage2}
            style={styles.iconWrapper}
          >
            <MaterialIconsIcon
              name="settings"
              style={styles.icon}
            />
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
          <Text style={styles.yourphoneNumber}>{phoneNumber}</Text>
        )}
        </View>
      </LinearGradients>
      <View style={global.aContainer}>
      {isEditing ? (
        <ButtonA name={"SAVE"} onPress={saveChanges} />
      ) : (
        <ButtonA name={"EDIT PROFILE"} onPress={toggleEdit} />
      )}
      </View>

      <TouchableOpacity onPress={() => {
        openDialogue();
        toggleEdit();
    }} style={styles.openButton}>
        <Text style={styles.openButtonText}>Open Dialogue</Text>
    </TouchableOpacity>
      <DialogueBox 
      isVisible={isDialogueVisible} 
      onClose={closeDialogue}
      textContent="Edit Your Profile"
      />
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgG:{
height:"40%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
    width:"100%",
  },
  iconWrapper: {
    paddingHorizontal: 10,
  },
  icon: {
    color: "white",
    fontSize: getResponsiveValue(40,30),
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  icon3: {
    color: "#fff",
    fontSize: getResponsiveValue(240,120),
  },
  yourName: {
    color: "#fff",
    fontSize: getResponsiveValue(30,24),
    marginTop: 10,
    fontWeight: "bold",
  },
  yourEmail: {
    color: "#fff",
    fontSize:getResponsiveValue(20,16),
  },
  yourphoneNumber:{
    color: "#fff",
    fontSize:getResponsiveValue(20,16),
  },
  profileImage: {
    width: getResponsiveValue(240, 120),
    height: getResponsiveValue(240, 120),
    borderRadius: getResponsiveValue(120, 60),
    marginBottom: getResponsiveValue(10, 15),
  },
  editableField: {
    color: "#fff",
    fontSize: getResponsiveValue(20, 16),
    marginTop: getResponsiveValue(10, 0),
    marginBottom: getResponsiveValue(10, 10),
    fontWeight: "bold",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: '80%',
    textAlign: 'center',
    position: 'relative',
    bottom:30,
  },
});

export default ProfileScreen;
