import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import { BLACK, PRIMARY, WHITE } from '../styles/colors';
import { getResponsiveValue } from '../styles/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Image } from 'react-native-animatable';
import LinearGradients from '../atoms/LinearGradients';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Linking } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const AboutUs = props => {
  const handleNextPage = () => {
    props.navigation.navigate('PrivacyPolicy');
  };

  const handleNextPage1 = () => {
    props.navigation.navigate('TermsCondition');
  };
  const openLink = () => {
    const url = 'https://play.google.com/';  // Replace with your desired URL
    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          console.error('Cannot open URL');
        } else {
          console.log('URL opened successfully');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  const dummyText = {
    dataProtection: ` 
        Dear users,
             Have a warm and helpful greeting from me. I am Dhiraj Gajendra Navlakhe the owner of this ‘SOCIFLY APP’. I was completed advanced diploma in graphic designing and animation from IMR College Jalgaon, Maharashtra. After that I am working as a freelance graphic designer from last 11 years. I am working with leading publication houses and advertising agencies from India, UK, US and Australia. Some of my clients are as follows.
             
             •	Youkiyoto Publishing (Canada)
             •	Shildcrest Publishing (London, UK)
             •	Atmosphere Press (Austin, USA)
             •	Zorba Books (Gurgaon, India)
             •	Varada Prakashan (Pune, India)
             •	Youtbook (Chennai, India) 
      
         Now I am starting this new app for all of you so that all of you send your wishes to your friends, relatives and customers in very special way to create a new bonding with all of them. 
        Kindly use the ‘SOCIFLY APP’ and gives your love and likes to it.
      Also share the app and rate is app on Play Store. 
    
      Have a nice day. 
         Thank you`,
  };
  const openLink1 = () => {
    const url = 'https://www.apple.com/';  // Replace with your desired URL
    Linking.openURL(url)
      .then((supported) => {
        if (!supported) {
          console.error('Cannot open URL');
        } else {
          console.log('URL opened successfully');
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.status}>
        <Icon
          onPress={handleNextPage}
          name="arrow-back"
          style={styles.iconM}></Icon>

        <Text style={styles.statusT}> About Us</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.mainContainer}>
          <LinearGradients customStyle={styles.loginGradient}>
            <Image
              style={styles.image}
              source={require('../assets/images/Sociflylogo.png')}
            />
          </LinearGradients>

          <View style={styles.hContainer} >
            <Text>Dear User</Text>
            <Text>Have a warm and helpful greeting from me.
              I am Dhiraj Gajendra Navlakhe the owner of this ‘SOCIFLY APP’.
              I was completed advanced diploma in graphic designing and animation from IMR College Jalgaon, Maharashtra.
              After that I am working as a freelance graphic designer from last 11 years.
              I am working with leading publication houses and advertising agencies from India, UK, US and Australia.
              Some of my clients are as follows.
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Text style={styles.dot}> • </Text>
            <Text>Youkiyoto Publishing (Canada)</Text>
            </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
               <Text style={styles.dot}> • </Text>
              <Text>Shildcrest Publishing (London, UK)</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dot}> • </Text> 
              <Text>Atmosphere Press (Austin, USA)</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dot}> • </Text>
              <Text>Zorba Books (Gurgaon, India)</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dot}> • </Text> 
              <Text>Varada Prakashan (Pune, India)</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dot}> • </Text>
              <Text>Youtbook (Chennai, India)</Text>
              </View>

            <GestureHandlerRootView>
              <View style={styles.imageContainer2}>
                <Pressable onPress={openLink}>
                  <Image
                    style={styles.image2}
                    resizeMode="contain"
                    source={require('../assets/images/googlePlay.png')}
                  />
                </Pressable>

                <Pressable onPress={openLink1}>
                  <Image
                    resizeMode="contain"
                    style={styles.image3}
                    source={require('../assets/images/appstore.png')}
                  />
                </Pressable>
              </View>
            </GestureHandlerRootView>
            <View style={styles.iconContainer}>
              <MaterialCommunityIconsIcon name="gmail" style={styles.icon2} />
              <EntypoIcon name="facebook" style={styles.icon} />
              <FontAwesomeIcon name="instagram" style={styles.icon3} />
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.rect3}>
              <View style={styles.footer}>
                <Pressable onPress={handleNextPage}>
                  <Text style={styles.text4}>Privacy & Policy</Text>
                </Pressable>
              </View>
              <View style={styles.vertical}></View>
              <View style={styles.footer}>
                <Pressable onPress={handleNextPage1}>
                  <Text style={styles.text4}>Terms & Condition</Text>
                </Pressable>
              </View>
            </View>
          </View>
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dot:{
    color:PRIMARY,
   
  },
  container: {
    flex: 1,
    // alignItems: 'center',

  },
  mainContainer: {
    alignItems: 'center',
    top: getResponsiveValue(20, 5),
  },
  loginGradient: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingVertical: getResponsiveValue('6%', '6%'),
    borderRadius: getResponsiveValue(50, 10),
    width: '100%',
  },
  scroll: {
    // flex:1,
  },

  status: {
    width: '100%',
    backgroundColor: WHITE,
    height: getResponsiveValue('5%', '10%'),
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
    top: getResponsiveValue(17, 14),
    fontSize: getResponsiveValue(16, 16),
    left: getResponsiveValue(40, 30),
  },
  iconM: {
    color: BLACK,
    fontSize: getResponsiveValue(30, 25),
    top: getResponsiveValue(20, 14),
    left: getResponsiveValue(30, 20),
  },
  image: {
    width: getResponsiveValue(300, 150),
    height: getResponsiveValue(300, 150),
    alignSelf: 'center',
    // backgroundColor:PRIMARY,
    // borderRadius:getResponsiveValue(50,25),
  },
  image2: {
    width: getResponsiveValue(300, 150),
    height: getResponsiveValue(300, 150),
    alignSelf: 'center',
    // backgroundColor:PRIMARY,
    // borderRadius:getResponsiveValue(50,25),
    marginLeft: 20
  },
  image3: {
    width: getResponsiveValue(300, 150),
    height: getResponsiveValue(300, 150),
    alignSelf: 'center',
    marginRight: 20
    // backgroundColor:PRIMARY,
    // borderRadius:getResponsiveValue(50,25),
  },
  imageContainer: {
    backgroundColor: PRIMARY,
    paddingVertical: getResponsiveValue('6%', '6%'),
    borderRadius: getResponsiveValue(50, 25),
    width: '90%',
  },
  text: {
    top: getResponsiveValue(20, 10),
    fontSize: getResponsiveValue(30, 24),
    fontWeight: 'bold',
    color: BLACK,
  },
  text2: {
    top: getResponsiveValue(60, 60),
    fontSize: getResponsiveValue(24, 20),
    fontWeight: 'bold',
    color: WHITE,
    backgroundColor: PRIMARY,
    padding: '2%',
    borderRadius: getResponsiveValue(30, 15),
    letterSpacing: getResponsiveValue(4, 2),
  },
  infoContainer: {
    marginBottom: '20%',


  },
  listItemContainer: {
    flexDirection: 'row', // Align bullet and text horizontally
    alignItems: 'center', // Align items vertically within each row
    marginBottom: getResponsiveValue(10, 7), // Adjust spacing between list items
    top: 25,

  },
  bullet: {
    width: getResponsiveValue(20, 10),
    height: getResponsiveValue(20, 10),
    borderRadius: getResponsiveValue(20, 10),
    backgroundColor: PRIMARY, // Customize the bullet color
    marginRight: getResponsiveValue(20, 10),

  },
  bullet1: {
    width: getResponsiveValue(20, 10),
    height: getResponsiveValue(20, 10),
    borderRadius: getResponsiveValue(20, 10),
    backgroundColor: PRIMARY, // Customize the bullet color
    marginRight: getResponsiveValue(20, 18),
    left: 10

  },
  listItem: {
    fontSize: getResponsiveValue(24, 16),
    color: BLACK,
  },
  listItem1: {
    fontSize: getResponsiveValue(24, 16),
    color: BLACK,
    paddingRight: getResponsiveValue(24, 46),
  },
  listItem3: {
    fontSize: getResponsiveValue(24, 16),
    color: BLACK,
    paddingRight: getResponsiveValue(24, 14),
  },
  imageContainer2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    color: PRIMARY,
    fontSize: getResponsiveValue(50, 25),
    left: 22,
    bottom: getResponsiveValue(24, 16),
  },
  icon2: {
    color: PRIMARY,
    fontSize: getResponsiveValue(60, 30),
    left: 50,
    bottom: getResponsiveValue(24, 19),
  },
  icon3: {
    color: PRIMARY,
    fontSize: getResponsiveValue(58, 28),
    bottom: getResponsiveValue(24, 16),

  },
  iconContainer: {
    backgroundColor: WHITE,
    marginBottom: '8%',
    top: '5%',
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  rect3: {
    // position: 'relative',
    // top: getResponsiveValue('25%', '35%'),
    // flexDirection:"column-reverse",
    position: 'relative',
    top: getResponsiveValue('12%', '12%'),
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  text4: {
    color: 'grey',
    fontSize: getResponsiveValue(12, 10),
  },
  footer: {
    bottom: '0',
  },
  vertical: {
    width: '0.4%',
    height: '100%',
    backgroundColor: 'grey',
  },
  hContainer: {
    paddingVertical: '1%',
    paddingHorizontal: '8%',
    backgroundColor: WHITE,
    top: 5,
    borderRadius: getResponsiveValue(30, 15),
  },
  text3: {
    color: BLACK,
    fontSize: getResponsiveValue(18, 16),
  },
});

export default AboutUs;