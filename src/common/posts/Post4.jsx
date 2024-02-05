import React, { useState, useEffect, useRef, Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Animated,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLACK, PRIMARY, SECONDARY, WHITE, POST1 } from '../../styles/colors';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IconButton from '../../atoms/IconButton';
import { getResponsiveValue, screenWidth } from '../../styles/responsive';
import defaultProfileImage from '../../assets/images/profile3.png';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Icon2 from "react-native-vector-icons/FontAwesome";
import { TapGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import stringsoflanguages from '../../utils/ScreenStrings';
import { useLocal, useProfile } from '../../context/ProfileContext';
import { LIKE } from '../../utils/like';
import showRewardedAds from '../../common/Ads/RewardedAds';

const Post4 = props => {
  const { localState, localDispatch } = useLocal()
  const { profileState, dispatch } = useProfile()
  const [downloaded, setDownloaded] = useState(false);
  const cardRef = useRef(null); // Create a ref for the card view
  const doubleTapRef = useRef(null);
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const [likedMessageVisible, setLikedMessageVisible] = useState(false);

  const handleDownload = async () => {
    showRewardedAds('')
    if (cardRef.current) {
      try {
        const uri = await captureRef(cardRef, {
          format: 'png', // You can choose other formats like 'jpg' as well
          quality: 1, // Set the image quality (0 to 1)
        });

        const dir = RNFS.PicturesDirectoryPath; // You can change the directory as needed

        // Create a unique filename
        const fileName = `${Date.now()}.png`;

        // Save the image to the directory
        const filePath = `${dir}/${fileName}`;
        await RNFS.copyFile(uri, filePath);

        console.log('Image saved:', filePath);
        setDownloaded(true);
        setTimeout(() => {
          setDownloaded(false);
        }, 3000);
      } catch (error) {
        console.error('Error capturing view:', error);
      }
    }
  };
  const handleDownloadAfterAd = () => {
    setShouldShowAd(false); //ads 
  };
  const handleNextPage = () => {
    console.log('Pressing posts navigation');
    props.navigation.navigate('Edit');
  };

  const [likeScale] = useState(new Animated.Value(1));
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const handleLike = () => {
    Animated.sequence([
      Animated.timing(likeScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(likeScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
      // Show the liked message
      setLikedMessageVisible(true);
      setTimeout(() => {
        setLikedMessageVisible(false);
      }, 1000); // Hide the message after 2 seconds
    }
    setLiked(!liked);
    LIKE(props.id)
  };

  useEffect(() => {
    // You can add animation logic here for the like button
  }, [liked]);

  const onShare = async () => {
    if (cardRef.current) {
      try {
        // Capture the cardRef as an image
        const uri = await captureRef(cardRef, {
          format: 'png',
          quality: 1,
        });
        // Share options with both message, URL, and image
        const shareOptions = {
          message: '',
          url: uri, // Use the captured image URI
          title: 'Share via', // Title of the share dialog
          subject: 'Share Link', // Subject of the share dialog
        };
        const ShareResponse = await Share.open(shareOptions);
        console.log(JSON.stringify(ShareResponse));
      } catch (error) {
        console.log('Error => ', error);
      }
    }
  };

  const handleDoubleTap = () => {
    // Trigger the like animation
    Animated.sequence([
      Animated.timing(likeScale, {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(likeScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Increase like count and set liked state
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
      // Show the liked message
      setLikedMessageVisible(true);
      setTimeout(() => {
        setLikedMessageVisible(false);
      }, 1000); // Hide the message after 2 seconds
    }
    setLiked(!liked);
    LIKE(props.id)
  };

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const textColorStyle = { color: props.textColor || WHITE };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <SafeAreaView style={styles.container}>
        <TapGestureHandler

          ref={doubleTapRef}
          waitFor={cardRef} // Wait for single tap to finish before detecting double tap
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              handleDoubleTap();
            }
          }}
          numberOfTaps={2} // Detect double tap
        >

          <View ref={cardRef} style={styles.cardContainer2}>

            <Image style={styles.backGround} resizeMode="cover" source={require('../../assets/images/bg_4.jpg')} />

            <View style={styles.cardContainer}>
              <Image
                source={{ uri: props?.source }}
                resizeMode="contain"
                style={styles.image}
              />
            </View>



            <View style={styles.profileContainer}>
              {/* <View style={styles.profileImageBg} /> */}
              <View style={styles.diamondContainer}>
                <View style={styles.diamondMask}>
                  <Image source={profileState.avatar ? { uri: profileState.server + profileState.avatar } : defaultProfileImage} style={styles.profileImage} />
                </View>
              </View>

              <View style={styles.infoContainer}>
                <View style={styles.dateC}>
                  <Text style={styles.date}>{formattedDate}</Text>
                </View>         
            <Text  style={[styles.name, textColorStyle]}>{props.newUserName || profileState.name}</Text>
            
            {(props.showPhone || props.showPhone === undefined) ? <View style={styles.infoC}>
                  <Icon2 name="phone" style={styles.iconPhone} />
                  <Text style={[styles.info, textColorStyle]}>
                    {profileState.phone}
                  </Text>
                </View> : ''}
                {(props.showEmail || props.showEmail === undefined) ?<View style={styles.infoC}>
                  <EntypoIcon name="email" style={styles.iconPhone} />
                  <Text style={[styles.info, textColorStyle]}>
                    {profileState.email}
                  </Text>
                </View> :''}
              </View>
            </View>
          </View>
        </TapGestureHandler>


        <View style={styles.toolbar}>
          <Pressable onPress={handleLike}>
            <Animated.View
              style={[styles.likeButton, { transform: [{ scale: likeScale }] }]}>
              <MaterialCommunityIconsIcon
                name={liked ? 'heart-circle' : 'heart-circle-outline'}
                style={[styles.icon1, liked && styles.likedIcon]}
              />
            </Animated.View>
          </Pressable>
          <View style={styles.iconGroup}>
            <IconButton onPress={onShare}>
              <FeatherIcon name="share-2" style={styles.icon2} />
            </IconButton>
            <IconButton onPress={handleDownload}>
              <FeatherIcon name="download" style={styles.icon2} />
            </IconButton>
            {props.isEditMode ? null : (
              <IconButton onPress={handleNextPage}>
                <EntypoIcon name="edit" style={styles.icon2} />
              </IconButton>
            )}
          </View>
        </View>
        {downloaded && (
          <Text style={styles.downloadedText}>{stringsoflanguages.imageDownloaded}</Text>
        )}
        {likedMessageVisible && (
          <Text style={styles.likedText}>{stringsoflanguages.liked}</Text>
        )}
      </SafeAreaView>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
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
    bottom: '4%',

  },
  profileContainer: {
    // backgroundColor: PRIMARY,
    width: '80%',
    height: '7%',

    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: '1%',

  },
  diamondContainer: {
    width: getResponsiveValue(160, 80),
    height: getResponsiveValue(160, 80),
    position: 'absolute',
    bottom: '50%',
    left: '10%',

  },
  diamondMask: {
    width: getResponsiveValue(160, 80),
    height: getResponsiveValue(160, 80),
    backgroundColor: 'transparent',
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
    overflow: 'hidden',
  },
  profileImage: {
    width: getResponsiveValue(160, 80),
    height: getResponsiveValue(160, 80),
    borderRadius: getResponsiveValue(10, 5),
    backgroundColor: WHITE,
    position: 'absolute',
    // bottom: '10%',
    // left: '10%',
    // borderColor:WHITE,
    // borderWidth:getResponsiveValue(4,2),
    transform: [{ rotate: '-45deg' }]
  },
  profileImageBg: {
    width: getResponsiveValue(140, 60),
    height: getResponsiveValue(140, 60),
    borderRadius: getResponsiveValue(10, 5),
    backgroundColor: "#fff",
    position: 'absolute',
    // bottom: '10%',
    // left: '10%',
    // zIndex:2,
    borderColor: WHITE,
    borderWidth: getResponsiveValue(4, 2),
    transform: [{ rotate: '-45deg' }],
    shadowColor: "#11011a",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  infoContainer: {
    position: 'absolute',
    width : '70%',
    bottom: '27%',
    right: '-21%',
    display : 'flex',
    justifyContent : 'space-between',
    gap : 1.5
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
    backgroundColor: "#168cf3c7",
    borderRadius: getResponsiveValue(20, 10),
    left:getResponsiveValue('3%', "2%"),
  },
  dateC: {
    position: "absolute",
    alignItems: "center",
    // bottom: getResponsiveValue('100%', "95%"),
    bottom: 70,
    // left: getResponsiveValue('100%', "100%"),
    right: 20,
    display: 'flex',
    flexWrap: 'nowrap',
  },
  name: {
    fontSize: getResponsiveValue(20, 13),
    color: WHITE,
    fontWeight: 'bold',
    // top: getResponsiveValue('20%', '32%'),
    // left: getResponsiveValue("40%", "40%"),
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(4, 2),
    borderBottomWidth : getResponsiveValue(2, 1),
    borderBottomColor : "#e8ad23",
    marginBottom : 5,
  },
  horizontal: {
    backgroundColor: "#0bf4e1",

    height: getResponsiveValue(2, 1),
    width: "100%",
    // top: getResponsiveValue('20%', '30%'),
    // left: getResponsiveValue('40%', '40%'),
  },
  info: {
    fontSize: getResponsiveValue(12, 9),
    color: BLACK,
    marginLeft: getResponsiveValue(10, 5),
    fontWeight: 'bold',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(2, 1),
  },

  infoC: {
    flexDirection: 'row',

    // top: getResponsiveValue('10%', '12%'),
    // left: getResponsiveValue('100%', '105%'),
  },
  iconPhone: {
    fontSize: getResponsiveValue(20, 10),
    color: WHITE,
    // top: getResponsiveValue('20%', '30%'),
    // left: getResponsiveValue('40%', '40%'),
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(2, 1),
    // marginLeft:getResponsiveValue(30, 20),
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
export default Post4;

