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
import { BLACK, POST2, PRIMARY, SECONDARY, WHITE } from '../../styles/colors';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IconButton from '../../atoms/IconButton';
import Icon2 from "react-native-vector-icons/FontAwesome";
import { getResponsiveValue, screenWidth } from '../../styles/responsive';
import defaultProfileImage from '../../assets/images/profile3.png';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import stringsoflanguages from '../../utils/ScreenStrings';
import {
  TapGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import RewardedAds from '../../common/Ads/RewardedAds';
import { launchImageLibrary } from 'react-native-image-picker';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useLocal, useProfile } from '../../context/ProfileContext';
import { FETCH } from '../../services/fetch';

const BirthdayPost = props => {
  const { localState, localDispatch } = useLocal()
  const { profileState, dispatch } = useProfile()
  const imageSource = localState.imageSource
  const [downloaded, setDownloaded] = useState(false);
  const cardRef = useRef(null); // Create a ref for the card view
  const doubleTapRef = useRef(null);
  const [likedMessageVisible, setLikedMessageVisible] = useState(false);
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [avatar, setAvatar] = useState(profileState.avatar || '')
  const [value, SetValue] = useState({
    name: profileState.name || '',
    email: profileState.email || '',
    phone: profileState.phone || null,
  })
  const handleDownload = async () => {
    setDownloadClicked(true);
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
        setShouldShowAd(true);
      } catch (error) {
        console.error('Error capturing view:', error);
      }
    }
  };

  const handleDownloadAfterAd = () => {
    setShouldShowAd(false); //ads 
  };

  const handleNextPage = () => {
    console.log('Pressing Birth Day posts navigation');
    localDispatch({
      type: "EDITIMAGEURI",
      payload: props.source
    })
    props.navigation.navigate('BirthdayEdit');
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
  };

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const [selectedImage, setSelectedImage] = useState(null);
  const textColorStyle = { color: props.textColor || WHITE };
  const textColorStyle2 = { color: props.textColor2 || WHITE };

  async function loadProfileData() {
    try {
      console.log('Loading Profile in Birthday Post')
      let { data, status } = await FETCH(
        'GET',
        '/profile/get-info',
      )
      if (status === 200) {
        console.log(data)
        SetValue(prev => ({ ...prev, ...data.data }))
        setAvatar(data.data.image)
        dispatch({
          type: 'USER_NAME',
          payload: data.data.name
        })
        dispatch({
          type: 'EMAIL',
          payload: data.data.email
        })
        dispatch({
          type: 'PHONE',
          payload: data.data.phone
        })
        dispatch({
          type: 'AVATAR',
          payload: data.data.image
        })
      } else {
        // let a = setModal({
        //   visible: true,
        //   message: 'Service Error',
        //   navigationPage: 'LoginScreen',
        //   onClose : ()=>{setShowModal(false)}
        // })

        // setShowModal(true)
      }
    } catch (error) {
      console.log('Error loading profile data 0:', error);
    }
  };

  useEffect(()=>{
    setAvatar(profileState.avatar)
  })

  useEffect(()=>{
    loadProfileData().then().catch(err => console.log('EFFECT ERROR 6', err))
    console.log('INFO : PROFILE STATE',profileState)
  },[])


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
            <Image style={styles.backGround} source={require("../../assets/images/BD1.png")}
              resizeMode="contain"
            />

            <View style={styles.cardContainer}>
              <Image
                source={{ uri: props?.source }}
                resizeMode="contain"
                style={styles.image}
              />

              <Image
                source={
                  props.selectedImage
                    ? { uri: props.selectedImage.uri }
                    : defaultProfileImage
                }
                style={styles.profileImage2}
              />
              <Image
                source={require('../../assets/images/name2.png')}
                style={styles.nameB}
              />
              <Text style={[styles.nameC, textColorStyle]}>{props.name}</Text>
            </View>

            <View style={styles.profileContainer}>
              <View style={styles.profileImageBg} />
              <Image source={(avatar)?{uri :profileState.server +  (avatar)}:defaultProfileImage} style={styles.profileImage} />
              <View style={styles.infoContainer}>
                <View style={styles.dateC}>
                  <Text style={styles.date}>{formattedDate}</Text>
                </View>

                <Text style={[styles.name, textColorStyle2]}>{props.userName ||profileState.name || value.name}</Text>
                <View style={styles.horizontal} />
                <View style={styles.infoC}>
                  <Icon2 name="phone" style={styles.iconPhone} />
                  <Text style={[styles.info, textColorStyle2]}>
                  {profileState.phone || value.phone}
                  </Text>
                </View>
                <View style={styles.infoC}>
                  <EntypoIcon name="email" style={styles.iconPhone} />
                  <Text style={[styles.info, textColorStyle2]}>
                  {profileState.email || value.email}
                  </Text>
                </View>
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
        <RewardedAds shouldShowAd={shouldShowAd} onAdShown={handleDownloadAfterAd} />
        {likedMessageVisible && <Text style={styles.likedText}>{stringsoflanguages.liked}</Text>}
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
    // marginBottom: "12%",
    // backgroundColor: WHITE,
    width: '100%',
    height: '15%',

  },
  backGround: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    top: "40%",
  },
  cardContainer: {
    // paddingHorizontal: '3%',
    // backgroundColor: POST2,
    alignItems: 'center',
    // height:"90%",
    width: '100%',
    aspectRatio: 308 / 370,
  },
  cardContainer2: {
    // paddindVertical: "2%",
    // paddingHorizontal: '3%',
    // backgroundColor: POST2,
    //   alignItems:"center"
    width: '80%',
    // aspectRatio: 308 / 346,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'relative',
    bottom: '5%',
    resizeMode: 'contain',
    // paddingBottom:"20%"
  },

  profileContainer: {
    // backgroundColor: POST2,
    width: '80%',
    height: '7%',
    // backgroundColor:WHITE,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: '1%',
    // position:"absolute",
    // top:getResponsiveValue("65%","65%"),
    // bottom:
  },
  profileImage: {
    width: getResponsiveValue(150, 60),
    height: getResponsiveValue(150, 60),
    borderRadius: getResponsiveValue(20, 10),
    backgroundColor: WHITE,
    position: 'absolute',
    bottom: '15%',
    left: '10%',
    transform: [{ rotate: '-10deg' }],
  },
  profileImageBg: {

    width: getResponsiveValue(160, 65),
    height: getResponsiveValue(160, 65),
    borderRadius: getResponsiveValue(20, 10),
    backgroundColor: "#c0a0df",
    position: 'absolute',
    bottom: '15%',
    left: '10%',
    // borderColor:BLACK,
    // borderWidth:getResponsiveValue(2,1),
    transform: [{ rotate: '-10deg' }],
    shadowColor: "#2e0146",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  profileImage2: {
    width: getResponsiveValue(270, 120),
    height: getResponsiveValue(270, 120),
    borderRadius: getResponsiveValue(160, 60),
    backgroundColor: WHITE,
    position: 'absolute',
    borderColor: WHITE,
    borderWidth: getResponsiveValue(4, 2),
    top: getResponsiveValue('8%', '8%'),
    // left: '29%',
  },
  nameB: {
    width: getResponsiveValue(380, 180),
    height: getResponsiveValue(180, 80),
    // backgroundColor: BLACK,
    position: 'absolute',
    // bottom:'200%',
    top: getResponsiveValue('29%', '29%'),
    // left:getResponsiveValue('10%','20%'),
  },
  nameC: {
    fontSize: getResponsiveValue(20, 10),
    color: WHITE,
    fontWeight: 'bold',
    //  backgroundColor: BLACK,
    position: 'absolute',
    top: getResponsiveValue('35%', '35%'),
  },
  infoContainer: {
    position: 'absolute',
    bottom: '100%',
    right: '10%',
  },
  date: {
    fontSize: getResponsiveValue(14, 7),
    color: WHITE,
    fontWeight: 'bold',
    textShadowColor: "#0000006e",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(4, 2),
    paddingHorizontal: "4%",
    paddingVertical: "2%",
    backgroundColor: "#ae54f8c9",
    borderRadius: getResponsiveValue(20, 10),
    left:getResponsiveValue('3%', "2%"),
  },
  dateC: {
    position: "absolute",
    alignItems: "center",
    bottom: getResponsiveValue('100%', "90%"),
    left: getResponsiveValue('100%', "90%"),
  },
  horizontal: {
    backgroundColor: "#f50101",

    height: getResponsiveValue(2, 1),
    width: '100%',
    top: getResponsiveValue('20%', '20%'),
    left: getResponsiveValue('30%', '35%'),
  },
  name: {
    fontSize: getResponsiveValue(20, 13),
    color: BLACK,
    fontWeight: 'bold',
    top: getResponsiveValue('20%', '20%'),
    left: getResponsiveValue('30%', '35%'),
    textShadowColor: '#05050567',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(4, 2),
  },
  info: {
    fontSize: getResponsiveValue(12, 8),
    color: BLACK,
    marginLeft: getResponsiveValue(10, 5),
    fontWeight: 'bold',
    textShadowColor: '#05050567',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(2, 1),
  },

  infoC: {
    flexDirection: 'row',

    top: getResponsiveValue('10%', '10%'),
    left: getResponsiveValue('90%', '90%'),
  },
  iconPhone: {
    fontSize: getResponsiveValue(20, 10),
    color: WHITE,
    // top: getResponsiveValue('20%', '30%'),
    // left: getResponsiveValue('40%', '40%'),
    textShadowColor: '#05050567',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: getResponsiveValue(2, 1),
    // transform: [{ rotate: '90deg' }],
  },

  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '2%',
    paddingVertical: '2%',
    backgroundColor: WHITE,
    width: '80%',
    // position: 'relative',
    // top:"7%"
    // bottom:getResponsiveValue("1.5%","0.5%"),
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
    color: 'rgba(235,124,148,1)', // Customize the color when liked
  },

  downloadedText: {
    color: 'green', // You can adjust the color as needed
    fontSize: getResponsiveValue(16, 12),
    // marginRight: getResponsiveValue(10, 5),
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 8,
    position: 'absolute',
    top: "105%",
  },
  likedText: {
    color: 'rgba(235,124,148,1)', // You can adjust the color as needed
    fontSize: getResponsiveValue(16, 12),
    fontWeight: 'bold',
    // marginRight: getResponsiveValue(10, 5),
    backgroundColor: WHITE,
    borderRadius: 20,
    padding: 8,
    position: 'absolute',
    top: '60%',
  },

});

export default BirthdayPost;
