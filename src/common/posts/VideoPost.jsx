import React, { useState, useEffect, useRef, Component,VideoP } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Animated,
  Alert,
  ActivityIndicator,
  WebView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLACK, PRIMARY, SECONDARY, WHITE } from '../../styles/colors';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IconButton from '../../atoms/IconButton';
import { getResponsiveValue, screenWidth } from '../../styles/responsive';
import defaultProfileImage from '../../assets/images/profile3.png';
// import defaultProfileImage from '../../assets/pics/pic1.png';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Icon2 from "react-native-vector-icons/FontAwesome";
import { TapGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import stringsoflanguages from '../../utils/ScreenStrings';
import LinearGradient from 'react-native-linear-gradient';
import { useLocal, useProfile } from '../../context/ProfileContext';
import { FETCH } from '../../services/fetch';
import { LIKE } from '../../utils/like';
import FastImage from 'react-native-fast-image';
import v from './dummy.mp4'
// import {WebView } from 'react-native-webview'
import Video from 'react-native-video'
// import VideoPlayer from 'react-native-video-player'

const VidePost = props => {
  const { localState, localDispatch } = useLocal()
  const { profileState, dispatch } = useProfile()
  const [value, SetValue] = useState({
    name: profileState.name || '',
    email: profileState.email || '',
    phone: profileState.phone || null,
  })
  const [avatar, setAvatar] = useState(profileState.avatar || '')
  const [jsxIsLoading ,setJsxIsLoading] = useState(true)
  const [downloaded, setDownloaded] = useState(false);
  const cardRef = useRef(null); // Create a ref for the card view
  const doubleTapRef = useRef(null);
  const [likeScale] = useState(new Animated.Value(1));
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const [likedMessageVisible, setLikedMessageVisible] = useState(false);
  const [downloadClicked, setDownloadClicked] = useState(false);
  const [imageLoading , setImageLoading] = useState(true)


  const handleDownload = async () => {
    setDownloadClicked(true);
    // setShouldShowAd(true);  //ads

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

        showRewardedAds()
      } catch (error) {
        console.error('Error capturing view:', error);

      }
    }
  };

  const handleLike = async () => {
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
    await LIKE(props.id)
  };
  useEffect(() => {
    // You can add animation logic here for the like button
    console.log('LOG : CAllING VIDEO POST ARRAY', props.id)
    setJsxIsLoading(false)
    return ()=>(null)
  }, []);

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

  const handleDoubleTap = async () => {
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
    await LIKE(props.id)
  };



  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const textColorStyle = { color: props.textColor || WHITE };

  useEffect(()=>{
    setAvatar(profileState.avatar)
  },[profileState.avatar])


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
         {!jsxIsLoading?( <LinearGradient ref={cardRef} style={styles.cardContainer2} colors={["#6d76b0", "#0aaabb"]}>
            <Image style={styles.backGround} resizeMode="cover" source={require('../../assets/images/bg_2.jpg')} />
            <View style={styles.cardContainer}>
            {!imageLoading && <ActivityIndicator size={'large'} style={styles.activityIndicator}/>}
            <Text>Video CHangees</Text>
              <Video 
              source={v}
              resizeMode={'contain'}
              style={styles.image}
              onLoad={()=>setImageLoading(true)}
              onProgress={()=>setImageLoading(true)}
              onEnd={()=>setImageLoading(false)}
              on
            />
            </View>
            <View style={styles.profileContainer}>
              {
               <Image 
                source={(avatar) ? { uri: profileState.server + (avatar) } : defaultProfileImage} 
                style={styles.profileImage} 
                />
              }

              <View style={styles.infoContainer}>
                <View style={styles.dateC}>
                  <Text style={styles.date}>{formattedDate}</Text>
                </View>
                <Text style={[styles.name, textColorStyle]}>{props.newUserName ||profileState.name || value?.name}</Text>
                <View style={styles.horizontal} />
                <View style={styles.infoC}>
                  <Icon2 name="phone" style={styles.iconPhone} />
                  <Text style={[styles.info, textColorStyle]}>
                    {profileState.phone || value?.phone || ''}
                  </Text>
                </View>
                <View style={styles.infoC}>
                  <EntypoIcon name="email" style={styles.iconPhone} />
                  <Text style={[styles.info, textColorStyle]}>
                    {profileState.email || value?.email}
                  </Text>
                </View>
              </View>
            </View>
            <View >
            </View>
          </LinearGradient>):(<ActivityIndicator />)}
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
            <Pressable >
              <IconButton onPress={handleDownload}>
                <FeatherIcon name="download" style={styles.icon2} />
              </IconButton>
            </Pressable>
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

export default VidePost;