import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { ColorPicker } from 'react-native-color-picker'
import Post from '../common/Post';
import Post1 from '../common/Post1';
import Post2 from '../common/Post2';
import Post3 from '../common/Post3';
import Post4 from '../common/Post4';
import {BLACK, PRIMARY, WHITE} from '../styles/colors';
import {getResponsiveValue} from '../styles/responsive';
import TextinputA from '../atoms/TextinputA';
import ButtonA from '../atoms/ButtonA';

const Edit = props => {
  const imageSource = require('../assets/pics/pic1.png');
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll}>
        {/* <View style={styles.aContainer}> */}
        <Swiper
          style={styles.slider}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}>
          <Post1 source={imageSource} props={props} isEditMode={true} />
          <Post2 source={imageSource} props={props} isEditMode={true} />
          <Post3 source={imageSource} props={props} isEditMode={true} />
          <Post4 source={imageSource} props={props} isEditMode={true} />
        </Swiper>
        {/* </View> */}
        
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, bottom:  getResponsiveValue("5%","15%")}}> 
          <View style={styles.boxContainer}>
            <View style={styles.ccontainer}>
              <Text style={styles.text}>Edit</Text>
            </View>
            <TextinputA placeholder="Change Name" />
            {/* <TextinputA placeholder="Change Phone No." keyboardType="numeric" />
            <TextinputA placeholder="Change Email Id" /> */}
            <ButtonA name={'Change'} />
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
