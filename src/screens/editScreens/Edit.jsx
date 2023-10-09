import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import Swiper from 'react-native-swiper';
import React, { useState, useEffect } from 'react';
import Post from '../../common/posts/Post';
import Post1 from '../../common/posts/Post1';
import Post2 from '../../common/posts/Post2';
import Post3 from '../../common/posts/Post3';
import Post4 from '../../common/posts/Post4';
import { BLACK, PRIMARY, WHITE } from '../../styles/colors';
import { getResponsiveValue } from '../../styles/responsive';
import TextinputC from '../../atoms/TextinputC';
import ButtonA from '../../atoms/ButtonA';
import ButtonB from '../../atoms/ButtonB';
import stringsoflanguages from '../../utils/ScreenStrings';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useLocal } from '../../context/ProfileContext';
import CustomColorPicker from '../../utils/CustomColorPicker';

const handleColorChangeComplete = (color) => {
  // Handle color change completion here
};


const Edit = props => {
  const {localState, localDispatch} = useLocal()
  const imageSource = localState.editImage
  const [userName, setUserName] = useState('User Name');
  const [inputValue, setInputValue] = useState('');
  const [refresh , setRefresh] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleInputChange = text => {
    setInputValue(text);
  };

  const handleChangeClick = () => {
    if (inputValue.trim() !== '') {
      setUserName(inputValue);
      console.log('New userName:', inputValue);
    }
  };
  const handleNextPage = () => {
    props.navigation.navigate('HomePage');
  };

  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState('#fff');

  const openColorPicker = () => {
    setColorPickerVisible(true);
  };

  const closeColorPicker = () => {
    setColorPickerVisible(false);
  };

  const handleColorChange = (color) => {
    setCurrentColor(color);
  };
  
  function REFRESH(){
    setRefresh(!refresh)
    return new Promise((resolve, reject) => {
      // Your data fetching or refreshing logic here
      // For example, you can simulate a delay using setTimeout
      setTimeout(() => {
        // Resolve the promise when the operation is complete
        resolve();
      }, 1000); // Adjust the timeout duration as needed
    });
  }
  const handleRefresh = () => {
    setIsRefreshing(true); // Set refreshing state to true
    // Perform your data fetching or refreshing logic here
    // For example, you can call your `REFRESH` function
    REFRESH()
      .then(() => {
        setIsRefreshing(false); // Set refreshing state to false when done
      })
      .catch((error) => {
        console.error('Error refreshing data:', error);
        setIsRefreshing(false); // Set refreshing state to false in case of an error
      });
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.status}>
        <Icon
          onPress={handleNextPage}
          name="arrow-back"
          style={styles.icon2}></Icon>
        <Text style={styles.statusT}> {stringsoflanguages.edit}</Text>
      </View>
      <ScrollView style={styles.scroll} refreshControl={ // Add RefreshControl here
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          colors={['#ff0000', '#00ff00', '#0000ff']} // Customize the loading spinner colors
          tintColor={'#ff0000'} // Customize the loading spinner color
        />
      }>
        {/* <View style={styles.aContainer}> */}
        <Swiper
          style={styles.slider}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}>
          <Post2
            userName={userName}
            source={imageSource}
            props={props}
            isEditMode={true}
            textColor={currentColor}
          />
          <Post1
            userName={userName}
            source={imageSource}
            props={props}
            isEditMode={true}
            textColor={currentColor}
          />

          <Post3
            userName={userName}
            source={imageSource}
            props={props}
            isEditMode={true}
            textColor={currentColor}
          />
          <Post4
            userName={userName}
            source={imageSource}
            props={props}
            isEditMode={true}
            textColor={currentColor}
          />
        </Swiper>
        {/* </View> */}

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyBoardAV}>
          <View style={styles.boxContainer}>
            <View style={styles.ccontainer}>
              <Text style={styles.text}>Edit</Text>
            </View>
            <TextinputC
              placeholder={stringsoflanguages.changeYourName}
              value={inputValue}
              maxLength={20}
              onChangeText={handleInputChange}
              onFocus={() => setInputValue('')}
              onBlur={() => {
                if (inputValue.trim() === '') {
                  setInputValue('Name');
                }
              }}
            />

            <View style={styles.colorC}>
              <CustomColorPicker
                color={currentColor}
                onColorChange={handleColorChange}
                onColorChangeComplete={handleColorChangeComplete}
                visible={colorPickerVisible}
                onClose={closeColorPicker}
              />
            </View>

            <View style={styles.change}>
              <ButtonB
                name={stringsoflanguages.changeTextColor}
                onPress={openColorPicker}
                names="palette"
              />
            </View>

            <ButtonA
              name={stringsoflanguages.change}
              onPress={handleChangeClick}
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
    alignItems: 'center',
  },
  keyBoardAV: {
    flex: 1,
    bottom: getResponsiveValue('5%', '15%'),
    // position:"absolute",
    // marginTop:"100%",
    // top:"80%",
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
  change: {
    marginBottom: '8%',
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
  // aContainer: {
  //   flex: getResponsiveValue(8.2, 4.2),
  // },
  // bContainer: {
  //   // top:20,
  //   flex: 0.2,
  //   // alignItems:"center",

  // },
  text: {
    color: BLACK,
    fontSize: 16,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  boxContainer: {
    position: 'relative',
    // bottom: getResponsiveValue('5%', '5%'),
    backgroundColor: WHITE,
    width: '100%',
    paddingHorizontal: getResponsiveValue('20%', '10%'),
    paddingVertical: getResponsiveValue('5%', '5%'),
    // paddingBottom: '10%',
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
});

export default Edit;
