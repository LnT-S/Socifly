import React, { useState, useEffect, useRef, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Animated,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLACK, PRIMARY, SECONDARY, WHITE } from '../../styles/colors';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IconButton from '../../atoms/IconButton';
import { getResponsiveValue, screenWidth } from '../../styles/responsive';
import defaultProfileImage from '../../assets/images/profile3.png';
import Icon2 from "react-native-vector-icons/FontAwesome";
import { TapGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import stringsoflanguages from '../../utils/ScreenStrings';
import LinearGradient from 'react-native-linear-gradient';
import { useLocal, useProfile } from '../../context/ProfileContext';


const LoadingPostSuspense = () => {
  const textColorStyle = { color: WHITE };
  const { localState, localDispatch } = useLocal()
  const { profileState, dispatch } = useProfile()
  const [likeScale] = useState(new Animated.Value(1));
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <TapGestureHandler>
          <LinearGradient style={styles.cardContainer2} colors={["#6d76b0", "#0aaabb"]}>
            <Image style={styles.backGround} resizeMode="cover" source={require('../../assets/images/bg_2.jpg')} />
            <View style={styles.cardContainer}>  
            <ActivityIndicator size={'large'} style={styles.activityIndicator}/>          
            </View>
            <View style={styles.profileContainer}>
              {
               <Image 
                source={defaultProfileImage} 
                style={styles.profileImage} 
                />
              }

              <View style={styles.infoContainer}>
                <View style={styles.dateC}>
                  <Text style={styles.date}>{new Date().toDateString()}</Text>
                </View>
                <Text style={[styles.name, textColorStyle]}>{'Username'}</Text>
                <View style={styles.horizontal} />
                <View style={styles.infoC}>
                  <Icon2 name="phone" style={styles.iconPhone} />
                  <Text style={[styles.info, textColorStyle]}>
                    {profileState.phone}
                  </Text>
                </View>
                <View style={styles.infoC}>
                  <EntypoIcon name="email" style={styles.iconPhone} />
                  <Text style={[styles.info, textColorStyle]}>
                    {profileState.email}
                  </Text>
                </View>
              </View>
            </View>
            <View >
            </View>
          </LinearGradient>
        </TapGestureHandler>


        <View style={styles.toolbar}>
          <Pressable >
            <Animated.View
              style={[styles.likeButton, { transform: [{ scale: likeScale }] }]}>
              <MaterialCommunityIconsIcon
                name={'heart-circle-outline'}
                style={[styles.icon1]}
              />
            </Animated.View>
          </Pressable>
          <View style={styles.iconGroup}>

            <IconButton>
              <FeatherIcon name="share-2" style={styles.icon2} />
            </IconButton>
            <Pressable >
              <IconButton>
                <FeatherIcon name="download" style={styles.icon2} />
              </IconButton>
            </Pressable>
            {
              <IconButton>
                <EntypoIcon name="edit" style={styles.icon2} />
              </IconButton>
            }
          </View>
        </View>
        {(
          <Text style={styles.downloadedText}>{stringsoflanguages.imageDownloaded}</Text>
        )}

      </SafeAreaView>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  activityIndicator :{
    position : 'absolute',
    top : '40%',
    left : '50%',
    zIndex : 999
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '7%',
    marginBottom: '10%',

    width: '100%',
    height: '15%',
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  cardContainer: {
    paddingHorizontal: '3%',
    // backgroundColor: PRIMARY,
    width: '100%',
    aspectRatio: 308 / 346,
  },
  cardContainer2: {

    // backgroundColor: PRIMARY,

    width: '80%',

  },
  backGround: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    // top:"80%",
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'relative',
    bottom: '3%',

  },
  profileContainer: {
    // backgroundColor: PRIMARY,
    width: '80%',
    height: '7%',

    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: '1%',

  },
  profileImage: {
    width: getResponsiveValue(180, 80),
    height: getResponsiveValue(180, 80),
    borderRadius: getResponsiveValue(120, 60),
    backgroundColor: WHITE,
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    borderColor: WHITE,
    borderWidth: getResponsiveValue(4, 2),
  },
  infoContainer: {
    position: 'absolute',
    bottom: '110%',
    right: '10%',
  },
  date: {
    fontSize: getResponsiveValue(14, 9),
    color: WHITE,
    fontWeight: 'bold',
    textShadowColor: "#0000006e",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(4, 2),
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    backgroundColor: "#731bbcca",
    borderRadius: getResponsiveValue(20, 10),
    left:getResponsiveValue('3%', "3%"),
   
  },
  dateC: {
    position: "absolute",
    alignItems: "center",
    bottom: getResponsiveValue('100%', "95%"),
    left: getResponsiveValue('100%', "100%"),
   
  },
  name: {
    fontSize: getResponsiveValue(20, 13),
    color: WHITE,
    fontWeight: 'bold',
    top: getResponsiveValue('20%', '32%'),
    left: getResponsiveValue("40%", "40%"),
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(4, 2),
  },
  horizontal: {
    backgroundColor: "#e8ad23",

    height: getResponsiveValue(2, 1),
    width: "100%",
    top: getResponsiveValue('20%', '30%'),
    left: getResponsiveValue('40%', '40%'),
  },
  info: {
    fontSize: getResponsiveValue(12, 9),
    color: WHITE,
    marginLeft: getResponsiveValue(10, 5),
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(4, 2),
    fontWeight: 'bold',
  },
  infoC: {
    flexDirection: 'row',

    top: getResponsiveValue('10%', '12%'),
    left: getResponsiveValue('100%', '105%'),
  },
  iconPhone: {
    fontSize: getResponsiveValue(23, 10),
    color: WHITE,
    // top: getResponsiveValue('20%', '30%'),
    // left: getResponsiveValue('40%', '40%'),
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(2, 1),
    // marginLeft: getResponsiveValue(30, 20),
  },

  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    backgroundColor: WHITE,
    width: '80%',

  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: getResponsiveValue(20, 7),
  },
  icon1: {
    color: 'rgba(235,124,148,1)',
    marginLeft: getResponsiveValue(10, 0),
    fontSize: getResponsiveValue(100, 50),
  },
  icon2: {
    color: 'rgba(255,255,255,1)',
    padding: 7,
    fontSize: getResponsiveValue(50, 25),
  },
  likedIcon: {
    color: "rgba(235,124,148,1)",
  },

  downloadedText: {
    color: 'green',
    fontSize: getResponsiveValue(16, 12),

    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 8,
    position: "absolute",
    top: "105%",
  },

  likedText: {
    color: 'rgba(235,124,148,1)', // You can adjust the color as needed
    fontSize: getResponsiveValue(16, 12),
    fontWeight: "bold",
    // marginRight: getResponsiveValue(10, 5),
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 8,
    position: 'absolute',
    top: '60%',
  },


});

export default LoadingPostSuspense;