import React, {useState, useEffect, useRef, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  Animated,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BLACK, PRIMARY, SECONDARY, WHITE} from '../styles/colors';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IconButton from '../atoms/IconButton';
import {getResponsiveValue, screenWidth} from '../styles/responsive';
import defaultProfileImage from '../assets/images/Profile2.png';
import Share from 'react-native-share';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import { TapGestureHandler, State ,GestureHandlerRootView } from 'react-native-gesture-handler';
import RewardedAds from '../common/Ads/RewardedAds';

const Post2 = props => {
  const [downloaded, setDownloaded] = useState(false);
  const cardRef = useRef(null); // Create a ref for the card view
  const doubleTapRef = useRef(null);
  const [likeScale] = useState(new Animated.Value(1));
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const formattedDate = `${day}/${month}/${year}`;
 
  const handleDownload = async () => {
    setShouldShowAd(true);
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
          message: 'Hello, check this out! \nhttps://www.example.com/image.jpg',
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
    }
    setLiked(!liked);
  };

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
  
  
        <View style={styles.cardContainer}>
          <Image
            source={props?.source}
            resizeMode="contain"
            style={styles.image}
          />
        </View>



        <View style={styles.profileContainer}>
     
          <Image source={defaultProfileImage} style={styles.profileImage} />

          <View style={styles.infoContainer}>
            <Text style={styles.date}>{formattedDate}</Text>
            <Text style={styles.name}>User Name</Text>
            <View style={styles.horizontal}/>
            <Text style={styles.info}>+91 9405789152</Text>
            <Text style={styles.info}>user123email@email.com</Text>
          </View>
        </View>
      </View>

      </TapGestureHandler>
     

      <View style={styles.toolbar}>
        <Pressable onPress={handleLike}>
          <Animated.View
            style={[styles.likeButton, {transform: [{scale: likeScale}]}]}>
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
          {props.isEditMode ? null : (
            <IconButton onPress={handleNextPage}>
              <EntypoIcon name="edit" style={styles.icon2} />
            </IconButton>
          )}
        </View>
      </View>
      {downloaded && (
        <Text style={styles.downloadedText}>Image downloaded!</Text>
      )}
       <RewardedAds shouldShowAd={shouldShowAd} onAdShown={handleDownloadAfterAd} />
    </SafeAreaView>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
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
    backgroundColor: PRIMARY,
  
    width: '100%',
    aspectRatio: 308 / 346,
  },
  cardContainer2: {

    backgroundColor: PRIMARY,

    width: '80%',

  },
  image: {
    width: '100%',
    height: '100%',
    position: 'relative',
    bottom: '4%',

  },
  profileContainer: {
    backgroundColor: PRIMARY,
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
  },
  infoContainer: {
    position: 'absolute',
    bottom: '100%',
    right: '10%',
  },
  date: {
    fontSize: getResponsiveValue(12, 7),
    color: WHITE,
    fontWeight: 'bold',
    // position:"relative",
    top: getResponsiveValue('13%', '23%'),
    left: getResponsiveValue('128%', '120%'),
  },
  name: {
    fontSize: getResponsiveValue(20, 12),
    color: WHITE,
    fontWeight: 'bold',
    top: getResponsiveValue('20%', '30%'),
    left:getResponsiveValue("40%","40%")
  },
  horizontal: {
    backgroundColor:WHITE,
    
     height:getResponsiveValue(2,1),
     width:"100%",
     top: getResponsiveValue('20%', '30%'),
     left: getResponsiveValue('40%', '40%'),
   },
  info: {
    fontSize: getResponsiveValue(12, 8),
    color: WHITE,
    top: getResponsiveValue('20%', '30%'),
    left:getResponsiveValue("40%","40%")
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
 
    backgroundColor:WHITE,
    borderRadius:20,
    padding:8,
    position:"absolute",
    top:"105%",
   
 
  },
});

export default Post2;