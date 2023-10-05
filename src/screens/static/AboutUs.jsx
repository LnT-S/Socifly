import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import {BLACK, PRIMARY, WHITE} from '../../styles/colors';
import {getResponsiveValue} from '../../styles/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Image} from 'react-native-animatable';
import LinearGradients from '../../atoms/LinearGradients';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import stringsoflanguages from '../../utils/ScreenStrings';

import {Linking} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const AboutUs = props => {
  const handleNextPage = () => {
    props.navigation.navigate('Settings');
  };

  const handleNextPage1 = () => {
    props.navigation.navigate('PrivacyPolicy');
  };

  const handleNextPage2 = () => {
    props.navigation.navigate('AboutUs');
  };
  const openLink = () => {
    const url = 'https://play.google.com/'; // Replace with your desired URL
    Linking.openURL(url)
      .then(supported => {
        if (!supported) {
          console.error('Cannot open URL');
        } else {
          console.log('URL opened successfully');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const openLink1 = () => {
    const url = 'https://www.apple.com/'; // Replace with your desired URL
    Linking.openURL(url)
      .then(supported => {
        if (!supported) {
          console.error('Cannot open URL');
        } else {
          console.log('URL opened successfully');
        }
      })
      .catch(err => console.error('An error occurred', err));
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.status}>
        <Icon
          onPress={handleNextPage}
          name="arrow-back"
          style={styles.iconM}></Icon>

        <Text style={styles.statusT}>{stringsoflanguages.aboutUs}</Text>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.mainContainer}>
          <LinearGradients customStyle={styles.loginGradient}>
            <Image
              style={styles.image}
              source={require('../../assets/images/Sociflylogo.png')}
            />
          </LinearGradients>

          <View>
            <Text style={styles.text}>{stringsoflanguages.heading1}</Text>
          </View>
          <View>
            <Text style={styles.text2}>{stringsoflanguages.heading2}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.aboutUss}>
              <Text style={styles.bText}>{stringsoflanguages.dearUsers}{'\n'}</Text>
              <Text style={styles.nText}>
                {'\t'}
                {'\t'}{stringsoflanguages.point1}<Text style={{ color: PRIMARY, fontWeight:"bold" }}>{stringsoflanguages.sociflyApp}</Text>{stringsoflanguages.point2}
                {'\n'}
                {'\n'}{'\t'} {'\t'}{stringsoflanguages.point3}{'\n'}
              </Text>
              <View style={styles.listItemContainer}>
                <View style={styles.bullet} />
                <Text style={styles.listItem}>
                 {stringsoflanguages.place1}
                </Text>
              </View>

              <View style={styles.listItemContainer}>
                <View style={styles.bullet} />
                <Text style={styles.listItem}>
                {stringsoflanguages.place2}
                </Text>
              </View>

              <View style={styles.listItemContainer}>
                <View style={styles.bullet} />
                <Text style={styles.listItem}>
                {stringsoflanguages.place3}
                </Text>
              </View>

              <View style={styles.listItemContainer}>
                <View style={styles.bullet} />
                <Text style={styles.listItem}>
                {stringsoflanguages.place4}
                </Text>
              </View>
              <View style={styles.listItemContainer}>
                <View style={styles.bullet} />
                <Text style={styles.listItem}>
                {stringsoflanguages.place5}
                </Text>
              </View>
              <View style={styles.listItemContainer}>
                <View style={styles.bullet} />
                <Text style={styles.listItem}> {stringsoflanguages.place6}</Text>
              </View>
              <Text style={styles.nText}>
              {'\n'}
                {'\t'}
                {'\t'}{stringsoflanguages.point4}
                {'\n'}{'\n'}{stringsoflanguages.point5} <Text style={{ color: PRIMARY, fontWeight:"bold" }}>{stringsoflanguages.sociflyApp}</Text> {stringsoflanguages.point6}
                {'\n'}{'\n'}{stringsoflanguages.point7} {'\n'}{'\n'}{stringsoflanguages.point8}{'\n'}{'\n'}
                {stringsoflanguages.point9}
              </Text>
            </View>
            <GestureHandlerRootView>
              <View style={styles.imageContainer2}>
                <TouchableOpacity onPress={openLink}>
                  <Image
                    style={styles.image2}
                    resizeMode="contain"
                    source={require('../../assets/images/googlePlay.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={openLink1}>
                  <Image
                    resizeMode="contain"
                    style={styles.image3}
                    source={require('../../assets/images/appstore.png')}
                  />
                </TouchableOpacity>
              </View>
            </GestureHandlerRootView>
            <View style={styles.iconContainer}>
              <MaterialCommunityIconsIcon name="gmail" style={styles.icon2} />
              <EntypoIcon name="facebook" style={styles.icon} />
              <FontAwesomeIcon name="instagram" style={styles.icon3} />
            </View>
            <View style={styles.rect3}>
              <View style={styles.footer}>
                <Pressable onPress={handleNextPage1}>
                  <Text style={styles.text4}>
                    {stringsoflanguages.privacyPolicy}
                  </Text>
                </Pressable>
              </View>
              <View style={styles.vertical}></View>
              <View style={styles.footer}>
                <Pressable onPress={handleNextPage2}>
                  <Text style={styles.text4}>
                    {stringsoflanguages.termsCondition}
                  </Text>
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
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    top: getResponsiveValue(20, 10),
  },
  aboutUss: {
    top: '2%',
    paddingHorizontal: '4%',
  },
  loginGradient: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    paddingVertical: getResponsiveValue('6%', '6%'),
    borderRadius: getResponsiveValue(50, 25),
    width: '90%',
  },
  scroll: {
    // flex:1,
  },

  status: {
    width: '100%',
    backgroundColor: WHITE,
    height: getResponsiveValue('5%', '7%'),
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
  },
  image3: {
    width: getResponsiveValue(300, 150),
    height: getResponsiveValue(300, 150),
    alignSelf: 'center',
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
    top: getResponsiveValue(60, 30),
    fontSize: getResponsiveValue(24, 20),
    fontWeight: 'bold',
    color: WHITE,
    backgroundColor: PRIMARY,
    padding: '2%',
    borderRadius: getResponsiveValue(30, 15),
    letterSpacing: getResponsiveValue(4, 2),
  },
  infoContainer: {
    backgroundColor: WHITE,
    width: '100%',
    marginBottom: '40%',
    top: '5%',
    borderTopLeftRadius: getResponsiveValue(40, 20),
    borderTopRightRadius: getResponsiveValue(40, 20),
    // alignItems: 'center', // Align children to the start
    paddingVertical: getResponsiveValue(20, 10),
    paddingHorizontal: getResponsiveValue(20, 10),
  },
  listItemContainer: {
    flexDirection: 'row', // Align bullet and text horizontally
    alignItems: 'center', // Align items vertically within each row
    marginBottom: getResponsiveValue(10, 5), // Adjust spacing between list items
  },
  bullet: {
    width: getResponsiveValue(20, 10),
    height: getResponsiveValue(20, 10),
    borderRadius: getResponsiveValue(20, 10),
    backgroundColor: PRIMARY, // Customize the bullet color
    marginRight: getResponsiveValue(20, 10),
  },
  listItem: {
    fontSize: getResponsiveValue(18, 12),
    color: BLACK,
  },
  imageContainer2: {
    // top: getResponsiveValue('5%', '10%'),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    color: PRIMARY,
    fontSize: getResponsiveValue(50, 30),
  },
  icon2: {
    color: PRIMARY,
    fontSize: getResponsiveValue(60, 30),
  },
  icon3: {
    color: PRIMARY,
    fontSize: getResponsiveValue(58, 28),
  },
  iconContainer: {
    backgroundColor: WHITE,
    marginBottom: '10%',
    // top: '5%',
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
  bText: {
    fontSize: getResponsiveValue(22, 16),
    color: PRIMARY,
    fontWeight: 'bold',
  },
  nText: {
    fontSize: getResponsiveValue(18, 12),
    color: BLACK,
    // fontWeight:"bold",
  },
});

export default AboutUs;