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
import {BLACK, POST2, PRIMARY, SECONDARY, WHITE,POST,POST1} from '../../styles/colors';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IconButton from '../../atoms/IconButton';
import {getResponsiveValue, screenWidth} from '../../styles/responsive';
import defaultProfileImage from '../../assets/images/Profile2.png';
import Share from 'react-native-share';
import {captureRef} from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import stringsoflanguages from '../../utils/ScreenStrings';
import {
  TapGestureHandler,
  State,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import {launchImageLibrary} from 'react-native-image-picker';

const ImagePost4 = props => {
  const [downloaded, setDownloaded] = useState(false);
  const cardRef = useRef(null); // Create a ref for the card view
  const doubleTapRef = useRef(null);
  const [likedMessageVisible, setLikedMessageVisible] = useState(false);



  const handleDownload = async () => {
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

  const handleNextPage = () => {
    console.log('Pressing posts navigation');
    props.navigation.navigate('NewEdit');
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

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <TapGestureHandler
          ref={doubleTapRef}
          waitFor={cardRef} // Wait for single tap to finish before detecting double tap
          onHandlerStateChange={({nativeEvent}) => {
            if (nativeEvent.state === State.ACTIVE) {
              handleDoubleTap();
            }
          }}
          numberOfTaps={2} // Detect double tap
        >
          <View ref={cardRef} style={styles.cardContainer2}>
          <Image style={styles.backGround} resizeMode="cover"  source={require('../../assets/images/bg4.jpg')}/>
            <View style={styles.cardContainer}>
              <Image
                source={
                  props.selectedImage
                    ? {uri: props.selectedImage.uri}
                    : props?.source
                }
                resizeMode="contain"
                style={styles.image}
              />
              <View style={styles.textBox}>

              <Text style={[styles.nameC,textColorStyle]}>{props.name}</Text>
              </View>
            </View>

            <View style={styles.profileContainer}>
            <View style={styles.diamondContainer}>
                <View style={styles.diamondMask}>
                  <Image source={defaultProfileImage} style={styles.profileImage} />
                </View>
              </View>

              <View style={styles.infoContainer}>
              <Text style={[styles.date,textColorStyle]}>{formattedDate}</Text>
                <Text style={[styles.name,textColorStyle2]}>{props.userName}</Text>
                <View style={styles.horizontal} />
                <View style={styles.infoC}>
                  <EntypoIcon name="phone" style={styles.iconPhone} />
                  <Text style={[styles.info, textColorStyle2]}>
                    +91 9405789152
                  </Text>
                </View>
                <View style={styles.infoC}>
                  <EntypoIcon name="email" style={styles.iconPhone} />
                  <Text style={[styles.info, textColorStyle2]}>
                    user123email@email.com
                  </Text>
                </View>
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
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  backGround:{
    position:"absolute",
width:"100%",
height:"100%",
resizeMode:"cover",
// top:"80%",
  },
  cardContainer: {
    paddingHorizontal: '3%',
    // backgroundColor: POST1,
    //   alignItems:"center",
    width: '100%',
    aspectRatio: 308 / 346,
  },
  cardContainer2: {
    // paddindVertical: "2%",
    // paddingHorizontal: '3%',
    // backgroundColor: POST1,
    //   alignItems:"center",
    width: '80%',
    // aspectRatio: 308 / 346,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'relative',
    bottom: '4%',
    resizeMode: 'contain',
    // paddingBottom:"20%"
  },
  horizontal: {
    backgroundColor:"#0bf4e1",
    
     height:getResponsiveValue(2,1),
     width:"100%",
     top: getResponsiveValue('20%', '30%'),
     left: getResponsiveValue('40%', '40%'),
   },
  profileContainer: {
    // backgroundColor: POST1,
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
  diamondContainer: {
    width: getResponsiveValue(140, 60),
    height: getResponsiveValue(140, 60),
    position: 'absolute',
    bottom: '50%',
    left: '10%',
    
  },
  diamondMask: {
    width: getResponsiveValue(140, 60),
    height: getResponsiveValue(140, 60),
    backgroundColor: 'transparent',
    position: 'absolute',
    transform: [{ rotate: '45deg' }],
    overflow: 'hidden',
  },
  profileImage: {
    width: getResponsiveValue(140, 60),
    height: getResponsiveValue(140, 60),
    borderRadius: getResponsiveValue(10, 5),
    backgroundColor: WHITE,
    position: 'absolute',
    // bottom: '10%',
    // left: '10%',
    // borderColor:WHITE,
    // borderWidth:getResponsiveValue(4,2),
    transform: [{ rotate: '-45deg' }]
  },
  profileImageBg:{
    
    width: getResponsiveValue(180, 80),
    height: getResponsiveValue(180, 80),
    borderRadius: getResponsiveValue(120, 60),
    backgroundColor: "#fff",
    position: 'absolute',
    bottom: '10%',
    left: '80%',
    // borderColor:BLACK,
    // borderWidth:getResponsiveValue(4,2),
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

    top: getResponsiveValue('7%', '8%'),
    // left: '29%',
  },
  nameB: {
    width: getResponsiveValue(340, 140),
    height: getResponsiveValue(140, 60),
    // backgroundColor: BLACK,
    position: 'absolute',
    // bottom:'200%',
    // top: getResponsiveValue('32%', '32%'),
    // left:getResponsiveValue('10%','20%'),
  },
  nameC: {
    fontSize: getResponsiveValue(25, 15),
    color: WHITE,
    fontWeight: "900",
    letterSpacing:getResponsiveValue(1,0.5),
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 } ,
    textShadowRadius: getResponsiveValue(4,2) ,
    //  backgroundColor: BLACK,
    // position: 'absolute',
    // left:getResponsiveValue("20%","20%"),
    // top: getResponsiveValue('34.5%', '34.5%'),
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
    textShadowColor: "#0000006e",
    textShadowOffset: { width: 1, height: 1 } ,
    textShadowRadius: getResponsiveValue(4,2) ,
    padding:"1%",
    paddingHorizontal:"2%",
    // position:"relative",
  
    top: getResponsiveValue('8%', -2),
    left: getResponsiveValue('125%', "100%"),
    // top: getResponsiveValue('8%', '1%'),
    // left: getResponsiveValue('125%', '115%'),
  },
  name: {
    fontSize: getResponsiveValue(20, 12),
    color: WHITE,
    fontWeight: 'bold',
    top: getResponsiveValue('20%', '30%'),
    left:getResponsiveValue("40%","40%"),
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 } ,
    textShadowRadius: getResponsiveValue(4,2) ,
  },
  info: {
    fontSize: getResponsiveValue(12, 8),
    color: BLACK,
    // top: getResponsiveValue('20%', '30%'),
    // left: getResponsiveValue('40%', '40%'),
    marginLeft: getResponsiveValue(10, 5),
    textShadowColor: "#000000",
    textShadowOffset: { width: 1, height: 1 } ,
    textShadowRadius: getResponsiveValue(2,1) ,
  },
  
  infoC: {
    flexDirection: 'row',

    top: getResponsiveValue('15%', '15%'),
    left: getResponsiveValue('70%', '70%'),
  },
  iconPhone: {
    fontSize: getResponsiveValue(20, 10),
    color: "#0bf4e1",
    // top: getResponsiveValue('20%', '30%'),
    // left: getResponsiveValue('40%', '40%'),
    textShadowColor: '#000000',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: getResponsiveValue(2, 1),
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
    top: '2%',
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
  textBox:{
alignItems:"center",
justifyContent:"center",
paddingHorizontal:"3%",
// backgroundColor:'black',
position:"absolute",
height:"85%",
width:"100%",
left:"3%",
  },
});

export default ImagePost4;
