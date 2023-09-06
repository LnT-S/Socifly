import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import React from 'react';
import {BLACK, PRIMARY, WHITE} from '../styles/colors';
import {getResponsiveValue} from '../styles/responsive';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Image} from 'react-native-animatable';
import LinearGradients from '../atoms/LinearGradients';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const AboutUs = props => {
  const handleNextPage = () => {
    props.navigation.navigate('Settings');
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

          <View>
            <Text style={styles.text}>Make Your Daily</Text>
          </View>
          <View>
            <Text style={styles.text2}>Unique Status On Socifly</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.listItemContainer}>
              <View style={styles.bullet} />
              <Text style={styles.listItem}>Fresh Quotes Everyday</Text>
            </View>

            <View style={styles.listItemContainer}>
              <View style={styles.bullet} />
              <Text style={styles.listItem}>Download Easily</Text>
            </View>

            <View style={styles.listItemContainer}>
              <View style={styles.bullet} />
              <Text style={styles.listItem}>Quick Share & Download</Text>
            </View>

            <View style={styles.listItemContainer}>
              <View style={styles.bullet} />
              <Text style={styles.listItem}>Like Your Favourites</Text>
            </View>

            <View style={styles.imageContainer2}>
              <Image
                style={styles.image2}
                resizeMode="contain"
                source={require('../assets/images/googlePlay.png')}
              />
              <Image
                resizeMode="contain"
                style={styles.image3}
                source={require('../assets/images/appstore.png')}
              />
            </View>
            <View style={styles.iconContainer}>
              <MaterialCommunityIconsIcon name="gmail" style={styles.icon2} />
              <EntypoIcon name="facebook" style={styles.icon} />
              <FontAwesomeIcon name="instagram" style={styles.icon3} />
            </View>
            <View style={styles.rect3}>
              <View style={styles.footer}>
                <Pressable onPress={handleNextPage}>
                  <Text style={styles.text4}>Privacy & Policy</Text>
                </Pressable>
              </View>
              <View style={styles.vertical}></View>
              <View style={styles.footer}>
                <Pressable onPress={handleNextPage}>
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
  container: {
    flex: 1,
    // alignItems: 'center',
  },
  mainContainer: {
    alignItems: 'center',
    top: getResponsiveValue(20, 10),
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
    top: '10%',
    borderTopLeftRadius: getResponsiveValue(40, 20),
    borderTopRightRadius: getResponsiveValue(40, 20),
    alignItems: 'center', // Align children to the start
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
    fontSize: getResponsiveValue(24, 16),
    color: BLACK,
  },
  imageContainer2: {
    top: getResponsiveValue('5%', '10%'),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    color: PRIMARY,
    fontSize: getResponsiveValue(50, 25),
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
});

export default AboutUs;
