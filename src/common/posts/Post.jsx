import React, { useState, useEffect, useRef,  Component} from 'react';
import { StyleSheet, View, Text, Pressable, Image, Animated,Alert, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BLACK, PRIMARY, SECONDARY, WHITE } from '../../styles/colors';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import EntypoIcon from "react-native-vector-icons/Entypo";
import IconButton from '../../atoms/IconButton';
import { getResponsiveValue, screenWidth } from '../../styles/responsive'; 
import defaultProfileImage from '../../assets/images/Profile2.png';
import Share from 'react-native-share';
import { captureRef } from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import showRewardedAds from '../../common/Ads/RewardedAds';
import { useLocal , useProfile} from '../../context/ProfileContext';
import { LIKE } from '../../utils/like';

const Post = (props) => {
  const {localState, localDispatch} = useLocal()
  const {profileState, dispatch} = useProfile()
  const [downloaded, setDownloaded] = useState(false);
  const cardRef = useRef(null); // Create a ref for the card view
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const handleDownload = async () => {
  if (cardRef.current) {
    showRewardedAds('')
    try {
      const uri = await captureRef(cardRef, {
        format: 'png', // You can choose other formats like 'jpg' as well
        quality: 1,   // Set the image quality (0 to 1)
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
  // Trigger your download logic here
  // This function will be called when the ad is shown
  // You can use this function to download the image for Post2
  setShouldShowAd(false);
};
  const handleNextPage = () => {
    console.log('Pressing posts navigation');
    props.props.navigation.navigate('Edit');
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
  const textColorStyle = { color: props.textColor || BLACK };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
      <View  ref={cardRef} style={styles.cardContainer2}>
        <View style={styles.imageContainer}>
          <Image source={{uri : props?.source}} resizeMode="contain" style={styles.image} />
        </View>
        <Image source={defaultProfileImage} style={styles.profileImage} />
        <Text style={[styles.Name, textColorStyle]}>{profileState.name}</Text>
        <Text style={styles.Name2}>{profileState.phone}</Text>
        <Text style={styles.Name2}>{profileState.email}</Text>
        </View>
        <View style={styles.toolbar}>
          <Pressable onPress={handleLike}>
            <Animated.View style={[styles.likeButton, { transform: [{ scale: likeScale }] }]}>
              <MaterialCommunityIconsIcon
                name={liked ? 'heart-circle' : 'heart-circle-outline'}
                style={[styles.icon1, liked && styles.likedIcon]}
              />
            </Animated.View>
          </Pressable>
          <View style={styles.iconGroup}>
            <IconButton onPress={onShare}>
              <FeatherIcon name="share-2" style={[styles.icon2, styles.touchableIcon]} />
            </IconButton>
            <IconButton  onPress={handleDownload}>
              <FeatherIcon name="download" style={[styles.icon2, styles.touchableIcon]} />
            </IconButton>
            <IconButton onPress={handleNextPage}>
              <EntypoIcon name="edit" style={[styles.icon2, styles.touchableIcon]} />
            </IconButton>
          </View>
        </View>
      </View>
      {downloaded && <Text style={styles.downloadedText}>Image downloaded!</Text>}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position:"relative",
    bottom:10,
  
 
  },
  touchableIcon: {
    padding: 7,
  },
  cardContainer: {
    height:getResponsiveValue("82%","80%"),
    width:getResponsiveValue(screenWidth * 0.8 , screenWidth * 0.8),
    backgroundColor: WHITE,
    marginBottom:getResponsiveValue(10,10),
    marginTop:getResponsiveValue(0,10),
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  cardContainer2: {
    height:getResponsiveValue("87%","85%"),
    width:getResponsiveValue(screenWidth * 0.8 , screenWidth * 0.8),
    backgroundColor: WHITE,
    
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: '90%', 
    height: undefined, 
    aspectRatio: 308 / 346, 
  },
  toolbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal:getResponsiveValue(15,10),
    backgroundColor: "#fff",
    position: 'relative',
    top:"7%"
    // bottom:getResponsiveValue("1.5%","0.5%"),
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginRight:getResponsiveValue(20,7),
  },
  icon1: {
    color: "rgba(235,124,148,1)",
    marginLeft:getResponsiveValue(10,0),
    fontSize:getResponsiveValue(100,50),
  },
  icon2: {
    color: "rgba(255,255,255,1)",
    padding: 7,
    fontSize:getResponsiveValue(50,25),

  },
  profileImage: {
    width: getResponsiveValue(200, 100),
    height: getResponsiveValue(200, 100),
    borderRadius: getResponsiveValue(120, 60),
    backgroundColor: WHITE,
    position: 'relative',
    left:getResponsiveValue("10%", "10%"),
    bottom:getResponsiveValue("15%", "15%"),
  },
  Name:{
    fontSize:getResponsiveValue(20,16),
    color: BLACK,
    fontWeight:"bold",
    position: 'relative',
    left:getResponsiveValue("45%", "45%"),
    bottom:getResponsiveValue("30%", "32%"),
  },
  Name2:{
    fontSize:getResponsiveValue(12,10),
    color: BLACK,
    position: 'relative',
    left:getResponsiveValue("45%", "45%"),
    bottom:getResponsiveValue("30%", "32%"),
  },
  likedIcon: {
    color: "rgba(235,124,148,1)", // Customize the color when liked
  },
  likeCount: {
    color: WHITE,
    fontSize: getResponsiveValue(16, 14),
    marginLeft: getResponsiveValue(10, 5),
  },
  downloadedText: {
    color: 'green', // You can adjust the color as needed
    fontSize: getResponsiveValue(16, 12),
    marginRight: getResponsiveValue(10, 5),
    backgroundColor:"#e3e3e6",
    borderRadius:20,
    padding:10,
    top:"2%",
  },

});

export default Post;