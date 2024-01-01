import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  Modal,
} from 'react-native';
// import Swiper from 'react-native-swiper';
import React, {useState, useEffect} from 'react';

import {BLACK, PRIMARY, WHITE} from '../../styles/colors';
import {getResponsiveValue} from '../../styles/responsive';
import TextinputC from '../../atoms/TextinputC';
import ButtonA from '../../atoms/ButtonA';
import ButtonB from '../../atoms/ButtonB';

import {launchImageLibrary} from 'react-native-image-picker';
import {openCropper} from 'react-native-image-crop-picker';
import ImagePost from '../../common/posts/ImagePost';
import TextinputB from '../../atoms/TextinputB';

import Swiper from 'react-native-swiper';
import ImagePost2 from '../../common/posts/ImagePost2';
import ImagePost3 from '../../common/posts/ImagePost3';
import ImagePost4 from '../../common/posts/ImagePost4';
import stringsoflanguages from '../../utils/ScreenStrings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ColorPicker from 'react-native-wheel-color-picker';
import TextinputA from '../../atoms/TextinputA';
import CustomColorPicker from '../../utils/CustomColorPicker';
import { useLocal } from '../../context/ProfileContext';

const handleColorChangeComplete = (color) => {
  // Handle color change completion here
};

const NewEdit = props => {
  const {localState, localDispatch} = useLocal()
  const imageSource = localState.editImage
  const [name, setName] = useState(stringsoflanguages.enterTextHere);
  const [userName, setUserName] = useState('User Name');
  const [tempName, setTempName] = useState(''); // Temporary name storage
  const [tempUserName, setTempUserName] = useState(''); // Temporary user name storage

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
 


  // const [selectedProfileImage, setSelectedProfileImage] = useState("../assets/images/Profile.png");
  const [selectedImage, setSelectedImage] = useState(null);
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1,
      includeBase64: false,
    };

    launchImageLibrary(options, async response => {
      if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];

        try {
          const croppedImage = await openCropper({
            path: selectedImage.uri,
            width: 590,
            height: 610,
          });

          setSelectedImage({uri: croppedImage.path});
        } catch (error) {
          console.log('Error cropping image:', error);
        }
      }
    });
  };
  const handleNameChange = newName => {
    setTempName(newName);
  };

  const handleUserNameChange = newUserName => {
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
  const handleNextPage = () => {
    props.navigation.navigate('CreatePage');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.status}>
        <Icon
          onPress={handleNextPage}
          name="arrow-back"
          style={styles.icon2}></Icon>
        <Text style={styles.statusT}>{stringsoflanguages.edit}</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <Swiper
          style={styles.slider}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}>
         
          <ImagePost2
            name={name}
            userName={userName}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            source={imageSource}
            props={props}
            isEditMode={true}
            textColor={currentColor}
            textColor2={currentColor2}
            
          />
           <ImagePost
            name={name}
            userName={userName}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            source={imageSource}
            props={props}
            isEditMode={true}
            textColor={currentColor}
            textColor2={currentColor2}
       
          />
          <ImagePost3
            name={name}
            userName={userName}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            source={imageSource}
            props={props}
            isEditMode={true}
            textColor={currentColor}
            textColor2={currentColor2}
     
          />
          <ImagePost4
            name={name}
            userName={userName}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            source={imageSource}
            props={props}
            isEditMode={true}
            textColor={currentColor}
            textColor2={currentColor2}
         
          />
        </Swiper>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, bottom: getResponsiveValue('5%', '15%')}}>
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
                name={stringsoflanguages.changeTextColor}
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
              <ButtonB
                name={stringsoflanguages.selectBackGround}
                onPress={selectImage}
                names="folder"
              />
            </View>

            <TextinputA
              placeholder={stringsoflanguages.enterText}
              value={tempName}
              onChangeText={handleNameChange}
              maxLength={286}
            />

            <TextinputA
              placeholder={stringsoflanguages.changeYourName}
              value={tempUserName}
              onChangeText={handleUserNameChange}
              maxLength={19}
            />

            <ButtonA
              name={stringsoflanguages.change}
              onPress={handleApplyChanges}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
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
  colorPick: {
    backgroundColor: 'grey',
    width: '100%',
    height: '100%',
    padding: '2%',
    borderRadius: getResponsiveValue(22, 11),
  },
  buttonPick: {
    marginTop: '2%',
    paddingHorizontal: '10%',
  },
  colorPickerModal: {
    width: '95%', // Adjust the width as needed
    height: '60%', // Adjust the height as needed
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    // position: 'absolute', // Add this line
    // top: '20%', // Adjust the top position as needed
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  colorPickerModal2: {
    width: '95%', // Adjust the width as needed
    height: '60%', // Adjust the height as needed
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    position: 'absolute', // Add this line
    top: '20%', // Adjust the top position as needed
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  status: {
    width: '100%',
    backgroundColor: WHITE,
    height: getResponsiveValue(70, 50),
    flexDirection: 'row',

    // justifyContent: 'center',
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },

  statusT: {
    color: BLACK,
    left: getResponsiveValue(30, 20),
    top: getResponsiveValue(20, 14),
  },
  icon2: {
    color: BLACK,
    fontSize: getResponsiveValue(30, 25),
    top: getResponsiveValue(20, 14),
    left: getResponsiveValue(30, 20),
  },

  scroll: {
    flex: 1,
  },

  slider: {
    // Add any additional styling you want for the swiper
    height: getResponsiveValue('80%', '67%'),
    // backgroundColor:"#d9dbde",
  },
  dot: {
    position: 'relative',
    bottom: getResponsiveValue('20%', '50%'),
    backgroundColor: 'grey', // Customize dot color
    width: getResponsiveValue(16, 8),
    height: getResponsiveValue(16, 8),
    borderRadius: getResponsiveValue(16, 8),
    marginHorizontal: getResponsiveValue(16, 8),
  },
  activeDot: {
    position: 'relative',
    bottom: getResponsiveValue('20%', '50%'),
    backgroundColor: PRIMARY, // Customize active dot color
    width: getResponsiveValue(16, 8),
    height: getResponsiveValue(16, 8),
    borderRadius: getResponsiveValue(16, 8),
    marginHorizontal: getResponsiveValue(16, 8),
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
    top: getResponsiveValue('5%', '5%'),
    backgroundColor: WHITE,
    width: getResponsiveValue('102%', '100%'),
    paddingHorizontal: getResponsiveValue('20%', '10%'),
    paddingVertical: getResponsiveValue('5%', '5%'),
    // paddingBottom: '40%',
    // bottom:0,
    borderRadius: getResponsiveValue(60, 30),
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

export default NewEdit;
