import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Animated,
  FlatList,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import LinearGradient2 from '../atoms/LinearGradient2';
import { SafeAreaView } from 'react-native-safe-area-context';
import Category from '../common/Category';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {BLACK, WHITE} from '../styles/colors';
import {getResponsiveValue} from '../styles/responsive';
import PostArray from '../common/postArrays/PostArray';
import stringsoflanguages from '../utils/ScreenStrings';
import GoogleAds from '../common/Ads/GoogleAds';
import RewardedAds from '../common/Ads/RewardedAds';
import InterstitialAds from '../common/Ads/InterstitialAds';
import BannerAds from '../common/Ads/BannerAds';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';


//import RewardedInterstitialAds from '../common/RewardedInterstitialAds';

const HomePage = props => {
  const navigation = useNavigation();
  useEffect(()=>{
    async function token(){
      let token = await AsyncStorage.getItem('token')
      if(token){
        console.log('LOG : Token Found')
      }else{
        console.log('LOG : Token not found')
        navigation.navigate('LoginScreen')
      }
    }
    token()
  },[])

  const [shouldShowAd, setShouldShowAd] = useState(false);
  const [isRewardedAdLoaded, setIsRewardedAdLoaded] = useState(false);
  const bannerData = [1, 2, 3];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const flatListRef = useRef(null);
  
  const handleNextPage = () => {
    props.navigation.navigate('ProfileScreen');
  };
  // const handleNextPage2 = () => {
  //   props.navigation.navigate('CreatePage');
  // };
  useEffect(() => {
    if (shouldShowAd && isRewardedAdLoaded) {
      RewardedAds.show(); // Show the rewarded ad
    }
  }, [shouldShowAd, isRewardedAdLoaded]);
  const showRewardedAd = () => {
    // Logic to set shouldShowAd to true
    setShouldShowAd(true);
  };
  // useEffect(() => {
  //   if (shouldShowAd) {
  //     RewardedAds.show(); // Show the rewarded ad
  //   }
  // }, [shouldShowAd]);
  useEffect(() => {
    const nextBannerIndex = (currentBannerIndex + 1) % bannerData.length;

    const scrollTimeout = setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ index: nextBannerIndex, animated: true });
        setCurrentBannerIndex(nextBannerIndex);
      }
    }, 3000); // Adjust the timeout duration (milliseconds) as needed for automatic scrolling

    return () => clearTimeout(scrollTimeout);
  }, [currentBannerIndex]);

  const handleRewardedAdLoaded = () => {
    setIsRewardedAdLoaded(true);
  };

  

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient2 customStyle={styles.loginGradient}>
        <View style={styles.iconStackRow}>
          <View style={styles.iconStack}>
            <TextInput placeholder="" style={styles.textInput} />
            <FeatherIcon name="search" style={styles.icon2} />
          </View>
           
          <Pressable
            style={styles.button}
            onPress={() => {
              showRewardedAd(); // Call showRewardedAd function to set shouldShowAd to true
              setTimeout(() => {
                props.navigation.navigate('CreatePage'); // Navigate to next page after ad is shown
              }, 1000); // Adjust the timeout duration as needed
            }}
          >
          <RewardedAds shouldShowAd={shouldShowAd} onAdLoaded={handleRewardedAdLoaded} />
            <View style={styles.createRow}>
              {/* <Pressable  style={styles.createRow}> */}
                <Text style={styles.create}>{stringsoflanguages.new}</Text>

                <IoniconsIcon
                  name="ios-add-circle-outline"
                  style={styles.icon3}></IoniconsIcon>
              {/* </Pressable> */}
            </View>
          </Pressable>
          <Pressable onPress={handleNextPage} style={({ pressed }) => [
            { opacity: pressed ? 0.8 : 1 },
            styles.iconWrapper,
          ]}>
            <MaterialCommunityIconsIcon
              name="account-settings"
              style={styles.icon4}
            ></MaterialCommunityIconsIcon>
          </Pressable>

        </View>
      </LinearGradient2>
      <View style={styles.cardSection}>
        <Category />
      </View>
      <ScrollView style={styles.postS}>
   <FlatList 
   ref={flatListRef}
   style={styles.adss}
   horizontal
   pagingEnabled
   data={bannerData}
   renderItem={({item})=>(
    <BannerAds/>
   )}
   keyExtractor={(item)=>item.toString()}
   />
        <PostArray
          // posts={posts}
          // renderPostComponent={renderPostComponent}
          navigation={props.navigation}
         
        />
        <GoogleAds />
        <PostArray
          // posts={posts}
          // renderPostComponent={renderPostComponent}
          navigation={props.navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loginGradient: {
    // flex: 0.12,
    height: getResponsiveValue(100, 60),
  },

 
  adss:{
    // top:15,
  },
  Container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconStackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getResponsiveValue('6%', '4%'),
  },
  iconStack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: WHITE,
    fontSize: getResponsiveValue(60, 40),
  },
  icon2: {
    position: 'absolute',
    right: 18,
    top: getResponsiveValue(3, 4),

    color: WHITE,
    fontSize: getResponsiveValue(40, 24),
  },
  icon3: {
    color: WHITE,
    fontSize: getResponsiveValue(44, 29),
    // marginLeft: getResponsiveValue('68%', '18%'),
  },
  icon4: {
    color: WHITE,
    fontSize: getResponsiveValue(50, 33),
  },
  createRow: {
    // flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "center",
    justifyContent: 'space-between',
    width: '100%',
    // paddingHorizontal:"2%",
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 8,
    paddingLeft: '10%',
    paddingRight: getResponsiveValue('15%', '20%'),
    // paddingHorizontal:"11%",
    height: getResponsiveValue(50, 34),
    borderWidth: getResponsiveValue(3, 2),
    borderColor: WHITE,
    borderRadius: getResponsiveValue(25, 22),
    color: WHITE,
  },
  create: {
    marginLeft: getResponsiveValue('7%', '7%'),

    color: WHITE,
    fontSize: getResponsiveValue(20, 16),
  },
  button: {
    width: '30%',
    height: getResponsiveValue(50, 34),
    borderWidth: getResponsiveValue(3, 2),
    borderColor: 'rgba(255,255,255,1)',
    borderRadius: getResponsiveValue(25, 22),
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  cardSection: {
    // height: "20%",
    alignItems: 'center',

    backgroundColor: WHITE,
    shadowColor: BLACK,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    elevation: 30,
    shadowOpacity: 1,
    shadowRadius: 10,
    paddingVertical: '2%',
  },
  postS: {
    flex: 0.8,
  },
 

});

export default HomePage;
