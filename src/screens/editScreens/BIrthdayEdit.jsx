import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  BackHandler,
} from 'react-native';
// import Swiper from 'react-native-swiper';
import React, { useState, useEffect } from 'react';
import { BLACK, PRIMARY, WHITE } from '../../styles/colors';
import { getResponsiveValue } from '../../styles/responsive';
import TextinputC from '../../atoms/TextinputC';
import ButtonA from '../../atoms/ButtonA';
import BirthdayPost from '../../common/posts/BirthdayPost';
import { launchImageLibrary } from 'react-native-image-picker';
import { openCropper } from 'react-native-image-crop-picker';
import ButtonB from '../../atoms/ButtonB';
import stringsoflanguages from '../../utils/ScreenStrings';
import CustomColorPicker from '../../utils/CustomColorPicker';
import { useLocal } from '../../context/ProfileContext';
import { useNavigation } from '@react-navigation/native';
import ImageCropPicker from 'react-native-image-crop-picker';
import CheckBoxWithText from '../../atoms/CheckBoxWithText';
const handleColorChangeComplete = (color) => {
  // Handle color change completion here
};


const BirthdayEdit = props => {
  const { localState, localDispatch } = useLocal()
  const imageSource = localState.editImage
  const [name, setName] = useState(stringsoflanguages.name);
  const [userName, setUserName] = useState('');
  const [tempName, setTempName] = useState(''); // Temporary name storage
  const [tempUserName, setTempUserName] = useState(''); // Temporary user name storage
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [showPhone, setShowPhone] = useState(true)
  const [showEmail, setShowEmail] = useState(true)
  const navigation = useNavigation();
  const selectImage = () => {
    ImageCropPicker.openPicker({
      width: 300, // Set the width of the cropped image
      height: 300, // Set the height of the cropped image
      cropping: true,
      freeStyleCropEnabled: true, // Enable free-style cropping
      hideBottomControls: true, // Hide the bottom controls for user-friendliness
      enableRotationGesture: true, // Enable rotation gesture
      includeBase64: false,
    })
      .then((image) => {
        setSelectedImage({ uri: image.path });
      })
      .catch((error) => {
        console.log('Error cropping image:', error);
      });
  };


  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState('#ffffff');
  const openColorPicker = () => {
    setColorPickerVisible(true);
  };

  const closeColorPicker = () => {
    setColorPickerVisible(false);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color);
  };


  const [currentColor2, setCurrentColor2] = useState('#fff');
  const [colorPickerVisible2, setColorPickerVisible2] = useState(false);

  // Create functions for the second color wheel
  const openColorPicker2 = () => {
    setColorPickerVisible2(true);
  };

  const closeColorPicker2 = () => {
    setColorPickerVisible2(false);
  };

  const handleColorChange2 = (color) => {
    setCurrentColor2(color);
  };


  const handleNameChange = (newName) => {
    setTempName(newName);
  };

  const handleUserNameChange = (newUserName) => {
    setTempUserName(newUserName);
  };

  const handleApplyChanges = () => {
    // Apply changes when the "Change" button is pressed
    if (tempName.trim() !== '') {
      setName(tempName);
    }
    if (tempUserName.trim() !== '') {
      setUserName(tempUserName);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => { navigation.goBack(); return true });
    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>

        <BirthdayPost
          name={name}
          userName={userName}
          source={imageSource}
          props={props}
          isEditMode="true"
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          textColor={currentColor}
          textColor2={currentColor2}
          showEmail={showEmail}
          showPhone={showPhone}
        />

        <View style={styles.boxContainer}>
          <View style={styles.ccontainer}>
            <Text style={styles.text}>{stringsoflanguages.edit}</Text>
          </View>
          <View style={styles.colorC}>
            <CustomColorPicker
              color={currentColor}
              onColorChange={handleColorChange}
              onColorChangeComplete={handleColorChangeComplete}
              visible={colorPickerVisible}
              onClose={closeColorPicker}
            />
          </View>


          <View style={styles.colorC}>
            <CustomColorPicker
              color={currentColor2}
              onColorChange={handleColorChange2}
              visible={colorPickerVisible2}
              onClose={closeColorPicker2}
            />
          </View>

          <View style={styles.change}>
            <ButtonB
              name={stringsoflanguages.changeNameColor}
              onPress={openColorPicker}
              names="palette"
            />
          </View>
          <View style={styles.change}>
            <ButtonB
              name={stringsoflanguages.changeInfoColor}
              onPress={() => openColorPicker2('text2')}
              names="palette"
            />
          </View>



          <View style={styles.change}>
            <ButtonB names="folder" name={stringsoflanguages.selectImage} onPress={selectImage} />
          </View>

          <TextinputC
            placeholder={stringsoflanguages.changeName}
            value={tempName}
            onChangeText={handleNameChange}
            maxLength={19}
          />

          <TextinputC
            placeholder={stringsoflanguages.changeYourName}
            value={tempUserName}
            onChangeText={handleUserNameChange}
            maxLength={19}
          />

          <View>
            <CheckBoxWithText text={'Show Email in Post'} checked={showEmail} setChecked={setShowEmail} />
            <CheckBoxWithText text={'Show Phone No in Post'} checked={showPhone} setChecked={setShowPhone} />
          </View>

          <ButtonA name={stringsoflanguages.change} onPress={handleApplyChanges} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  scroll: {
    flex: 1,
  },
  colorC: {
    justifyContent: 'center',
    // alignItems:"center",
    // left:"20%",
    flex: 1,
    // position:"absolute",
    width: '100%',
    // marginBottom: '100%',

    // borderWidth:1,
    // padding:"2%",
  },

  text: {
    color: BLACK,
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  boxContainer: {
    // position: 'relative',
    // bottom: getResponsiveValue('5%', '5%'),
    top: getResponsiveValue('5%', '10%'),
    backgroundColor: WHITE,
    width: getResponsiveValue("102%", "100%"),
    paddingHorizontal: getResponsiveValue('20%', '10%'),
    paddingVertical: getResponsiveValue('5%', '5%'),
    paddingBottom: '40%',
    // bottom:0,
    borderRadius: getResponsiveValue(60, 30),
  },
  bdContainer: {
    flex: 1.5,
    // height:"40%",
  },
  icon: {
    color: BLACK,
    fontSize: getResponsiveValue(80, 40),
  },
  ccontainer: {
    alignItems: 'center',
  },
  change: {
    marginBottom: '8%',

  },
});

export default BirthdayEdit;