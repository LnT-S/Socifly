import {StyleSheet, SafeAreaView, ScrollView, Text, View,  KeyboardAvoidingView,} from 'react-native';
import Swiper from 'react-native-swiper';
import Post from '../common/Post';
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
      <View style={styles.aContainer}>
        <Swiper
          style={styles.slider}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}>
          <Post source={imageSource} props={props} />
          <Post2 source={imageSource} props={props} />
          <Post3 source={imageSource} props={props} />
          <Post4 source={imageSource} props={props} />
        </Swiper>
      </View>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  style={{flex: 1}}>
      <ScrollView style={styles.bContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.ccontainer}>
            <Text style={styles.text}>Edit Profile</Text>
          </View>
          <TextinputA placeholder="Change Name" />
          <TextinputA placeholder="Change Phone No." keyboardType="numeric" />
          <TextinputA placeholder="Change Email Id" />
          <ButtonA name={'Change'} />
        </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  
  dot: {
    backgroundColor: 'grey', // Customize dot color
    width: getResponsiveValue(16, 8),
    height: getResponsiveValue(16, 8),
    borderRadius: getResponsiveValue(16, 8),
    marginHorizontal: getResponsiveValue(16, 8),
  },
  activeDot: {
    backgroundColor: PRIMARY, // Customize active dot color
    width: getResponsiveValue(16, 8),
    height: getResponsiveValue(16, 8),
    borderRadius: getResponsiveValue(16, 8),
    marginHorizontal: getResponsiveValue(16, 8),
  },
  aContainer: {
    flex: getResponsiveValue(8.2, 4.2),
  },
  bContainer: {
    // top:20,
    flex: 0.2,
    // alignItems:"center",
  },
  text: {
    color: BLACK,
    fontSize: 16,
    marginBottom:20,
    fontWeight:"bold",
  },
  boxContainer: {
    backgroundColor: WHITE,
    width: '100%',
    paddingHorizontal: getResponsiveValue('20%', '10%'),
    paddingVertical: getResponsiveValue('2%', '5%'),
    paddingBottom:"10%",
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