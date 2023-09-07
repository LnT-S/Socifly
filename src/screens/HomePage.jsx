import {
  StyleSheet,
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import LinearGradient2 from '../atoms/LinearGradient2';
import { SafeAreaView } from 'react-native-safe-area-context';
import Category from '../common/Category';
// import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatList } from 'react-native';
import Post from '../common/Post';
import Post2 from '../common/Post2';
import Post3 from '../common/Post3';
import Post4 from '../common/Post4';
import { BLACK, WHITE } from '../styles/colors';
// import { AdMobBanner } from 'react-native-admob';
import { getResponsiveValue } from '../styles/responsive';
import GoogleAds from '../common/Ads/GoogleAds';
import InterstitialAds from '../common/Ads/InterstitialAds';
import PostArray from '../common/PostArray';
import BannerAds from '../common/Ads/BannerAds';
import Searchbar from '../atoms/Searchbar'
import RewardedAds from '../common/Ads/RewardedAds';
//import RewardedInterstitialAds from '../common/RewardedInterstitialAds';

const HomePage = props => {
  const [shouldShowAd, setShouldShowAd] = useState(false);
  const bannerData = [1, 2, 3];
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const flatListRef = useRef(null);
  
  const handleNextPage = () => {
    props.navigation.navigate('ProfileScreen');
  };
  // const handleNextPage2 = () => {
  //   props.navigation.navigate('CreatePage');
  // };

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


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient2 customStyle={styles.loginGradient}>
        <View style={styles.iconStackRow}>
            <Searchbar/>
          <Pressable
            style={styles.button}
            onPress={() => {
              showRewardedAd(); // Call showRewardedAd function to set shouldShowAd to true
              setTimeout(() => {
                props.navigation.navigate('CreatePage'); // Navigate to next page after ad is shown
              }, 1000); // Adjust the timeout duration as needed
            }}
          >
            <RewardedAds shouldShowAd={shouldShowAd} />
            <View style={styles.createRow}>
              <Text style={styles.create}>New</Text>
              <IoniconsIcon
                name="ios-add-circle-outline"
                style={styles.icon3}
              ></IoniconsIcon>
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
      renderItem={({ item }) => (
        <BannerAds />
        // You can replace this with your content for each item
      )}
      keyExtractor={(item) => item.toString()}
    />
        
        <Post source={require('../assets/pics/pic1.png')} props={props} />
        <InterstitialAds />
        <Post source={require('../assets/pics/pic1.png')} props={props} />
        <Post2 source={require('../assets/pics/pic1.png')} props={props} /> 
        <GoogleAds />
        <Post3 source={require('../assets/pics/pic1.png')} props={props} />
        <Post4 source={require('../assets/pics/pic1.png')} props={props} />
        <Post source={require('../assets/pics/pic1.png')} props={props} />
        <GoogleAds />
        <Post2 source={require('../assets/pics/pic1.png')} props={props} />
        <Post3 source={require('../assets/pics/pic1.png')} props={props} />
        <Post4 source={require('../assets/pics/pic1.png')} props={props} />
        <GoogleAds />
        <Post source={require('../assets/pics/pic1.png')} props={props} />
        <Post3 source={require('../assets/pics/pic1.png')} props={props} />
        <Post4 source={require('../assets/pics/pic1.png')} props={props} />
        <GoogleAds />
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

    height: getResponsiveValue(100, 60),
  },
  adss:{
    top:15,
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
    // marginLeft: getResponsiveValue('45%', '30%'),
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
    width: "100%",
    paddingHorizontal: "2%",
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    marginRight: 8,
    paddingLeft: 10,
    height: getResponsiveValue(50, 34),
    borderWidth: getResponsiveValue(3, 2),
    borderColor: WHITE,
    borderRadius: getResponsiveValue(25, 22),
    color: WHITE,
  },
  create: {
    marginLeft: getResponsiveValue(8, '7%'),

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
